# GovApp Frontend (Next.js)

Redesigned frontend for the AI Grievance Portal, built with **Next.js 14** (App Router), **TypeScript**, and **Tailwind CSS**.

## Setup

1. Install dependencies: `npm install`
2. Ensure the backend is running on **http://127.0.0.1:5055** (see project root).
3. Run the dev server: `npm run dev`
4. Open **http://localhost:3000**

## Proxy

API requests from the frontend go to `/api/*`, which Next.js rewrites to `http://127.0.0.1:5055/*`. No CORS or base URL change is needed in the browser.

## Pages

- **/** — Home with hero, stats, and department shortcuts
- **/login** — Phone + OTP or password login
- **/file-complaint** — File a complaint (requires login); supports department, subcategory, photo
- **/track** — Track by complaint ID; recent IDs shown
- **/analytics** — Overview and recent complaints table
- **/admin** — List complaints and update status
- **/whatsapp** — WhatsApp contact and instructions

## Design

- **Primary:** Teal (`#0f766e`)
- **Accent:** Amber (`#d97706`)
- **Font:** DM Sans
- **Layout:** Responsive with mobile nav
