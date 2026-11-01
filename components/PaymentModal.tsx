"use client";

import { useState } from "react";
import { CreditCard, Coins, ShieldAlert, ArrowRight, Loader2, ExternalLink } from "lucide-react";

interface PaymentModalProps {
  courseTitle: string;
  courseId: string;
  paymentType: "course_enrollment" | "certificate_claim";
  amountNgn: number;
  amountUsd: number;
  userEmail?: string;
  onSuccess: () => void;
  onClose: () => void;
}

export default function PaymentModal({
  courseTitle,
  courseId,
  paymentType,
  amountNgn,
  amountUsd,
  userEmail = "scholar@phoenix.org",
  onSuccess,
  onClose,
}: PaymentModalProps) {
  const [provider, setProvider] = useState<"paystack" | "pvium">("paystack");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePay = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "current-user",
          userEmail,
          courseId,
          paymentType,
          provider,
          amount: provider === "paystack" ? amountNgn : amountUsd,
          currency: provider === "paystack" ? "NGN" : "USD",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.authorizationUrl) {
        throw new Error(data.error || "Failed to initialize checkout session");
      }

      // Redirect user to real checkout page (Paystack secure checkout or Pvium crypto page)
      window.location.href = data.authorizationUrl;
    } catch (e: any) {
      console.error("Payment error:", e);
      setErrorMessage(e?.message || "Could not start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink/90 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-card border border-card-line rounded-2xl p-6 shadow-2xl">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-ember/10 text-ember border border-card-line mb-2">
            Official Checkout
          </span>
          <h3 className="font-display text-xl text-bone">
            {paymentType === "certificate_claim"
              ? "Claim Verified Certificate"
              : "Course Full Enrollment"}
          </h3>
          <p className="text-xs text-ash mt-1">{courseTitle}</p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-flame/15 border border-flame/30 text-flame text-xs">
            {errorMessage}
          </div>
        )}

        {/* Payment Method Selector */}
        <div className="space-y-3 mb-6">
          <label
            onClick={() => setProvider("paystack")}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
              provider === "paystack"
                ? "border-ember bg-ink/80 ring-1 ring-ember"
                : "border-card-line bg-ink/40 hover:border-ash/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-card border border-card-line text-ember">
                <CreditCard size={20} />
              </div>
              <div>
                <div className="font-bold text-sm text-bone">Paystack</div>
                <div className="text-xs text-ash">Cards, Bank Transfer & USSD (Naira)</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-sm text-bone">
                ₦{amountNgn.toLocaleString()}
              </div>
              <div className="text-[10px] text-ash font-mono">NGN</div>
            </div>
          </label>

          <div
            className="flex items-center justify-between p-4 rounded-xl border border-card-line/50 bg-ink/20 opacity-60 cursor-not-allowed select-none relative overflow-hidden"
            title="Pvium crypto checkout is coming soon"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-card/60 border border-card-line/40 text-ash-dim">
                <Coins size={20} />
              </div>
              <div>
                <div className="font-bold text-sm text-ash flex items-center gap-2">
                  Pvium Crypto
                  <span className="text-[9px] font-mono uppercase bg-card-line text-ash border border-card-line px-1.5 py-0.5 rounded tracking-wide">
                    Coming Soon
                  </span>
                </div>
                <div className="text-xs text-ash-dim">USDT & Crypto Checkout (Under Maintenance)</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-sm text-ash-dim line-through">
                ${amountUsd}
              </div>
              <div className="text-[10px] text-ash-dim font-mono">USDT / USD</div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-ink/40 rounded-lg border border-card-line mb-6 flex items-start gap-2.5 text-xs text-ash">
          <ShieldAlert size={16} className="text-ember shrink-0 mt-0.5" />
          <span>
            You will be redirected to the secure payment portal. Once confirmed, your credentials and course are instantly unlocked.
          </span>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 px-4 rounded-xl border border-card-line text-xs font-mono uppercase tracking-wider text-ash hover:text-bone hover:border-ash/50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePay}
            disabled={loading}
            className="flex-1 py-3 px-4 rounded-xl grad-flame text-ink font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Redirecting...
              </>
            ) : (
              <>
                Proceed to Pay <ExternalLink size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
