# Carex Auto — Lead-generation landing page

A fast, responsive, single-page site for **Carex Auto** (vehicle hauling,
dispatch, brokerage, and transport). The primary conversion is a three-step
**quote request** form that emails the request to `info@carextransport.com`. It does not
calculate or display a price.

## Tech stack

- Next.js (App Router) + React + TypeScript (strict)
- Tailwind CSS
- React Hook Form + Zod (shared client/server validation)
- Resend (server-side lead email via `POST /api/quote`)
- lucide-react icons

## Prerequisites

- **Node.js LTS** (this project was authored targeting the current LTS line).
  Install it, then reopen your terminal so PATH updates apply:

  ```powershell
  winget install OpenJS.NodeJS.LTS
  ```

- Verify:

  ```powershell
  node --version
  npm --version
  git --version
  ```

## Getting started

```powershell
npm install          # generates package-lock.json — commit it
npm run dev          # http://localhost:3000
```

Copy the env template and fill in secrets:

```powershell
copy .env.example .env.local
```

| Variable                | Purpose                                                   |
| ----------------------- | --------------------------------------------------------- |
| `RESEND_API_KEY`        | Resend API key (server only — never exposed to browser)   |
| `QUOTE_TO_EMAIL`        | Where leads are delivered (`info@carextransport.com`)             |
| `QUOTE_FROM_EMAIL`      | Verified sender, e.g. `Carex Auto Quotes <quotes@carextransport.com>` |
| `NEXT_PUBLIC_SITE_URL`  | Canonical/site URL for metadata, sitemap, robots          |
| `TURNSTILE_SECRET_KEY`  | (optional) Cloudflare Turnstile — add before public promo |

## Scripts

```powershell
npm run dev        # local dev server
npm run build      # production build
npm run start      # run production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Email delivery (Resend)

1. Create a Resend account and API key.
2. Verify the `carextransport.com` domain in Resend by adding the required DNS records.
3. Set the three `QUOTE_*` env vars above (in Vercel too).
4. Submit a real test request and confirm it arrives at `info@carextransport.com` with
   reply-to set to the customer's email.

**Fallback:** if DNS verification can't be completed in time, point the
submission adapter (`src/lib/submit-quote.ts`) at a hosted service like
Formspree. The UI and validation stay unchanged.

## Editing content

All marketing copy and contact facts live in **`src/content/site.ts`**. Change
them there rather than editing components.

- Testimonials are hidden until real, approved ones exist
  (`SHOW_TESTIMONIALS` in `site.ts`). Never publish invented testimonials.

## Deploying to Vercel

1. Push to a Git repo and import it in Vercel.
2. Add the environment variables (Production + Preview).
3. Preview deployments are `noindex`; production indexing turns on only when
   `VERCEL_ENV=production`.
4. Configure the production domain, then update `NEXT_PUBLIC_SITE_URL`, the
   canonical/metadata, and the Resend sender domain accordingly.

## Launch blockers the owner must settle

See section 20 of the project plan. In short: confirm the legal entity/role and
any USDOT/MC numbers, approve insurance wording, approve consent/privacy/terms
language, confirm DNS access for Resend (or pick the fallback), approve licensed
images + `ASSET-SOURCES.md`, and choose the final domain.

> Draft legal copy on `/privacy` and `/terms` is marked for professional review
> and must be approved before public launch.
