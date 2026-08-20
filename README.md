# ANIKET OS

> A personal developer workstation built as an interactive portfolio — combining a desktop operating-system experience with an Engineering Lab that documents how projects are built.

---

## Overview

ANIKET OS is a portfolio platform designed to behave like a personal operating system rather than a conventional single-page developer portfolio.

The experience follows:

```text
Power On
   ↓
Boot Sequence
   ↓
ANIKET OS Desktop
   ↓
Applications / Windows
   ↓
Engineering Lab
   ↓
Projects • Journey • Toolbox • Source Control
   ↓
Resume • Credentials • Milestones • Lab Notes • Contact
   ↓
Shutdown / Restart
```

The interface is intentionally product-oriented: the desktop is the navigation layer, while individual applications present different parts of the professional profile.

### Core idea

**ANIKET OS** = the interface  
**Engineering Lab** = the engineering story

Projects are not treated only as cards. They can be explored as experiments with objectives, architecture, engineering decisions, challenges, and outcomes.

---

## Goals

The project was designed around five goals:

1. Present a strong professional profile for internships and software opportunities.
2. Show real engineering work rather than only listing technologies.
3. Create a memorable, human-designed portfolio experience.
4. Keep the interface interactive and stateful without becoming gimmicky.
5. Build a maintainable production-style codebase that can evolve with the career journey.

---

## Key Features

### Desktop Operating System Experience

- Power-on screen
- Boot sequence
- Desktop environment
- OS-style menu bar
- Desktop application icons
- Floating dock
- Application windows
- Focus, minimize, maximize and close behavior
- Restart and shutdown flow
- Keyboard-driven Spotlight / Command Center
- Session-aware system activity

### Engineering Lab

A dedicated technical workspace for deeper project documentation.

Each experiment can capture:

- Objective
- Problem
- Approach
- Architecture
- Technologies
- Engineering decisions
- Challenges
- Outcome
- GitHub / live references

Current project areas include:

- ClaimFast
- LockSync
- Vehicle Maintenance Predictor
- HelixAI
- Disaster Alert Emergency Response Cloud

### Developer Profile Applications

- About
- Projects
- System Evolution / Journey
- Toolbox
- Source Control
- System Profile / Resume
- Credentials
- Milestones
- Contact

### Live Information

Where data is available, the desktop can surface real state such as:

- Current time
- Session uptime
- Network state
- GitHub synchronization state
- Current application
- Current Engineering Lab experiment
- Session activity

### Source Control

The Source Control application connects to public GitHub data for:

- Profile information
- Repositories
- Repository metadata
- Search
- Sorting
- Repository-to-Lab relationships

### Lab Notes

Lab Notes is the visitor feedback system.

Visitors can:

- leave a 1–5 rating
- write a note
- optionally add a name
- optionally add an email
- optionally identify what they explored

The production flow is:

```text
Visitor
  ↓
Validation
  ↓
Anti-spam checks
  ↓
PostgreSQL
  ↓
PENDING
  ↓
Email notification
  ↓
Moderation
  ↓
APPROVED
  ↓
Public Lab Notes
```

Private visitor email information is never exposed through the public notes API.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | shadcn/ui + custom components |
| Animation | Motion |
| Icons | Lucide React |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod |
| Email | Resend |
| Source Control | Git + GitHub |
| Deployment | Vercel |
| Package Manager | pnpm / Corepack |

---

## Architecture

At a high level:

```text
                    ┌──────────────────────┐
                    │      ANIKET OS       │
                    │    Desktop Shell     │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
       OS Lifecycle      Window Manager    Command Center
              │                │                │
              └────────────────┼────────────────┘
                               │
                     Application Registry
                               │
       ┌───────────────┬───────┼────────┬───────────────┐
       │               │       │        │               │
    Profile        Projects   Lab     Toolbox      Source Control
       │               │       │        │               │
       └───────────────┴───────┼────────┴───────────────┘
                               │
                        Engineering Data
                               │
                    ┌──────────┴──────────┐
                    │                     │
                 GitHub                Local Data
                    │
                    └──────────┬──────────┐
                               │
                         Lab Notes Backend
                               │
                  ┌────────────┼────────────┐
                  │            │            │
              Next.js API   Prisma      Resend
                  │            │
                  └────────────┘
                       │
                   PostgreSQL
```

---

## Project Structure

A simplified structure:

```text
src/
├── app/
│   ├── api/
│   │   └── lab-notes/
│   ├── about/
│   ├── projects/
│   ├── engineering-lab/
│   ├── journey/
│   ├── toolbox/
│   ├── github/
│   ├── resume/
│   ├── credentials/
│   ├── milestones/
│   ├── lab-notes/
│   └── contact/
│
├── components/
│   ├── apps/
│   ├── layout/
│   ├── os/
│   └── ui/
│
├── data/
├── lib/
├── types/
└── app-level configuration

prisma/
└── schema.prisma

docs/
└── project documentation
```

Exact filenames may evolve as the project continues to be refined.

---

## Getting Started

### Prerequisites

Install:

- Node.js
- pnpm, or use Corepack
- PostgreSQL for Lab Notes
- Git

### Install

```bash
corepack enable
corepack pnpm install
```

### Environment Variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Configure the values required by your environment.

Typical variables include:

```env
DATABASE_URL=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
FEEDBACK_NOTIFICATION_EMAIL=
GITHUB_USERNAME=
```

Never commit `.env.local`.

---

## Database Setup

Generate the Prisma client:

```bash
corepack pnpm db:generate
```

Run the development migration:

```bash
corepack pnpm db:migrate
```

Open Prisma Studio:

```bash
corepack pnpm db:studio
```

Only use Prisma Studio for development/inspection after a proper moderation workflow is available in the deployed system.

---

## Development

Start the development server:

```bash
corepack pnpm dev
```

Then open the local application in your browser.

---

## Quality Checks

Run type checking:

```bash
corepack pnpm typecheck
```

Run linting:

```bash
corepack pnpm lint
```

Run a production build:

```bash
corepack pnpm build
```

Recommended before pushing changes:

```text
typecheck
↓
lint
↓
build
↓
manual browser verification
```

---

## Lab Notes API

The public Lab Notes API is intentionally limited.

### Submit a note

```text
POST /api/lab-notes
```

The server validates:

- rating
- message
- optional name
- optional email
- optional context
- honeypot field

Additional protection includes:

- server-side validation
- basic rate limiting
- duplicate detection
- privacy-safe server handling
- pending moderation state

### Public notes

```text
GET /api/lab-notes
```

Only `APPROVED` notes should be returned publicly.

Private fields such as visitor email and internal anti-spam information must never be exposed.

---

## Engineering Principles

The project intentionally follows several principles:

### One OS, many applications

Applications should share:

- window behavior
- typography rules
- spacing
- interaction patterns
- accessibility conventions

while still having their own visual personality.

### Real data over fake UI

Do not invent:

- GitHub counts
- project metrics
- visitor feedback
- certifications
- achievements
- performance numbers

An empty state is better than fabricated data.

### Motion with purpose

Motion should communicate:

- state
- transition
- feedback
- activity

It should not exist only for visual spectacle.

### Desktop metaphor without losing usability

The OS concept is an interaction layer, not a usability barrier.

Important information should remain easy to discover for recruiters, mobile users, and keyboard users.

---

## Security Notes

The project includes server-side controls around Lab Notes.

Important rules:

- Never expose `DATABASE_URL` to the client.
- Never expose Resend credentials to the client.
- Validate all public input server-side.
- Keep visitor email private.
- Return approved feedback only through the public notes API.
- Escape user-controlled content before embedding it into notification email HTML.
- Keep moderation actions server-authorized.
- Do not rely only on client-side route hiding for admin protection.

---

## Current Development Status

The base product is feature-complete enough for portfolio use and continued refinement.

### Completed

- OS shell
- Power lifecycle
- Desktop
- Windows
- Dock
- Spotlight
- System activity
- Engineering Lab
- Projects
- Journey
- Toolbox
- Source Control
- GitHub integration
- System Profile / Resume
- Credentials
- Milestones
- About
- Contact
- Lab Notes frontend
- PostgreSQL + Prisma Lab Notes backend
- Resend notifications
- moderation-ready data model

### In Refinement

The project is intentionally moving through a separate quality phase for:

- visual consistency
- typography
- responsive behavior
- animation quality
- accessibility
- performance
- content cleanup
- SEO
- architecture consolidation

---

## Future Enhancements

The project is designed to evolve beyond a static portfolio.

### Lab Notes — Next Generation

Planned enhancements include:

- authenticated moderation console
- moderation queue
- featured/pinned notes
- richer feedback analytics
- feedback trends over time
- category-based insights
- notification digests
- stronger distributed rate limiting
- CAPTCHA/Turnstile when necessary
- abuse detection
- note search/filtering
- moderation history
- spam scoring

### OS Enhancements

- richer desktop personalization
- keyboard-first workflows
- configurable dock
- command shortcuts
- application persistence
- improved deep linking
- richer live system telemetry
- offline/PWA behavior
- installable desktop-like experience

### Engineering Lab Enhancements

- richer architecture diagrams
- project version history
- technical decision records
- benchmark/result sections where real data exists
- project media and screenshots
- changelog-style engineering updates

### Source Control Enhancements

- richer repository activity
- repository health indicators
- more GitHub-backed live data
- contribution visualizations based on real data
- caching improvements

### Professional Profile

- improved recruiter mode
- printable profile
- richer resume viewer
- stronger LinkedIn/GitHub integration
- career milestone linking

---

## SDLC / Engineering Documentation

A separate industry-level project document covers:

- project overview
- stakeholder goals
- requirements
- scope
- architecture
- functional requirements
- non-functional requirements
- UI/UX strategy
- implementation
- database design
- security
- testing
- deployment
- maintenance
- future roadmap

Recommended document:

`docs/Aniket_OS_Industry_Level_Project_Documentation.docx`

---

## Design Philosophy

ANIKET OS is intentionally not designed as:

```text
Hero
↓
Skills
↓
Projects
↓
Resume
↓
Contact
```

Instead, it is designed as:

```text
A system
    ↓
A workstation
    ↓
Applications
    ↓
Engineering work
    ↓
Career story
    ↓
Human interaction
```

The goal is to make the portfolio something a visitor can **explore**, while still making the important professional information quickly accessible.

---

## License

This repository is a personal portfolio project.

Unless otherwise stated, the source code and original design/content remain the property of the project owner.

Third-party libraries, icons, fonts, and services remain subject to their respective licenses and terms.

---

## Author

**Aniket Rai**

B.Tech CSE  
Full-Stack Developer  
Exploring AI/ML

---

## Project Philosophy

> Build things. Understand how they work. Document what you learn. Keep improving.

