const fs = require("fs");
const path = require("path");

const matDir = path.join(__dirname, "..", "public", "materials");
if (!fs.existsSync(matDir)) fs.mkdirSync(matDir, { recursive: true });

function createPdf(title, subtitle, filename) {
  const content = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 280 >>
stream
BT
/F1 22 Tf
50 720 Td
(${title}) Tj
/F1 13 Tf
0 -36 Td
(${subtitle}) Tj
/F1 11 Tf
0 -30 Td
(Phoenix Ecosystem Academy Official Curriculum Material) Tj
0 -20 Td
(Passing Requirement: Minimum 70% score on the module quiz.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000227 00000 n 
0000000558 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
628
%%EOF`;
  fs.writeFileSync(path.join(matDir, filename), content.trim(), "utf8");
}

createPdf("Web3 Fundamentals - Module 1", "Blockchain Architecture & Cryptographic Foundations", "web3-fundamentals-module-1.pdf");
createPdf("Web3 Fundamentals - Module 2", "Non-Custodial Wallets, Keys & Security Hygiene", "web3-fundamentals-module-2.pdf");
createPdf("Web3 Fundamentals - Module 3", "DeFi Mechanics, Swaps & Smart Contract Interaction", "web3-fundamentals-module-3.pdf");
createPdf("Growth Playbook - Module 1", "The Phoenix Growth Framework & Retention Funnels", "growth-kol-module-1.pdf");
createPdf("Growth Playbook - Module 2", "KOL Campaign Structuring & Attribution", "growth-kol-module-2.pdf");
createPdf("Growth Playbook - Module 3", "Token Generation Event (TGE) Strategy", "growth-kol-module-3.pdf");
console.log("PDF files generated successfully!");
