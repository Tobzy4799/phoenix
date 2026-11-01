# Phoenix Ecosystem — Development & Architecture Rules

> **Scope**: These rules apply strictly to the `phoenix` project workspace (`c:\Users\Administrator\phoenix\phoenix`).
> **Authority**: Any agent working on this repository must strictly adhere to these conventions, brand guidelines, and architectural patterns.

---

## 1. Platform Identity & Voice

- **Core Identity**: Phoenix Ecosystem is an integrated Web3 growth agency, talent incubator, and creator network with a primary focus on the African Web3 ecosystem.
- **Tagline**: *"Create. Earn. Grow."*
- **Brand Voice**: Direct, authoritative, no-hype, proof-first, community-grounded. Avoid generic marketing jargon and vaporware promises.
- **Five Ecosystem Arms**:
  1. **Agency** (Revenue engine): Growth campaigns, KOL marketing, community management, token launch strategy.
  2. **Academy** (Talent pipeline): Education, onboarding, cohort training for Web3 builders and creators.
  3. **Campus Network** (On-the-ground Africa): University hubs, student ambassadors, local activations.
  4. **Community / House of Phoenix** (Social glue): Telegram & Discord spaces, creator network, weekly calls.
  5. **DAO / NFT**: Governance, identity, pass-gated perks, NFT collaborations.
- **Funnel Progression**: `Community -> Academy -> Campus Network -> Agency`
- **Official Links & Socials**:
  - Twitter/X: `@phoenixxweb3`
  - Calendly default: `https://calendly.com/phoenixxecosystem/discovery-call` (do not link to `/30min` or stale links)

---

## 2. Tech Stack

- **Framework**: Next.js 16.2.9 (App Router)
- **UI Library**: React 19.2.4
- **Language**: TypeScript (strict types, no untyped any whenever possible)
- **Styling**: Tailwind CSS v4 + Custom CSS variables (`globals.css`)
- **Animations**: Framer Motion 12
- **Icons**: Lucide React (`lucide-react`)
- **Backend / DB / Auth**: Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- **Deployment**: Vercel

---

## 3. Design System & CSS Variables

Do **NOT** use generic Tailwind colors (e.g. `bg-red-500`, `text-yellow-400`, `bg-black`). Always use the custom CSS variables and utility classes defined in [globals.css](file:///c:/Users/Administrator/phoenix/phoenix/src/app/globals.css):

### Color Tokens
- `--ink`: `#0A0705` (Primary background - deep volcanic ink)
- `--card`: `#1A0F08` (Card surface background)
- `--card-line`: `rgba(255, 138, 61, 0.14)` (Card borders & dividers)
- `--bone`: `#F5EDE4` (Primary text color)
- `--ash`: `#9A8A7C` (Secondary text color)
- `--ash-dim`: `#6B5E54` (Muted / tertiary text color)
- `--flame`: `#FF4D1C` (Primary energetic red-orange accent)
- `--ember`: `#FFA62B` (Warm glowing amber accent)

### Typography & Fonts
- **Display / Headings**: Archivo Black (`font-[family-name:var(--font-archivo-black)]`)
- **Body**: Inter (`font-[family-name:var(--font-inter)]`)
- **Mono / Eyebrows / Stats**: JetBrains Mono (`font-[family-name:var(--font-jetbrains-mono)]`)

### Utility Gradients & Classes
- `.grad-flame`: `linear-gradient(135deg, #FF4D1C 0%, #FFA62B 100%)` (Default for primary buttons & highlights)
- `.flame-text`: Gradient text fill with `background-clip: text; -webkit-text-fill-color: transparent;`
- `.grad-flame-soft`: Muted translucent glow for hover states and cards

---

## 4. UI & Component Patterns

### Essential Component Roster
- `EmberField` (`src/components/ui/EmberField.tsx`): Rising ember particle effect. **Always** include in Hero sections and major Call-To-Action banners.
- `ScrollReveal` (`src/components/ui/ScrollReveal.tsx`): Section wrapper for animated entry. Use `stagger` property when wrapping grids of cards.
- `MotionCard` (`src/components/ui/MotionCard.tsx`): Pre-styled container with dark volcanic card background, subtle ember border, and hover lift.
- `Navbar` & `Footer`: Render on every user-facing page (`<Navbar />` and `<Footer />`).
- `Marquee`: Horizontal social proof / partner ticker.

### Standard Page Architecture
Every new or existing route page should adhere to this layout structure:
```tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberField from "@/components/ui/EmberField";
import ScrollReveal from "@/components/ui/ScrollReveal";
// ...icons and UI helpers

// 1. DATA / CONFIG CONSTANTS (defined cleanly at top)
const DATA_ITEMS = [ ... ];

// 2. EYEBROW COMPONENT (if not imported)
function Eyebrow({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--card-line)] bg-[var(--card)] text-[var(--ember)] text-xs font-mono uppercase tracking-wider mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--flame)] animate-pulse" />
      {text}
    </div>
  );
}

// 3. PAGE COMPONENT
export default function FeaturePage() {
  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--bone)] flex flex-col justify-between selection:bg-[var(--flame)] selection:text-[var(--bone)]">
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        {/* Sections wrapped in ScrollReveal, with EmberField in hero/CTA */}
      </main>
      <Footer />
    </div>
  );
}
```

---

## 5. Authentication & Authorization Patterns

The platform implements a **dual-auth model**:

### User Authentication (Supabase)
- Utilizes `@supabase/ssr` with browser client (`lib/supabase-browser.ts`) and server client (`lib/supabase-server.ts`).
- Ecosystem protected routes: `/academy`, `/campus-network`, `/community`, `/dao-nft`, `/agency` subpages.
- Middleware (`middleware.ts`) automatically refreshes session cookies and verifies user access.

### Admin Authentication (Session Cookie + Secret)
- **NOT** stored in Supabase Auth users.
- Admin protection uses a dedicated HTTP-only cookie: `phoenix_admin_session`.
- Validated against the `ADMIN_SECRET` environment variable.
- Routes: `/admin`, `/admin/login`.
- Always respect this separation: do not attempt to login admin via Supabase standard auth.

---

## 6. Database & API Endpoints

### Canonical Supabase Database Schema
- **`submissions` table**: Stores application data.
  - Columns: `id` (uuid), `type` (`'hire'` | `'join'`), `submitted_at` (timestamptz), `status` (`'new'` | `'reviewed'` | `'accepted'` | `'rejected'`), `data` (jsonb).
- **`nft_collabs` table**: Managed via Admin portal.
  - Columns: `id`, `title`, `image_url`, `details`, `x_handle`, `x_link`, `post_link`, `winners_link`, `created_at`.
- **Storage Bucket**: `nft-collabs` (public access for project collateral).

### API Endpoints
- `POST/GET /api/submissions/hire`: Inbound brand/client hiring requests.
- `POST/GET /api/submissions/join`: Inbound creator/talent applications.
- `PATCH /api/submissions/status`: Admin status mutations.
- `GET/POST/DELETE /api/collabs`: NFT collaboration listings.
- `POST /api/admin/login` & `POST /api/admin/logout`: Admin session handling.

> **Note**: Stored JSON files (`data/hire-submissions.json`, `data/join-submissions.json`) are legacy development fallbacks. Supabase is the canonical source of truth in production.

---

## 7. Anti-Patterns & Quality Rules

1. **No Mock/Placeholder Data in Production Code**:
   - Never use fake WhatsApp numbers like `2348000000000`. Use configured environment variables or verified platform handles.
   - Do not use placeholder pricing markers like `$$` without specifying actual currencies/tiers.
2. **Next.js Breaking Changes & Version Rules**:
   - As noted in `AGENTS.md`, this is Next.js 16. Ensure server vs. client boundaries are strictly maintained (`"use client"` on animated or interactive UI components).
3. **No Unstyled Components**:
   - Never leave unstyled inputs or default browser buttons. Apply `bg-[var(--card)]`, `border-[var(--card-line)]`, `text-[var(--bone)]`, and focus rings with `[var(--flame)]`.
4. **Links Consistency**:
   - Calendly booking links must point to `https://calendly.com/phoenixxecosystem/discovery-call`.
   - Social links must use official `@phoenixxweb3`.
