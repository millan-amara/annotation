# Peskaya brand assets

The mark is a sphere with a pulse propagating from it. Asymmetric on purpose — full
concentric rings read as a bullseye, which says "target" rather than "signal".

**Accent colour:** `#6d28d9` · **Ink (near-black):** `#0c0c10` · **Typeface:** IBM Plex Sans
(600 for the wordmark), Inter for body text.

---

## Which file do I use?

| Where | File |
|---|---|
| LinkedIn company logo | `png/peskaya-logo-300.png` |
| LinkedIn page banner | `png/peskaya-linkedin-banner-1128x191.png` |
| Word / Google Docs header, letterhead | `png/peskaya-lockup-dark-1200.png` |
| Slide deck on a dark background | `png/peskaya-lockup-white-1200.png` |
| Email signature | `png/peskaya-lockup-dark-1200.png`, displayed ~180px wide |
| Business cards, anything printed | `svg/` — give the printer the vector |
| App icon, social avatar, favicon | `png/peskaya-logo-512.png` or the SVG tile |
| Single-colour printing, stamps, fax | `svg/peskaya-mark-black.svg` |

## Files

**`svg/`** — vector, infinitely scalable, no font dependency (pure geometry).

- `peskaya-mark-tile.svg` — white mark on the violet tile. The default logo.
- `peskaya-mark-violet.svg` — mark only, violet, transparent background. For light documents
  where a solid violet square would be too heavy.
- `peskaya-mark-white.svg` — mark only, white. For dark backgrounds.
- `peskaya-mark-black.svg` — mark only, near-black. Single-colour reproduction.

**`png/`** — raster with transparent backgrounds (except the banner).

- `peskaya-logo-300.png` / `-512` / `-1024` — the tile, at three sizes.
- `peskaya-mark-violet-512.png`, `peskaya-mark-white-512.png` — mark only.
- `peskaya-lockup-dark-1200.png` — mark + wordmark for light backgrounds.
- `peskaya-lockup-white-1200.png` — mark + wordmark for dark backgrounds.
- `peskaya-linkedin-banner-1128x191.png` — banner, content centred.

## Notes

**The banner content is centred deliberately.** LinkedIn overlays the company logo on the
bottom-left of the banner. Anything left-aligned there gets covered.

**The lockups are PNG, not SVG.** An SVG containing live text renders wrongly on any
machine without IBM Plex Sans installed. The PNGs have the type baked in, so they are
safe to send to anyone. They are 1200px wide — well above anything a document or a deck
needs. For large-format print, ask a designer to set the wordmark with the text converted
to outlines.

**Don't rebuild the mark by hand.** The arcs are specific: radii 16 and 26, 110° sweep,
outer arc at 0.6 opacity. Redrawing it by eye will not match.

**Minimum size: 16px.** It was designed and tested down to that. Below it, the outer arc
softens away and the mark reads as dot-plus-arc, which is intended behaviour rather than
a failure.

**Clear space.** Leave at least the width of the inner dot on all sides.
