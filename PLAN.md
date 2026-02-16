# ЧКХ — Implementation Plan

## Summary of Decisions
- **Fonts**: Bebas Neue (headings) + Roboto (body) via next/font/google
- **Page /menu**: Active button in Hero → /menu page with "coming soon" placeholder
- **Page /loyalty**: Placeholder page with "coming soon" text
- **Map**: Yandex Maps embed (iframe, no API key needed)
- **Section backgrounds**: sand → omega-green → sand → deep-sea → sunset → black
- **Grain overlay**: CSS-generated (SVG filter)
- **Scroll progress**: Thin top bar, sunset color
- **Header**: Fixed always, with logo ЧКХ + nav links (О нас / Правила / Локация / Меню)
- **Mobile nav**: Burger menu

---

## Project Structure

```
/app
  layout.tsx          — root layout, fonts, metadata, grain overlay, scroll progress
  page.tsx            — main landing page (all sections)
  globals.css         — CSS variables, base styles, grain filter
  menu/
    page.tsx          — /menu placeholder page
  loyalty/
    page.tsx          — /loyalty placeholder page
/components
  Header.tsx          — fixed header with nav + mobile burger
  Section.tsx         — wrapper component (bg color, padding, id anchor)
  Hero.tsx            — hero section
  Manifest.tsx        — manifest section
  Rules.tsx           — 4 rule cards in grid
  Location.tsx        — location + yandex map + image placeholder
  Opening.tsx         — opening announcement + social buttons
  Footer.tsx          — minimal footer
  ScrollProgress.tsx  — thin top progress bar
  ui/
    Button.tsx        — primary / secondary / disabled variants
    TiltCard.tsx      — card with rotation + hover effect
    AnimatedLines.tsx — line-by-line text reveal
    GrainOverlay.tsx  — CSS grain overlay component
    ParallaxLayer.tsx — parallax background element
/lib
  content.ts          — all copy/text content
  config.ts           — site mode toggles, social links
  utils.ts            — helper functions (cn, etc.)
/public
  images/
    facade-placeholder.jpg  — generated placeholder
```

---

## Step-by-Step Implementation

### Phase 1: Scaffold & Config
1. `npx create-next-app@latest` with TypeScript, Tailwind, App Router
2. Install `framer-motion`
3. Configure Tailwind with CSS variables (colors from design system)
4. Set up `globals.css` with CSS variables + grain SVG filter
5. Configure fonts (Bebas Neue + Roboto) in layout.tsx via next/font/google

### Phase 2: Foundation Components
6. Create `/lib/content.ts` — all Russian copy
7. Create `/lib/config.ts` — siteMode toggles + social links
8. Create `/lib/utils.ts` — cn() helper
9. Create `ui/Button.tsx` — primary (sunset), secondary (outline), disabled
10. Create `ui/GrainOverlay.tsx` — CSS noise overlay
11. Create `ui/AnimatedLines.tsx` — Framer Motion line-by-line reveal
12. Create `ui/TiltCard.tsx` — rotated card with hover snap
13. Create `ui/ParallaxLayer.tsx` — scroll-linked parallax element
14. Create `Section.tsx` — section wrapper with bg color prop + anchor id
15. Create `ScrollProgress.tsx` — top progress bar (Framer Motion useScroll)

### Phase 3: Header
16. Create `Header.tsx` — fixed header, logo left, nav right, mobile burger
    - Nav items: О нас (#manifest), Правила (#rules), Локация (#location), Меню (/menu)
    - Mobile: burger → slide-in menu
    - Background adapts (transparent on hero, solid on scroll)

### Phase 4: Page Sections
17. Create `Hero.tsx`
    - Sand background, grain overlay
    - ЧКХ title (large Bebas Neue) + subtitle lines
    - Two buttons: "Смотреть меню" (→ /menu), "Где мы будем" (scroll → #location)
    - ParallaxLayer for background effect

18. Create `Manifest.tsx`
    - omega-green background, white text
    - "Мы не ресторан." heading
    - AnimatedLines for 4 lines

19. Create `Rules.tsx`
    - Sand background
    - "Правила ЧКХ" heading (implied)
    - 2x2 grid (1col mobile) of TiltCards
    - Each card: thick border, slight rotation, hover effect

20. Create `Location.tsx`
    - deep-sea background, white text
    - "Альфа на Омеге." heading + lines
    - Yandex Maps iframe (Бухта Омега coordinates)
    - Image placeholder block

21. Create `Opening.tsx`
    - sunset background, white text
    - "Мы открываемся." heading + lines
    - Telegram + Instagram buttons (secondary style)

22. Create `Footer.tsx`
    - black background, white/sand text
    - ЧКХ / Бухта Омега / Севастополь

### Phase 5: Assemble & Routes
23. Assemble all sections in `app/page.tsx`
24. Create `app/menu/page.tsx` — styled placeholder
25. Create `app/loyalty/page.tsx` — styled placeholder
26. Set metadata in `app/layout.tsx` (title, description, OG)

### Phase 6: Animations & Polish
27. Wire up all 4 signature effects:
    - AnimatedLines in Manifest, Location, Opening
    - ParallaxLayer in Hero
    - TiltCard rotations in Rules
    - ScrollProgress bar
28. Add `prefers-reduced-motion` support
29. Responsive testing checkpoints (320, 768, 1200)
30. Generate placeholder image for facade

---

## Color Map (Section → Background)
| Section   | Background    | Text Color |
|-----------|---------------|------------|
| Hero      | sand #E7D8C3  | black      |
| Manifest  | omega-green #1F5C4A | white |
| Rules     | sand #E7D8C3  | black      |
| Location  | deep-sea #0F3B3E | white   |
| Opening   | sunset #E85C2A | white     |
| Footer    | black #111111 | white/sand |

## Animation Specs
- **AnimatedLines**: useInView trigger, stagger 0.15s, y: 20→0, opacity: 0→1
- **ParallaxLayer**: useScroll + useTransform, y moves at 0.3x scroll speed
- **TiltCard**: default rotate values [-3, 2, -2, 3]°, hover: rotate→0, scale 1.02, translateY -4px
- **ScrollProgress**: useScroll scaleX 0→1, fixed top, height 3px, sunset color
- **prefers-reduced-motion**: all animations disabled, instant render
