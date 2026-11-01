import { Course } from "./courses-types";

export const INITIAL_COURSES: Course[] = [
  {
    id: "course-web3-fundamentals",
    slug: "web3-fundamentals",
    title: "Web3 Fundamentals & Wallet Mastery",
    tagline: "From zero to confidently navigating decentralised protocols, wallets, and on-chain security.",
    description: "Master the foundational mechanics of Web3. Learn how blockchains work, set up non-custodial wallets with robust security hygiene, decode smart contracts, and explore decentralised applications with practical African ecosystem examples.",
    tier: "free",
    priceNgn: 0,
    priceUsd: 0,
    certPriceNgn: 7500,
    certPriceUsd: 5,
    level: "Beginner",
    category: "Foundations",
    badge: "Core Starter",
    estimatedHours: "4 Hours",
    published: true,
    createdAt: "2026-01-15T00:00:00.000Z",
    modules: [
      {
        id: "mod-1-1",
        title: "Module 1: Blockchain Architecture & Cryptographic Foundations",
        description: "Understanding decentralisation, distributed ledgers, consensus mechanisms (PoW vs PoS), and gas economics.",
        duration: "45 mins",
        pdfUrl: "/materials/web3-fundamentals-module-1.pdf",
        pdfFileName: "Phoenix_Academy_Web3_Fundamentals_Mod1.pdf",
        questions: [
          {
            id: "q-1-1-1",
            question: "What is the primary difference between a centralised database and a blockchain ledger?",
            options: [
              "A blockchain ledger is stored across a distributed, immutable network with cryptographic verification",
              "A centralised database is always faster and completely immutable",
              "A blockchain cannot store numerical balances",
              "There is no difference except the cloud provider"
            ],
            correctAnswerIndex: 0,
            explanation: "Blockchains distribute identical cryptographic ledger state across independent nodes rather than a single central entity."
          },
          {
            id: "q-1-1-2",
            question: "In Proof of Stake (PoS), how are block validators selected?",
            options: [
              "By running energy-intensive hashing algorithms",
              "Based on the economic stake they have committed/bonded to the network",
              "Alphabetically by their IP address",
              "By a central administrator's approval"
            ],
            correctAnswerIndex: 1,
            explanation: "Proof of Stake selects validators proportionally based on their staked cryptocurrency tokens."
          },
          {
            id: "q-1-1-3",
            question: "What does 'gas' represent on networks like Ethereum or Polygon?",
            options: [
              "A physical fuel used to power data centers",
              "The computational cost and fee required to execute transactions or smart contract operations",
              "A penalty fee for making errors",
              "The monthly subscription price of the network"
            ],
            correctAnswerIndex: 1,
            explanation: "Gas measures computational units needed to execute state updates and smart contract code on the EVM."
          },
          {
            id: "q-1-1-4",
            question: "What is an 'unspent transaction output' (UTXO) model commonly associated with?",
            options: [
              "Solana program storage",
              "Bitcoin's ledger accounting model",
              "Ethereum account balance model",
              "Relational SQL foreign keys"
            ],
            correctAnswerIndex: 1,
            explanation: "Bitcoin uses the UTXO model, where transactions consume unspent outputs and create new ones."
          }
        ]
      },
      {
        id: "mod-1-2",
        title: "Module 2: Non-Custodial Wallets, Keys & Security Hygiene",
        description: "Public/private key cryptography, seed phrases, hardware wallets, avoiding phishing and social engineering in Web3.",
        duration: "60 mins",
        pdfUrl: "/materials/web3-fundamentals-module-2.pdf",
        pdfFileName: "Phoenix_Academy_Web3_Fundamentals_Mod2.pdf",
        questions: [
          {
            id: "q-1-2-1",
            question: "If someone asks for your 12 or 24-word Secret Recovery Phrase to 'validate' your wallet, what should you do?",
            options: [
              "Share only the first 6 words",
              "Never share it under any circumstance; legitimate support will never ask for your seed phrase",
              "Provide it if the person claims to be a Phoenix admin",
              "Type it into a Google Form"
            ],
            correctAnswerIndex: 1,
            explanation: "Your seed phrase is your master cryptographic key. Anyone with it has full control over all your funds."
          },
          {
            id: "q-1-2-2",
            question: "What is the key advantage of a non-custodial wallet compared to a centralised exchange (CEX)?",
            options: [
              "You own the private keys and have absolute sovereignty over your on-chain assets",
              "The exchange customer support can reset your lost password",
              "You never have to pay network transaction gas fees",
              "You receive automated daily fiat interest from the government"
            ],
            correctAnswerIndex: 0,
            explanation: "With non-custodial wallets, 'Not your keys, not your coins' holds true: you retain sovereign custody."
          },
          {
            id: "q-1-2-3",
            question: "Which of the following is considered a best practice for storing your backup seed phrase?",
            options: [
              "Taking a screenshot and keeping it in Google Photos",
              "Writing it down physically on paper or engraving on metal stored in a secure location",
              "Emailing it to your personal inbox",
              "Sending it via WhatsApp to your secondary phone"
            ],
            correctAnswerIndex: 1,
            explanation: "Physical, offline media prevents seed phrase exposure to digital malware, cloud breaches, and device sync compromises."
          },
          {
            id: "q-1-2-4",
            question: "What does an unlimited token allowance approval grant to a smart contract?",
            options: [
              "Read-only access to view your wallet balance",
              "Permission for that contract address to transfer up to the specified allowance from your balance without further prompt",
              "Automatic staking with guaranteed 50% yield",
              "A discount on all decentralized exchange fees"
            ],
            correctAnswerIndex: 1,
            explanation: "Token approvals grant smart contracts permission to transfer tokens on your behalf; suspicious contracts can drain approved funds."
          }
        ]
      },
      {
        id: "mod-1-3",
        title: "Module 3: DeFi Mechanics, Swaps & Smart Contract Interaction",
        description: "Automated Market Makers (AMMs), liquidity pools, slippage, bridging assets across networks, and on-chain explorers.",
        duration: "55 mins",
        pdfUrl: "/materials/web3-fundamentals-module-3.pdf",
        pdfFileName: "Phoenix_Academy_Web3_Fundamentals_Mod3.pdf",
        questions: [
          {
            id: "q-1-3-1",
            question: "In an Automated Market Maker (AMM) like Uniswap, what replaces the traditional order book?",
            options: [
              "Central market maker algorithms hosted on AWS",
              "Liquidity pools governed by mathematical formulas such as x * y = k",
              "Manual auction brokers",
              "Traditional bank clearinghouses"
            ],
            correctAnswerIndex: 1,
            explanation: "AMMs use peer-to-contract liquidity pools where prices automatically adjust according to invariant formulas like x * y = k."
          },
          {
            id: "q-1-3-2",
            question: "What does 'slippage' refer to during a DEX token swap?",
            options: [
              "The difference between the expected price of a trade and the price at which the trade actually executes",
              "The network fee paid to miners",
              "A lost Internet connection during the transaction",
              "The wallet balance rounding error"
            ],
            correctAnswerIndex: 0,
            explanation: "Slippage occurs when market liquidity moves or pool balances change between submission and block inclusion."
          },
          {
            id: "q-1-3-3",
            question: "How do you verify whether a transaction succeeded and see the token transfer details?",
            options: [
              "By checking the transaction hash (TxID) on a block explorer like Etherscan or Polygonscan",
              "By sending a support ticket to Apple",
              "By asking Telegram community chat moderators",
              "By restarting your WiFi router"
            ],
            correctAnswerIndex: 0,
            explanation: "Block explorers provide public, verifiable proof of state updates, logs, events, and token transfers for any transaction hash."
          },
          {
            id: "q-1-3-4",
            question: "What is 'impermanent loss' in liquidity provision?",
            options: [
              "Losing your wallet password temporarily",
              "The difference in value between holding tokens versus providing them to an AMM pool whose relative prices diverge",
              "A permanent network tax on all liquidity providers",
              "An error that happens only during hard forks"
            ],
            correctAnswerIndex: 1,
            explanation: "Impermanent loss measures the opportunity cost of LPing when pool token prices diverge compared to simply holding both assets."
          }
        ]
      }
    ]
  },
  {
    id: "course-growth-kol-architecture",
    slug: "growth-kol-architecture",
    title: "Web3 Growth, KOL Architecture & Token Launch Strategy",
    tagline: "The comprehensive blueprint for executing high-velocity community growth, African KOL campaigns, and token launch funnels.",
    description: "Built directly from the Phoenix Agency playbook. Learn how top Web3 protocols scale from zero to tens of thousands of real active contributors, execute influencer campaigns that drive actual on-chain retention, and navigate token launches.",
    tier: "paid",
    priceNgn: 35000,
    priceUsd: 25,
    certPriceNgn: 0,
    certPriceUsd: 0,
    level: "Intermediate",
    category: "Agency Growth",
    badge: "Agency Certified",
    estimatedHours: "8 Hours",
    published: true,
    createdAt: "2026-02-01T00:00:00.000Z",
    modules: [
      {
        id: "mod-2-1",
        title: "Module 1: The Phoenix Growth Framework & Retention Funnels",
        description: "Breaking down the Community → Academy → Campus Network → Agency growth flywheel and measuring genuine on-chain retention.",
        duration: "1.5 hours",
        pdfUrl: "/materials/growth-kol-module-1.pdf",
        pdfFileName: "Phoenix_Growth_Playbook_Mod1.pdf",
        questions: [
          {
            id: "q-2-1-1",
            question: "What is the primary flaw in relying purely on vanity metrics (Twitter followers, Telegram bot members) for Web3 growth?",
            options: [
              "They do not correlate with on-chain transaction volume, protocol liquidity, or sticky retention",
              "Vanity metrics cannot be calculated in Web3",
              "Twitter followers cost too much gas to display",
              "Smart contracts reject users with fewer than 10,000 followers"
            ],
            correctAnswerIndex: 0,
            explanation: "Vanity metrics frequently mask bot farming; real protocol health requires measuring active wallet retention and on-chain utility."
          },
          {
            id: "q-2-1-2",
            question: "In the Phoenix ecosystem funnel, what role does the Academy arm play in driving agency client success?",
            options: [
              "It filters and educates raw audience traffic so clients acquire skilled, knowledgeable users rather than mercenary airdrop hunters",
              "It handles token minting on Solana",
              "It replaces standard smart contract audits",
              "It guarantees 100x financial returns for all students"
            ],
            correctAnswerIndex: 0,
            explanation: "Academy educates and converts newcomers into high-context contributors, establishing genuine engagement and product familiarity."
          },
          {
            id: "q-2-1-3",
            question: "Which retention cohort measurement is most valuable for a DeFi protocol or Web3 gaming app?",
            options: [
              "Weekly / monthly active transacting wallets (WAU/MAU) retained past day 30",
              "Total number of Discord reactions on announcement posts",
              "Total number of retweet bots",
              "Number of logos displayed on the landing page"
            ],
            correctAnswerIndex: 0,
            explanation: "Day-30 retained transacting wallets reflect true product-market fit and sustained network effect."
          }
        ]
      },
      {
        id: "mod-2-2",
        title: "Module 2: KOL Campaign Structuring, Vetting & Performance Attribution",
        description: "Structuring influencer contracts, identifying fake engagement, designing performance-tied bounties, and tracking on-chain conversion.",
        duration: "2 hours",
        pdfUrl: "/materials/growth-kol-module-2.pdf",
        pdfFileName: "Phoenix_Growth_Playbook_Mod2.pdf",
        questions: [
          {
            id: "q-2-2-1",
            question: "How can an agency detect artificial engagement (bot likes/retweets) on a prospective KOL's profile?",
            options: [
              "Check reply authenticity, comment relevance, follower-to-engagement velocity, and audit with analytics tools",
              "Trust the KOL's self-reported screenshot without verification",
              "Verify only their follower count",
              "Assume any account with a blue checkmark is 100% human"
            ],
            correctAnswerIndex: 0,
            explanation: "Authentic accounts have organic conversational replies, healthy velocity curves, and diverse interaction patterns."
          },
          {
            id: "q-2-2-2",
            question: "What is an optimal compensation structure to align KOL incentives with campaign ROI?",
            options: [
              "A hybrid model with a baseline fee plus milestone bonuses tied to verifiable conversions (e.g., referral links, on-chain mints)",
              "Paying 100% upfront in meme tokens with no deliverables clause",
              "Paying only after 5 years of protocol operation",
              "Giving away 50% of the DAO treasury on day one"
            ],
            correctAnswerIndex: 0,
            explanation: "Hybrid structures align creative execution with measurable on-chain results and affiliate conversion."
          },
          {
            id: "q-2-2-3",
            question: "Why are localized African regional KOLs especially potent for grassroots Web3 adoption?",
            options: [
              "They communicate in localized languages and cultural contexts, bridging direct trust in peer-to-peer communities",
              "They have cheaper gas fees on their computers",
              "They are officially regulated by Ethereum Foundation",
              "They have exclusive access to Bitcoin mining rigs"
            ],
            correctAnswerIndex: 0,
            explanation: "Grassroots KOLs possess genuine community trust and localized linguistic nuances that international campaigns lack."
          }
        ]
      },
      {
        id: "mod-2-3",
        title: "Module 3: Token Generation Event (TGE) Strategy & Liquidity Bootstrapping",
        description: "Vesting curves, launchpad selection, community airdrop eligibility models, anti-sybil defenses, and post-listing stabilization.",
        duration: "2 hours",
        pdfUrl: "/materials/growth-kol-module-3.pdf",
        pdfFileName: "Phoenix_Growth_Playbook_Mod3.pdf",
        questions: [
          {
            id: "q-2-3-1",
            question: "What is the primary danger of having 0% token vesting with 100% unlocked tokens at TGE for early seed investors?",
            options: [
              "Massive dump pressure that depletes liquidity pool reserves and destroys token price stability",
              "The blockchain node will run out of hard drive space",
              "Validators will refuse to process blocks",
              "The contract cannot be listed on DexScreener"
            ],
            correctAnswerIndex: 0,
            explanation: "Cliff and linear vesting schedules protect secondary market participants from sudden liquidity extraction."
          },
          {
            id: "q-2-3-2",
            question: "What is a 'Sybil attack' in the context of community airdrop distributions?",
            options: [
              "A single actor generating hundreds or thousands of automated wallet addresses to extract multiple allocations",
              "A hardware failure in the mining server",
              "A distributed denial of service attack on the website frontend",
              "A hack of the founder's email address"
            ],
            correctAnswerIndex: 0,
            explanation: "Sybil attackers farm rewards by pretending to be numerous independent community members."
          },
          {
            id: "q-2-3-3",
            question: "How do modern protocols combat Sybil farmers during token distributions?",
            options: [
              "Implementing on-chain activity heuristics, Gitcoin Passport / biometric verification, and minimum volume/frequency thresholds",
              "Giving tokens only to users with high Twitter follower counts",
              "Sending tokens only to gmail.com addresses",
              "Randomly deleting 50% of all registered addresses"
            ],
            correctAnswerIndex: 0,
            explanation: "Multi-layered anti-sybil filtering examines cluster transaction analysis, proof of humanity, and genuine protocol utility history."
          }
        ]
      }
    ]
  }
];
