import { NextRequest, NextResponse } from "next/server";
import { recordTransaction } from "@/lib/courses-repo";
import { PaymentTransaction } from "@/lib/courses-types";

// POST /api/payments/initialize
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, userEmail, courseId, paymentType, provider, amount, currency } = body;

    if (!userId || !courseId || !provider) {
      return NextResponse.json({ error: "Missing required payment fields" }, { status: 400 });
    }

    const email = userEmail && userEmail.includes("@") ? userEmail : "scholar@phoenix.org";
    const origin = process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_APP_URL
      ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")
      : req.nextUrl.origin || "http://localhost:3000";
    const reference = `PHX-${provider.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // ── 1. PAYSTACK INITIALIZATION ──
    if (provider === "paystack") {
      const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
      if (!paystackSecret) {
        return NextResponse.json({ error: "Paystack secret key not configured" }, { status: 500 });
      }

      // Paystack expects amount in Kobo (1 NGN = 100 Kobo)
      const amountInKobo = Math.round(Number(amount) * 100);

      const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amountInKobo,
          reference,
          currency: "NGN",
          callback_url: `${origin}/academy/courses/${courseId}?payment=verify&ref=${reference}&type=${paymentType}&provider=paystack`,
          metadata: {
            userId,
            userEmail: email,
            courseId,
            paymentType,
          },
        }),
      });

      const paystackData = await paystackRes.json();
      if (!paystackData.status) {
        console.error("Paystack API Error:", paystackData);
        return NextResponse.json(
          { error: paystackData.message || "Failed to initialize Paystack checkout" },
          { status: 400 }
        );
      }

      const tx: PaymentTransaction = {
        id: `tx-${Date.now()}`,
        userId,
        userEmail: email,
        courseId,
        paymentType,
        provider: "paystack",
        amount,
        currency: "NGN",
        status: "pending",
        reference,
        createdAt: new Date().toISOString(),
      };
      await recordTransaction(tx);

      return NextResponse.json({
        success: true,
        reference,
        authorizationUrl: paystackData.data.authorization_url,
        accessCode: paystackData.data.access_code,
        provider: "paystack",
      });
    }

    // ── 2. PVIUM INITIALIZATION (COMING SOON) ──
    if (provider === "pvium") {
      return NextResponse.json(
        { error: "Pvium crypto checkout is currently under maintenance and coming soon. Please use Paystack to complete your enrollment." },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Unsupported provider" }, { status: 400 });
  } catch (e: any) {
    console.error("Payment init error:", e);
    return NextResponse.json({ error: e?.message || "Payment processing failed" }, { status: 500 });
  }
}
