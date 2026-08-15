# Asset sources & licensing

Track every image/logo used on the site here, with its source URL and license
or attribution note. Do **not** copy images from Google Images or from
competitors. Use appropriately licensed photos (Unsplash, Pexels, or a paid
stock provider), save the files locally under `public/`, and record them below.

## Brand logo (owner-supplied)

- Source: `https://my.crx.ge/engbk.png` (company-owned)
- License: Owned by Carex Auto.
- Status: **NOT yet added to the repo.** The build environment used to author
  this project could not download binary files. Until the real logo is added,
  the site renders a text-based wordmark fallback (`src/components/layout/Logo.tsx`).

### To finish the logo work

1. Download `https://my.crx.ge/engbk.png`.
2. Produce and place:
   - `public/brand/carex-auto-logo.png` — cleaned transparent background, tightly cropped.
   - `public/brand/carex-auto-mark.png` — compact red/yellow mark for small surfaces.
3. Swap the text fallback in `Logo.tsx` for a `next/image` using those files.
4. If background removal damages the mark/wordmark, request a transparent
   SVG/PNG from the owner instead of publishing a rough result.

A temporary SVG app icon lives at `src/app/icon.svg` (used for the favicon).
Replace it once the real brand mark is available.

## Photography (to add before launch)

Use two or three cohesive, licensed images with controlled dark overlays. The
hero and service-area bands currently use CSS gradients as placeholders so the
site is fast and has no broken/unlicensed images.

| Slot         | Subject                                             | File | Source URL | License |
| ------------ | --------------------------------------------------- | ---- | ---------- | ------- |
| Hero         | Car transport truck hauling vehicles on a road      | `public/images/hero-car-hauler.jpg` | https://www.pexels.com/photo/car-transport-truck-on-road-in-heathwood-34539243/ | Pexels License (free to use, no attribution required) |
| Services     | Vehicle loading / professional dispatcher scene     | TBD  | TBD        | TBD     |
| International | Vehicle near a port / container logistics setting   | TBD  | TBD        | TBD     |

Hero image note: downloaded at 1920px width from Pexels and self-hosted. The
Pexels License permits free commercial use without attribution; attribution to
the photographer is appreciated but not required. Delivered via `next/image`
(auto AVIF/WebP) with dark overlays for text contrast.

Serve them through `next/image` (AVIF/WebP), size them appropriately, give
meaningful alt text, and preload only the hero/LCP image.
