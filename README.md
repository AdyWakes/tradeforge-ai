# TradeForge AI

TradeForge AI is a modern fintech demo application for AI-powered trade finance and commerce infrastructure. It helps SMEs and financing partners simulate invoice intelligence, trust scoring, fraud detection, blockchain verification, smart escrow, and trade analytics without requiring live banking rails.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- Framer Motion
- Supabase-ready authentication
- Recharts for analytics

## Features

- Investor-grade landing page with product preview, stats, features, testimonials, and CTAs
- Login and signup pages with Supabase auth support and demo fallback
- Protected dashboard routes via middleware
- AI invoice intelligence for PDF, PNG, and JPG uploads
- Trust score engine with factor breakdowns and company profiles
- Fraud detection signals with explanations
- Polygon testnet-style invoice verification receipts
- Smart escrow simulation for pending, released, and dispute states
- Trade history with search, filter, sort, and CSV export
- Analytics center with charts, global commerce map, and risk heatmap
- Admin panel for users, transactions, fraud alerts, and verification requests
- AI commerce assistant chatbot
- Real-time transaction feed simulation

## Setup

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env.local
```

Supabase is optional for the demo. If you want real Supabase authentication, fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Run the development server:

```bash
npm run dev
```

Open the local URL printed by Next.js, then select "Launch demo" from the landing page.

## Demo Mode

The app intentionally works without real lenders, banking integrations, or payment infrastructure. Demo mode sets a short-lived local cookie and unlocks the protected product routes. AI invoice extraction, Polygon verification, escrow, and financing workflows are simulated from realistic seed data.

## Blockchain Verification Fallback

If real Polygon testnet integration is not completed before submission, keep `BLOCKCHAIN_VERIFICATION_MODE=simulation`. The blockchain service will generate realistic Polygon-style receipts with:

- Invoice hash
- Mock transaction hash
- Timestamp
- Polygon Amoy chain ID
- Simulated block number
- Confirmation count
- Verification status
- Metadata hash

The code is structured around a verifier adapter in `src/lib/services/blockchain.ts`, so a real Polygon implementation can later replace the simulation without changing the API route or UI contract.

## Hackathon Submission Notes

Use the demo data transparently. In your pitch, say:

> TradeForge AI uses realistic simulated trade data to demonstrate the complete SME trade finance workflow. The product is designed to connect to real Supabase auth, AI extraction, lender underwriting, Polygon testnet verification, and payment rails after the hackathon.

Recommended judge walkthrough:

1. Launch demo from the landing page.
2. Open Invoice AI and upload any PDF, PNG, or JPG invoice file.
3. Show extracted fields, risk indicators, and the verification report.
4. Open Trust Score and explain the 0-100 scoring factors.
5. Open Fraud and explain the high-risk invoice signal.
6. Open Blockchain and show the Polygon-style verification receipt.
7. Open Escrow and simulate deposit, release, and dispute review.
8. Open Analytics and Admin to show operating-scale visibility.

## Useful Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Project Structure

```text
src/app             Route handlers and pages
src/components      UI, layout, dashboard, invoice, trade, analytics components
src/lib             Demo data, utilities, Supabase helper, service simulations
src/types           Trade finance domain types
src/proxy.ts        Protected route gate for Next.js 16
```
