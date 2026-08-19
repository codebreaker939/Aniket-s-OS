# Lab Notes Backend — Developer Guide

## Overview

Lab Notes is a visitor feedback system backed by PostgreSQL + Prisma, with email notifications via Resend. Submissions are moderated (PENDING → APPROVED) before appearing publicly.

---

## 1. PostgreSQL Setup

You need a running PostgreSQL instance. Options:

**Local (homebrew):**
```bash
brew install postgresql@16
brew services start postgresql@16
createdb aniket_portfolio
```

**Docker:**
```bash
docker run -d \
  --name aniket-pg \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=aniket_portfolio \
  -p 5432:5432 \
  postgres:16-alpine
```

**Connection string format:**
```
postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public
```

---

## 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `RESEND_API_KEY` | Resend API key from resend.com/api-keys |
| `RESEND_FROM_EMAIL` | Verified sender address (must be on a verified Resend domain) |
| `FEEDBACK_NOTIFICATION_EMAIL` | Where new note notifications are sent |

> **Never commit `.env.local`** — it is already gitignored.

> **Never prefix these with `NEXT_PUBLIC_`** — they must stay server-only.

---

## 3. Prisma Migration

First-time setup:

```bash
# Generate the Prisma client
pnpm db:generate

# Run migrations (creates the lab_notes table)
pnpm db:migrate
# When prompted, name the migration: init_lab_notes
```

After schema changes:

```bash
pnpm db:migrate
# Name the migration descriptively, e.g.: add_lab_notes_index
```

For quick local prototyping (skips migration history):

```bash
pnpm db:push
```

---

## 4. Prisma Studio

Browse and edit records in the browser:

```bash
pnpm db:studio
```

Use this to **manually approve** Lab Notes during moderation (a full admin UI is planned for the next milestone).

**To approve a note:**
1. Open Prisma Studio → `lab_notes` table
2. Find a row with `status = PENDING`
3. Change `status` to `APPROVED`
4. Set `approvedAt` to the current timestamp
5. Save

---

## 5. Resend Configuration

1. Create a free account at [resend.com](https://resend.com)
2. Verify your domain (or use the `onboarding@resend.dev` test address for development)
3. Create an API key at resend.com/api-keys
4. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `FEEDBACK_NOTIFICATION_EMAIL` in `.env.local`

**Development without Resend:**
If the Resend env vars are absent, note submission still works — the server logs a warning and the note remains `PENDING`. Email can be set up later.

---

## 6. Local Development

```bash
# Install dependencies
pnpm install

# Run migrations (requires DATABASE_URL in .env.local)
pnpm db:migrate

# Start dev server
pnpm dev
```

Test the API:

```bash
# Submit a note
curl -X POST http://localhost:3000/api/lab-notes \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"name":"Dev Test","message":"This is a test note for development.","honeypot":""}'

# Fetch approved notes (empty until you approve one)
curl http://localhost:3000/api/lab-notes
```

---

## 7. Production Deployment

Requirements:

- Set all four environment variables in your hosting provider (e.g. Vercel Project Settings → Environment Variables)
- Run `pnpm db:migrate` against your production database before deploying (or use a CI step)
- The `DATABASE_URL` must point to a production-accessible PostgreSQL instance

Recommended production PostgreSQL providers:
- [Neon](https://neon.tech) (serverless PostgreSQL, free tier available)
- [Supabase](https://supabase.com) (managed PostgreSQL)
- [Railway](https://railway.app) (simple managed DB)

---

## 8. API Reference

### `POST /api/lab-notes`

Submit a new Lab Note. Returns a safe confirmation — never the full DB row.

**Request body:**
```json
{
  "rating": 5,
  "name": "Alice",
  "email": "alice@example.com",
  "message": "Loved the Engineering Lab section!",
  "context": "Engineering Lab",
  "honeypot": ""
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Your note has been sent for moderation. It will appear publicly after approval."
}
```

**Error codes:**
- `400` — Validation failure (missing rating, message too short, invalid email, honeypot filled)
- `409` — Duplicate submission detected
- `429` — Rate limit exceeded (5 per 10 minutes per IP)
- `500` — Database error

### `GET /api/lab-notes`

Fetch all APPROVED notes + aggregate stats. No private fields returned.

**Response (200):**
```json
{
  "notes": [
    {
      "id": "cm...",
      "rating": 5,
      "name": "Alice",
      "message": "Loved it!",
      "context": "Engineering Lab",
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  ],
  "publishedCount": 1,
  "averageRating": 5.0
}
```

---

## 9. Architecture Notes

### Rate Limiter (current limitation)

The current rate limiter is in-memory (`src/lib/lab-notes/server/rate-limiter.ts`). It works correctly for single-process deployments (local dev, single Vercel function instance).

**For multi-instance production:** Replace the `store` Map with an [Upstash Redis](https://upstash.com) client. The `checkRateLimit` function interface is unchanged — swap the implementation only.

### Moderation

There is no admin UI yet. Moderation is done via Prisma Studio (`pnpm db:studio`). A full admin dashboard with authentication is planned for the next milestone.

### Privacy

- Visitor `email` is stored in the DB but never returned to public clients
- IP addresses are SHA-256 hashed before storage — raw IPs are never persisted
- `userAgentSummary` stores only the browser family token (first 80 chars)
- Public API returns only: `id`, `rating`, `name`/`"Anonymous"`, `message`, `context`, `createdAt`
