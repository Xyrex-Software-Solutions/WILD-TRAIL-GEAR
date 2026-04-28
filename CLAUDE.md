# WILD TRAIL GEAR — Claude Code Instructions

---

# Rule 1: Always Read First
Before taking any action, read this entire file.
If project_specs.md exists, read that too.
If project_specs.md doesn't exist, create it first.

# Rule 2: Define Before You Build
Before writing any code, create/update project_specs.md with:
- What the app does and who uses it
- Pages and user flows
- Data and where it lives
- What "done" looks like
Show the file and wait for approval before writing any code.

# Rule 3: Look Before You Create
Always check existing files before creating new ones.
If anything is unclear, ask before starting.

# Rule 4: Test Before You Respond
After any code change, run npm run dev and check for errors.
Never say "done" if untested.
Run npm run build and fix all TypeScript/build errors before 
marking anything complete.

# Core Rule
Do exactly what is asked. Nothing more, nothing less.

---

# How to Respond
Explain like you're talking to someone with no coding background.

For every response include:
- What I just did — plain English, no jargon
- What you need to do — step by step
- Why — one sentence
- Next step — one clear action
- Errors — if something broke, explain simply and say how to fix

---

# Business Context

WILD TRAIL GEAR is an outdoor camping gear rental service
based in Panadura, Sri Lanka.
- No online booking. All rentals handled via WhatsApp manually.
- WhatsApp: https://wa.me/94754768386
- Location: Panadura, Sri Lanka
- Tagline: "Your Adventure Starts Here. Gear Up And Go."

---

# Tech Stack
- Language: TypeScript
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Animations: GSAP
- Deployment: Vercel

Do NOT build a static HTML site. Always use Next.js App Router.

---

# Running the Project
1. Install dependencies: npm install
2. Run: npm run dev
3. Open browser at http://localhost:3000

---

# Pages
1. / → Home
2. /catalog → Gear catalog
3. /about → About us
4. /contact → Contact page

---

# File Structure
/app → All pages
/app/api/ → Backend route handlers
/components/ → Reusable UI components (cards, nav, footer)
/lib/ → Shared helper functions
/public/images/products/ → All gear product images
/public/images/ → Hero and brand images
.env.local → Secret keys, never commit to GitHub
CLAUDE.md → This file
project_specs.md → Blueprint created before any coding starts

Code organisation rules:
- One component per file
- Keep API routes thin
- Don't create new top-level folders without asking first
- Don't change code unrelated to the current task

---

# Design System

## Colors
- Forest Green: #1B4332
- Sage: #52796F
- Background: #F8F5F0
- Dark Surface: #1B2E20
- Price Badge: #2D4A35
- Cream Text: #F5F0E8

## Typography
- Headings: Playfair Display (Google Fonts) — Bold
- Body: Inter (Google Fonts) — Regular/Medium
- Price badges: Inter Bold
- Import both from Google Fonts CDN

## Design Rules
- Premium, warm, nature-immersed aesthetic
- No emoji icons
- No generic gradients
- Proper spacing and visual hierarchy
- Compass (⊕) and hiking boot used as decorative line icons
- Dark sections alternate with warm off-white sections

---

# Catalog Items (Pre-populate)
- Manual Tent: 3P=LKR500, 4P=LKR600, 6P=LKR750, 8P=LKR900/day
- Windproof Gas Stove: LKR 250/day
- Cooking Set: LKR 300/day
- Hammock: LKR 200/day
- Anti Leech Socks: LKR 250/day
- Water Bag 3L: LKR 300/day

---

# Business Rules
- ALL "Rent Now" buttons → open wa.me/94754768386
- Floating WhatsApp bubble → fixed bottom-right on all pages
- Item availability shown as: Available / Limited / Unavailable
- No prices, booking, or payment processing on the site
- Admin updates quantities manually (no automation)

---

# GSAP Animation Instructions

All animations must feel SLOW and WARM.
No snap. No bounce.
Think: "morning mist settling on a forest."
Easing: power2.out or sine.inOut throughout.

1. HERO
   - Slow parallax on background image (y: 20% on scroll)
   - Text fades up with stagger on page load (0.8s ease)

2. PRODUCT CARDS
   - Gentle float-up on scroll reveal
   - Subtle scale 1.0 → 1.03 on hover (not bouncy)
   - Price badge pulses softly on card hover

3. SECTION TRANSITIONS
   - Warm fade: opacity 0→1 with slight upward drift
   - y: 30px → 0, staggered children

4. COMPASS ICONS
   - Slow rotation 360deg, 8s infinite loop
   - Very subtle — like it's quietly alive

5. STATS/NUMBERS
   - Count-up animation when scrolled into view

6. NAV
   - Blur backdrop appears on scroll past hero

7. DARK SECTIONS
   - Horizontal reveal: content slides from left,
     image slides from right (splitscreen effect)

---

# Hero Section
- Full-bleed mountain/forest backdrop image
- Dark-to-transparent gradient overlay at bottom
- Product content below feels like it emerges from landscape
- Parallax scroll effect on background

---

# Image Assets
Located in /public/images/products/:
- tent.jpg
- gas-stove.jpg
- cooking-set.jpg
- hammock.jpg
- anti-leech-socks.jpg
- water-bag.jpg
- hero-hikers.jpg

All product images: item photographed on rocks,
misty mountain/forest backdrop. Use as-is.

---

# How to Write Code
- Simple and readable — clarity over cleverness
- One change at a time
- Don't over-engineer
- Add console.log at start and end of each API route
- If a big structural change is needed, explain why first

---

# Secrets & Safety
- Never put API keys in code
- Never commit .env.local to GitHub
- Ask before deleting or renaming any important files

---

# Scope
Only build what is described here and in project_specs.md.
If anything is unclear, ask before starting.