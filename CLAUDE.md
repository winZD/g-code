# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

G-CODE is a single-page business landing site built with **React Router v8 (framework mode) + Vite + TypeScript + Tailwind CSS**. It features SSR, a contact form with email delivery via Nodemailer (Zoho SMTP), a Privacy Policy page, and SEO optimizations.

## Commands

- `npm run dev` — Start dev server with HMR
- `npm run build` — Production build (outputs to `build/server/` and `build/client/`)
- `npm start` — Run production server (`react-router-serve ./build/server/index.js`)
- `npm run lint` — ESLint with TypeScript and a11y rules
- `npm run typecheck` — TypeScript type checking (`tsc`)

Requires Node.js >= 20.

## Architecture

**React Router explicit route config** (`app/routes.ts`):
- `app/root.tsx` — Root layout, meta tags, toast system, JSON-LD structured data, per-route canonical URL
- `app/routes/_index.tsx` — Homepage SPA (hero, about, services, contact form)
- `app/routes/privacy-policy.tsx` — GDPR privacy policy page
- `app/routes/robots.ts` — Dynamic robots.txt
- `app/routes/sitemap.ts` — Dynamic sitemap.xml
- `app/components/Header.tsx` / `app/components/Footer.tsx` — Shared header/footer, used across routes (nav uses hash links to homepage sections, e.g. `/#services`)
- `app/components/Reveal.tsx` + `app/hooks/useReveal.ts` — Scroll-triggered reveal animations (IntersectionObserver-based, respects `prefers-reduced-motion`)
- `app/utils/sendMail.ts` — Nodemailer email service (Zoho SMTP on port 465)

**Path alias:** `~/*` maps to `./app/*`

## Key Patterns

- **Form handling:** React Router `action` + `react-hook-form` + `zod` validation + `remix-hook-form` bridge
- **Notifications:** `react-toastify` with `remix-toast` (`dataWithSuccess`, `getToast`) for server-side toast messages
- **Styling:** Tailwind utility classes with a custom `accent` (amber) color palette alongside default `blue`/`slate`, shared `.btn-primary`/`.btn-secondary` component classes, and custom animations (`fade-in`, `fade-in-up`, plus delay variants) defined in `app/tailwind.css`
- **SEO:** Meta tags via `MetaFunction` (from `react-router`), preloaded Inter font, per-route canonical URLs, structured data (Organization, WebSite, ProfessionalService schemas)
- **Accessibility:** Semantic HTML, ARIA labels, skip-to-content link, `aria-invalid` on form fields, `role="alert"` for errors, `focus-visible` rings on interactive elements

## Environment Variables

`EMAIL_USER` and `EMAIL_PASSWORD` — SMTP credentials for the contact form email service.
