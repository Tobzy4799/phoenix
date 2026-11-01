"use client";

import { useState } from "react";
import { Module } from "@/lib/courses-types";
import { CheckCircle2, XCircle, RotateCcw, AlertTriangle, ArrowRight, Award } from "lucide-react";

interface QuizSectionProps {
  module: Module;
  moduleIndex: number;
  initialBestScore?: number;
  isPassed?: boolean;
  onQuizCompleted: (scorePercentage: number) => void;
}

export default function QuizSection({
  module,
  moduleIndex,
  initialBestScore = 0,
  isPassed = false,
  onQuizCompleted,
}: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const questions = module.questions || [];

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const calculateScore = () => {
    if (questions.length === 0) return 100;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correct += 1;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = () => {
    const calculated = calculateScore();
    setScore(calculated);
    setSubmitted(true);
    onQuizCompleted(calculated);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const allAnswered = questions.length > 0 && Object.keys(selectedAnswers).length === questions.length;
  const currentPassed = (score !== null && score >= 70) || (score === null && isPassed);

  return (
    <div className="mt-6 pt-6 border-t border-card-line bg-ink/30 rounded-xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-ember border border-card-line px-2 py-0.5 rounded-full bg-card">
            Evaluation Quiz · Module {moduleIndex + 1}
          </span>
          <h4 className="font-display text-base text-bone mt-1.5">
            Module Knowledge Check
          </h4>
          <p className="text-xs text-ash mt-0.5">
            You must score at least <strong className="text-ember">70%</strong> to pass this module. Unlimited retries allowed.
          </p>
        </div>

        {isPassed && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <CheckCircle2 size={14} /> Passed ({initialBestScore}%)
          </div>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const userAns = selectedAnswers[qIdx];
          const isCorrect = userAns === q.correctAnswerIndex;

          return (
            <div
              key={q.id || qIdx}
              className={`p-4 rounded-xl border transition-all ${
                submitted
                  ? isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-flame/30 bg-flame/5"
                  : "border-card-line bg-ink/60"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-ember font-bold shrink-0 mt-0.5">
                  Q{qIdx + 1}.
                </span>
                <p className="text-sm font-medium text-bone leading-relaxed">
                  {q.question}
                </p>
              </div>

              <div className="mt-3.5 space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAns === optIdx;
                  let optStyle = "border-card-line bg-card/60 hover:border-ash/40 text-ash";

                  if (submitted) {
                    if (optIdx === q.correctAnswerIndex) {
                      optStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      optStyle = "border-flame bg-flame/20 text-flame font-semibold";
                    }
                  } else if (isSelected) {
                    optStyle = "border-ember bg-ember/15 text-ember font-semibold";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs leading-relaxed transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctAnswerIndex && (
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 ml-2" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle size={16} className="text-flame shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && q.explanation && (
                <div className="mt-3 p-2.5 rounded bg-ink/80 text-[11px] text-ash border border-card-line">
                  <span className="text-ember font-semibold font-mono">Explanation:</span> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Result feedback and action buttons */}
      <div className="mt-6 pt-4 border-t border-card-line flex flex-col sm:flex-row items-center justify-between gap-4">
        {submitted ? (
          <>
            <div className="flex items-center gap-3">
              {score !== null && score >= 70 ? (
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
                  <CheckCircle2 size={18} /> Passed with {score}%!
                </div>
              ) : (
                <div className="flex items-center gap-2 text-flame font-mono text-sm font-bold">
                  <AlertTriangle size={18} /> Score: {score}%. (Need &gt;= 70% to pass)
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleRetry}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-card-line text-xs font-mono uppercase tracking-wider text-ash hover:text-bone hover:border-ash/50 transition-colors"
              >
                <RotateCcw size={14} /> Retry Quiz
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-xs text-ash font-mono">
              {Object.keys(selectedAnswers).length} of {questions.length} answered
            </div>
            <button
              type="button"
              disabled={!allAnswered}
              onClick={handleSubmit}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl grad-flame text-ink font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Quiz <ArrowRight size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
