# Asset sources & licensing

Track every image/logo used on the site here, with its source URL and license
or attribution note. Do **not** copy images from Google Images or from
competitors. Use appropriately licensed photos (Unsplash, Pexels, or a paid
stock provider), save the files locally under `public/`, and record them below.

## Brand logo (owner-supplied)

- File: `public/brand/carex-auto-logo.png` (owner-supplied, 500×500 transparent PNG)
- Original source: `logo_transparent_crx.png` provided by the owner; also at `https://my.crx.ge/engbk.png` (company-owned)
- License: Owned by Carex Auto.
- Status: **Added and in use.** The red/amber "X" mark is rendered via
  `next/image` in `src/components/layout/Logo.tsx`, beside the two-line
  "CAREX AUTO TRANSPORT / Licensed U.S. Auto Dealer" wordmark.

### Remaining (optional) logo polish

- The favicon/app icon at `src/app/icon.svg` is still a placeholder. Generate
  favicon/app-icon files from `carex-auto-logo.png` to replace it.
- If a compact single-color variant is ever needed for tiny surfaces, add
  `public/brand/carex-auto-mark.png`.

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
