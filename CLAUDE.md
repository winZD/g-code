# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

G-CODE is a single-page business landing site built with **Remix v2 + Vite + TypeScript + Tailwind CSS**. It features SSR, a contact form with email delivery via Nodemailer (Zoho SMTP), and SEO optimizations.

## Commands

- `npm run dev` — Start dev server with HMR
- `npm run build` — Production build (outputs to `build/server/` and `build/client/`)
- `npm start` — Run production server (`remix-serve ./build/server/index.js`)
- `npm run lint` — ESLint with TypeScript and a11y rules
- `npm run typecheck` — TypeScript type checking (`tsc`)

Requires Node.js >= 20.

## Architecture

**Remix file-based routing** with a single main route:
- `app/root.tsx` — Root layout, meta tags, toast system, JSON-LD structured data
- `app/routes/_index.tsx` — Entire SPA (header, hero, about, services, contact form, footer)
- `app/routes/robots[.txt].ts` — Dynamic robots.txt
- `app/routes/sitemap[.xml].ts` — Dynamic sitemap.xml
- `app/utils/sendMail.ts` — Nodemailer email service (Zoho SMTP on port 465)

**Path alias:** `~/*` maps to `./app/*`

## Key Patterns

- **Form handling:** Remix `action` + `react-hook-form` + `zod` validation + `remix-hook-form` bridge
- **Notifications:** `react-toastify` with `remix-toast` for server-side toast messages
- **Styling:** Tailwind utility classes with custom brand color palette (`blues-50` through `blues-950`) and custom animations (`fade-in`, `fade-in-up`) defined in `app/tailwind.css`
- **SEO:** Meta tags via Remix `MetaFunction`, preloaded Inter font, canonical URLs, structured data (Organization, WebSite, ProfessionalService schemas)
- **Accessibility:** Semantic HTML, ARIA labels, skip-to-content link, `aria-invalid` on form fields, `role="alert"` for errors

## Environment Variables

`EMAIL_USER` and `EMAIL_PASSWORD` — SMTP credentials for the contact form email service.
