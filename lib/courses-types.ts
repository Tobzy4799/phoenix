export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  duration: string;
  pdfUrl: string; // URL or static file path
  pdfFileName?: string;
  questions: Question[];
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  tier: "free" | "paid";
  priceNgn: number; // e.g. 0 for free, 25000 for paid
  priceUsd: number; // e.g. 0 for free, 20 for paid
  certPriceNgn: number; // e.g. 7500 for free certificate, 0 for paid
  certPriceUsd: number; // e.g. 5 for free certificate, 0 for paid
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  badge: string;
  estimatedHours: string;
  modules: Module[];
  published: boolean;
  createdAt: string;
};

export type ModuleProgress = {
  moduleId: string;
  bestScore: number; // percentage, e.g. 80
  passed: boolean; // >= 70%
  completedAt?: string;
  attempts: number;
};

export type CourseEnrollment = {
  id: string;
  userId: string;
  userEmail: string;
  userName?: string;
  courseId: string;
  enrolledAt: string;
  coursePaid: boolean;
  certPaid: boolean;
  moduleProgress: Record<string, ModuleProgress>;
  allModulesPassed: boolean;
  completedAt?: string;
  certificateId?: string;
  certificateIssuedAt?: string;
};

export type PaymentTransaction = {
  id: string;
  userId: string;
  userEmail: string;
  courseId: string;
  paymentType: "course_enrollment" | "certificate_claim";
  provider: "paystack" | "pvium";
  amount: number;
  currency: "NGN" | "USD" | "USDT";
  status: "pending" | "completed" | "failed";
  reference: string;
  createdAt: string;
};
