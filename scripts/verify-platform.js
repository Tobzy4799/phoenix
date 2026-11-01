const http = require("http");
const fs = require("fs");
const path = require("path");

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, headers: res.headers, data: parsed, raw: body });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, raw: body });
        }
      });
    });
    req.on("error", reject);
    if (data) {
      req.write(typeof data === "string" ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runTestSuite() {
  console.log("==================================================");
  console.log("  PHOENIX ACADEMY END-TO-END AUTOMATED TEST SUITE ");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, detail = "") {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${testName} - ${detail}`);
      failed++;
    }
  }

  try {
    // 1. Verify Pages (SSR / Client routes)
    console.log("\n--- TEST GROUP 1: Core Pages Availability ---");
    const pages = [
      "/academy",
      "/academy/courses",
      "/academy/courses/course-web3-fundamentals",
      "/academy/courses/course-growth-kol-architecture",
      "/admin",
    ];

    for (const page of pages) {
      const res = await request({
        hostname: "localhost",
        port: 3000,
        path: page,
        method: "GET",
      });
      assert(res.status === 200 || res.status === 307 || res.status === 302, `Route accessible: ${page} (Status: ${res.status})`);
    }

    // 2. Test Courses API
    console.log("\n--- TEST GROUP 2: Courses CRUD & Data Verification ---");
    const coursesRes = await request({
      hostname: "localhost",
      port: 3000,
      path: "/api/courses",
      method: "GET",
    });
    assert(coursesRes.status === 200, "GET /api/courses returns 200");
    assert(Array.isArray(coursesRes.data) && coursesRes.data.length >= 2, "Courses list contains free and paid courses");

    const freeCourses = coursesRes.data.filter((c) => c.tier === "free");
    const paidCourses = coursesRes.data.filter((c) => c.tier === "paid");
    assert(freeCourses.length >= 1, `Free courses found: ${freeCourses.length}`);
    assert(paidCourses.length >= 1, `Paid courses found: ${paidCourses.length}`);

    // Verify course detail
    const sampleFree = freeCourses[0];
    const singleCourseRes = await request({
      hostname: "localhost",
      port: 3000,
      path: `/api/courses/${sampleFree.id}`,
      method: "GET",
    });
    assert(singleCourseRes.status === 200 && singleCourseRes.data.id === sampleFree.id, `GET /api/courses/${sampleFree.id} returns valid details`);
    assert(sampleFree.modules && sampleFree.modules.length > 0, "Course contains structured syllabus modules");
    assert(sampleFree.modules[0].questions && sampleFree.modules[0].questions.length > 0, "Module contains quiz questions");

    // 3. Test Module PDFs on disk
    console.log("\n--- TEST GROUP 3: PDF Course Materials Availability ---");
    for (const mod of sampleFree.modules) {
      if (mod.pdfUrl && mod.pdfUrl.startsWith("/")) {
        const filePath = path.join(process.cwd(), "public", mod.pdfUrl.replace(/^\//, ""));
        const exists = fs.existsSync(filePath);
        assert(exists, `Module PDF exists on filesystem: ${mod.pdfUrl}`);
      }
    }

    // 4. Test Enrollment & Quiz Logic (>= 70% threshold)
    console.log("\n--- TEST GROUP 4: Interactive Quiz & 70% Rule Progression ---");
    const testUserId = `test-user-${Date.now()}`;
    const testEmail = "scholar@phoenix.org";

    // Enroll in free course
    const enrollRes = await request(
      {
        hostname: "localhost",
        port: 3000,
        path: "/api/enrollments",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      {
        userId: testUserId,
        userEmail: testEmail,
        courseId: sampleFree.id,
      }
    );
    assert(enrollRes.status === 200, "Enrollment initialization succeeds");
    assert(enrollRes.data.coursePaid === true, "Free course enrollment marked active/free");

    // Attempt quiz with failing score (50%)
    const mod1 = sampleFree.modules[0];
    const failQuizRes = await request(
      {
        hostname: "localhost",
        port: 3000,
        path: "/api/enrollments",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      {
        userId: testUserId,
        userEmail: testEmail,
        courseId: sampleFree.id,
        action: "submit_quiz",
        moduleId: mod1.id,
        score: 50,
      }
    );
    assert(failQuizRes.status === 200, "Quiz submission (50%) evaluated");
    assert(failQuizRes.data.moduleProgress[mod1.id].passed === false, "Failing score (< 70%) does NOT pass module");

    // Pass quiz with 85%
    const passQuizRes = await request(
      {
        hostname: "localhost",
        port: 3000,
        path: "/api/enrollments",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      {
        userId: testUserId,
        userEmail: testEmail,
        courseId: sampleFree.id,
        action: "submit_quiz",
        moduleId: mod1.id,
        score: 85,
      }
    );
    assert(passQuizRes.status === 200, "Quiz re-attempt submission (85%) evaluated");
    assert(passQuizRes.data.moduleProgress[mod1.id].passed === true, "Passing score (>= 70%) marks module as passed");

    // Pass all remaining modules
    for (let i = 1; i < sampleFree.modules.length; i++) {
      const m = sampleFree.modules[i];
      await request(
        {
          hostname: "localhost",
          port: 3000,
          path: "/api/enrollments",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
        {
          userId: testUserId,
          userEmail: testEmail,
          courseId: sampleFree.id,
          action: "submit_quiz",
          moduleId: m.id,
          score: 100,
        }
      );
    }

    // Check all modules passed status
    const finalEnrollCheck = await request({
      hostname: "localhost",
      port: 3000,
      path: `/api/enrollments?userId=${testUserId}&courseId=${sampleFree.id}`,
      method: "GET",
    });
    assert(finalEnrollCheck.data.allModulesPassed === true, "Course marks allModulesPassed when all quizzes >= 70%");
    assert(!!finalEnrollCheck.data.certificateId, "Certificate ID generated upon completing all quizzes");

    // 5. Test Payments API (Paystack & Pvium)
    console.log("\n--- TEST GROUP 5: Dual Payments (Paystack & Pvium) ---");
    // Paystack payment init
    const paystackRes = await request(
      {
        hostname: "localhost",
        port: 3000,
        path: "/api/payments/initialize",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      {
        userId: testUserId,
        userEmail: testEmail,
        courseId: sampleFree.id,
        paymentType: "certificate_claim",
        provider: "paystack",
        amount: sampleFree.certPriceNgn,
        currency: "NGN",
      }
    );
    assert(paystackRes.status === 200 && paystackRes.data.success === true, "Paystack payment initialization succeeds");
    assert(paystackRes.data.reference.startsWith("PHX-PAYSTACK"), "Paystack transaction reference correctly generated");

    // Pvium crypto payment init
    const pviumRes = await request(
      {
        hostname: "localhost",
        port: 3000,
        path: "/api/payments/initialize",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      {
        userId: testUserId,
        userEmail: testEmail,
        courseId: sampleFree.id,
        paymentType: "certificate_claim",
        provider: "pvium",
        amount: sampleFree.certPriceUsd,
        currency: "USD",
      }
    );
    assert(pviumRes.status === 200 && pviumRes.data.success === true, "Pvium payment initialization succeeds");
    assert(pviumRes.data.reference.startsWith("PHX-PVIUM"), "Pvium transaction reference correctly generated");
    assert(pviumRes.data.redirectUrl.includes("pvium.com"), "Pvium payment redirect points to https://pvium.com");

    // Unlock certificate via paid flag
    const certUnlockRes = await request(
      {
        hostname: "localhost",
        port: 3000,
        path: "/api/enrollments",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      {
        userId: testUserId,
        userEmail: testEmail,
        courseId: sampleFree.id,
        action: "mark_cert_paid",
      }
    );
    assert(certUnlockRes.data.certPaid === true, "Certificate claim verified & unlocked");

    // 6. Test Admin API listings
    console.log("\n--- TEST GROUP 6: Admin Analytics & Enrollments Listing ---");
    const allEnrollmentsRes = await request({
      hostname: "localhost",
      port: 3000,
      path: "/api/enrollments",
      method: "GET",
    });
    assert(allEnrollmentsRes.status === 200 && Array.isArray(allEnrollmentsRes.data), "Admin enrollments endpoint accessible");
    const foundOurEnrollment = allEnrollmentsRes.data.some((e) => e.userId === testUserId);
    assert(foundOurEnrollment, "Newly completed student progress tracked in admin enrollments database");

  } catch (err) {
    console.error("Test Suite Runtime Error:", err);
    failed++;
  }

  console.log("\n==================================================");
  console.log(`  RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite();
