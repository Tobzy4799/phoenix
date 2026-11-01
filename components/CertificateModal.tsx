"use client";

import { useState } from "react";
import { Award, Download, Flame, ShieldCheck, Printer, Check, X } from "lucide-react";

interface CertificateProps {
  studentName: string;
  courseTitle: string;
  certificateId: string;
  completionDate: string;
  tier: "free" | "paid";
  onClose?: () => void;
}

export default function CertificateModal({
  studentName,
  courseTitle,
  certificateId,
  completionDate,
  tier,
  onClose,
}: CertificateProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const formattedDate = new Date(completionDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = async () => {
    try {
      setDownloading(true);

      // Create an offscreen high-res canvas (1600x1130 for crisp landscape rendering)
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = 1130;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1600, 1130);
      bgGrad.addColorStop(0, "#120a05");
      bgGrad.addColorStop(0.5, "#1a0f08");
      bgGrad.addColorStop(1, "#0a0604");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1600, 1130);

      // 2. Thick Outer Border
      ctx.lineWidth = 14;
      ctx.strokeStyle = "#2a170d";
      ctx.strokeRect(10, 10, 1580, 1110);

      // 3. Inner accent border with embers
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 166, 43, 0.4)";
      ctx.strokeRect(40, 40, 1520, 1050);

      // 4. Corner bracket ornaments
      const drawCorner = (x: number, y: number, dx: number, dy: number) => {
        ctx.strokeStyle = "#FFA62B";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(x, y + dy * 40);
        ctx.lineTo(x, y);
        ctx.lineTo(x + dx * 40, y);
        ctx.stroke();
      };
      drawCorner(55, 55, 1, 1);
      drawCorner(1545, 55, -1, 1);
      drawCorner(55, 1075, 1, -1);
      drawCorner(1545, 1075, -1, -1);

      // 5. Header: Phoenix Title
      ctx.textAlign = "center";
      ctx.fillStyle = "#FF4D1C";
      ctx.font = "bold 32px 'Archivo Black', sans-serif, Arial";
      ctx.fillText("🔥 PHOENIX ECOSYSTEM", 800, 150);

      ctx.fillStyle = "#FFA62B";
      ctx.font = "600 16px 'JetBrains Mono', monospace, Arial";
      ctx.letterSpacing = "4px";
      ctx.fillText("ACADEMY OF DECENTRALISED GROWTH & TECHNOLOGY", 800, 195);
      ctx.letterSpacing = "0px";

      // Divider line
      const divGrad = ctx.createLinearGradient(650, 220, 950, 220);
      divGrad.addColorStop(0, "rgba(255, 77, 28, 0)");
      divGrad.addColorStop(0.5, "#FF4D1C");
      divGrad.addColorStop(1, "rgba(255, 166, 43, 0)");
      ctx.strokeStyle = divGrad;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(650, 225);
      ctx.lineTo(950, 225);
      ctx.stroke();

      // 6. "THIS IS TO CERTIFY THAT"
      ctx.fillStyle = "#9A8A7C";
      ctx.font = "16px 'JetBrains Mono', monospace, Arial";
      ctx.fillText("THIS IS TO CERTIFY THAT", 800, 360);

      // 7. Student Name
      ctx.fillStyle = "#FFA62B";
      ctx.font = "bold 58px 'Archivo Black', sans-serif, Arial";
      const name = (studentName || "Phoenix Scholar").toUpperCase();
      ctx.fillText(name, 800, 460);

      // 8. Description text
      ctx.fillStyle = "#9A8A7C";
      ctx.font = "20px 'Inter', sans-serif, Arial";
      ctx.fillText(
        "has successfully completed all modules and rigorously passed all evaluation",
        800,
        550
      );
      ctx.fillText(
        "quizzes with a minimum threshold of 70% in",
        800,
        585
      );

      // 9. Course Title
      ctx.fillStyle = "#F5EDE4";
      ctx.font = "bold 38px 'Archivo Black', sans-serif, Arial";
      ctx.fillText(courseTitle, 800, 680);

      // 10. Footer info line
      ctx.strokeStyle = "rgba(255, 138, 61, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, 890);
      ctx.lineTo(1520, 890);
      ctx.stroke();

      // Left: Issued Date
      ctx.textAlign = "left";
      ctx.fillStyle = "#6B5E54";
      ctx.font = "13px 'JetBrains Mono', monospace, Arial";
      ctx.fillText("ISSUED ON", 120, 940);
      ctx.fillStyle = "#F5EDE4";
      ctx.font = "bold 16px 'JetBrains Mono', monospace, Arial";
      ctx.fillText(formattedDate, 120, 970);

      // Center: Credential ID
      ctx.textAlign = "center";
      ctx.fillStyle = "#6B5E54";
      ctx.font = "13px 'JetBrains Mono', monospace, Arial";
      ctx.fillText("VERIFIED CREDENTIAL ID", 800, 940);
      ctx.fillStyle = "#FFA62B";
      ctx.font = "bold 18px 'JetBrains Mono', monospace, Arial";
      ctx.fillText(certificateId, 800, 970);

      // Right: Signature
      ctx.textAlign = "right";
      ctx.fillStyle = "#FFA62B";
      ctx.font = "italic 22px Georgia, serif";
      ctx.fillText("Phoenix Academic Board", 1480, 945);
      ctx.fillStyle = "#9A8A7C";
      ctx.font = "12px 'JetBrains Mono', monospace, Arial";
      ctx.fillText("AUTHORIZED SIGNATURE", 1480, 975);

      // Convert canvas to image & trigger direct download
      const imageUri = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = imageUri;
      downloadLink.download = `Phoenix_Certificate_${certificateId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to generate certificate download:", err);
      // Fallback to print
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-6 bg-ink/95 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto bg-card border border-card-line rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Top Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-6 py-3.5 border-b border-card-line bg-ink/70">
          <div className="flex items-center gap-2">
            <Award className="text-ember" size={20} />
            <span className="font-mono text-xs uppercase tracking-wider text-ember font-bold">
              Official Phoenix Credential
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct High-Res Image/PDF Download */}
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full grad-flame text-ink hover:opacity-95 transition-opacity shadow-lg active:scale-95"
            >
              {downloadSuccess ? (
                <>
                  <Check size={14} className="text-ink" /> Saved!
                </>
              ) : (
                <>
                  <Download size={14} /> {downloading ? "Preparing..." : "Download Certificate"}
                </>
              )}
            </button>

            {/* Print / PDF Dialog */}
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-bone rounded-full border border-card-line hover:border-ember hover:text-ember transition-colors"
            >
              <Printer size={13} /> Print
            </button>

            {/* Close */}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-ash hover:text-bone rounded-lg border border-card-line hover:bg-ink transition-colors"
                title="Close"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="p-3 md:p-8 flex justify-center bg-[#070503] overflow-x-auto">
          <div
            id="phoenix-certificate"
            className="relative w-full max-w-[800px] aspect-[1.414/1] bg-gradient-to-br from-[#120a05] via-[#1a0f08] to-[#0a0604] border-[8px] border-[#2a170d] p-8 md:p-12 text-center flex flex-col justify-between shadow-2xl relative overflow-hidden"
            style={{
              boxShadow: "0 0 50px rgba(255, 77, 28, 0.15) inset, 0 20px 40px rgba(0,0,0,0.8)",
            }}
          >
            {/* Corner Ornamental Accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-ember/60 pointer-events-none" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-ember/60 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-ember/60 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-ember/60 pointer-events-none" />

            {/* Subtle Ember watermark in center */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Flame size={320} className="text-flame" />
            </div>

            {/* Certificate Header */}
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame size={28} className="text-flame animate-pulse" />
                <span className="font-display tracking-widest text-xl text-bone">
                  PHOENIX ECOSYSTEM
                </span>
              </div>
              <p className="font-mono text-[10px] md:text-xs text-ember uppercase tracking-[0.25em]">
                Academy of Decentralised Growth & Technology
              </p>
              <div className="w-24 h-0.5 mx-auto grad-flame mt-3" />
            </div>

            {/* Main Certificate Body */}
            <div className="relative z-10 my-4">
              <p className="text-xs md:text-sm font-mono text-ash uppercase tracking-wider mb-2">
                This is to certify that
              </p>
              <h2 className="font-display text-2xl md:text-4xl text-bone tracking-tight flame-text capitalize py-1">
                {studentName || "Phoenix Scholar"}
              </h2>
              <p className="text-xs md:text-sm text-ash max-w-lg mx-auto mt-2 leading-relaxed">
                has successfully completed all modules and rigorously passed all evaluation quizzes with a minimum threshold of 70% in
              </p>
              <h3 className="font-display text-lg md:text-2xl text-bone mt-2 text-ember">
                {courseTitle}
              </h3>
            </div>

            {/* Signatures & Verification Footer */}
            <div className="relative z-10 pt-4 border-t border-card-line/50 flex flex-col md:flex-row items-center justify-between gap-4 text-left">
              <div>
                <p className="font-mono text-[10px] text-ash-dim uppercase">Issued On</p>
                <p className="font-mono text-xs text-bone">{formattedDate}</p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-card-line bg-ink/60">
                <ShieldCheck size={16} className="text-ember" />
                <div>
                  <p className="font-mono text-[9px] text-ash-dim uppercase">Credential ID</p>
                  <p className="font-mono text-[11px] text-bone font-bold">{certificateId}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-serif italic text-ember text-sm mb-0.5">Phoenix Academic Board</div>
                <p className="font-mono text-[9px] text-ash uppercase tracking-wider">Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
