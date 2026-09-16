# Lincoln Foot & Ankle Center — Homepage Redesign Mockup

A **mobile-first, modern homepage template** for presentation to the practice owner. Built with plain HTML, CSS, and JavaScript so it can be opened in any browser and later adapted in WordPress.

## Quick preview

Open `index.html` in your browser (double-click or drag into Chrome/Safari).

```bash
open index.html
```

Or run a local server:

```bash
python3 -m http.server 8080
# Visit http://localhost:8080
```

## What's included

- **Utility header** — address, phone, and Patient Portal (as requested)
- **Back-to-top arrow** — appears after scrolling
- **Responsive layout** — hamburger menu, sticky header, Call / Directions / Schedule bar on phones
- **Hero carousel** — the 5 messages from the current site slider
- **Existing copy** — welcome text, Quality Care / Informed Patients / Convenient Setting
- **Three doctors** — Dr. Lagdaan, Dr. Hoffmann, plus placeholder for the third physician
- **Brand colors** — navy, teal, white, and light mint accents

## Replace before WordPress handoff

| Placeholder | Replace with |
|-------------|--------------|
| Logo SVG | Official logo: `LFAC_logo_final_pms5555.jpg` |
| Doctor photos | Real headshots from WordPress media library |
| Dr. [New Physician Name] | Actual name, bio, and photo when confirmed |
| Unsplash hero images | Practice photos or approved stock |
| Community logo placeholders | APMA, ACFAS, Northcenter, DANK Haus assets |
| `#` links | Real WordPress page URLs |

## WordPress adaptation notes

1. **Theme block editor (Gutenberg)** — Each section maps to a Group/Cover block or custom pattern.
2. **Page builder (Elementor/Divi)** — Use as visual reference for section order and spacing.
3. **Custom theme** — Split into `header.php`, `front-page.php`, and enqueue `styles.css` / `script.js`.
4. **Mobile fix** — Current site uses fixed-width tables and old breakpoint CSS; this mockup uses CSS Grid/Flexbox and `clamp()` for fluid typography.

## Files

- `index.html` — page structure and content
- `styles.css` — all styling (mobile-first)
- `script.js` — mobile menu, hero slider, scroll effects
# lincoln-webpage-redesign
