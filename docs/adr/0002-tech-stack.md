# ADR-0002: React + TypeScript + Vite, Vitest for tests
- Status: Accepted
- Date: 2026-09-16

## Decision
DeliveryIQ is built as a client-side React 19 + TypeScript app, scaffolded
and built with Vite, tested with Vitest and React Testing Library.

## Context
The working directory for this build was empty — no existing Clinical Aid
hub codebase was present to integrate with or mirror conventions from, and
hub integration (replacing the "Delivery" entry) is deferred to a future,
manual step. Stack choice is normally an architecture-stage decision; the
Human in Charge explicitly delegated it to Build for this task, so it's
recorded here rather than assumed silently.

## Alternatives considered
- **Match the (absent) hub's stack** — not possible: there is no hub
  codebase in this environment to inspect. Deferred until the hub
  integration step, at which point this choice may need revisiting if the
  hub's stack differs meaningfully.
- **Plain static HTML/CSS/JS** — minimal dependency footprint and trivially
  embeddable, but the wizard's step-based state (4 questions, conditional
  branching, a result screen, a restart flow) is exactly the kind of UI
  state React manages cleanly; hand-rolling that in vanilla JS would add
  risk without a corresponding benefit given a framework is not otherwise
  disallowed.
- **A backend/server framework** — rejected: the entire routing decision is
  a pure client-side lookup over 10 static rows, no persistence, no PHI, no
  external calls. A server adds deployment and operational surface area
  with no corresponding requirement.

## Rationale
React + TypeScript + Vite is the most conventional current choice for a
small internal wizard tool with no backend needs. It keeps the dependency
footprint minimal, TypeScript gives the rules table and resolver compile-
time coverage of the input space, and Vite produces a static build that's
trivial to embed or link from whatever the hub's actual stack turns out to
be. Vitest reuses the Vite toolchain directly instead of introducing a
second test runner and config surface.

## Consequences
- No server-side code, database, or environment-separation concerns apply
  to this build (Definition of Done items 18–19 are not applicable as
  scoped — flagged explicitly here, not silently skipped).
- The production artifact is a static `dist/` bundle; hub integration
  later needs only to link or embed that build, not adopt this stack.
- CI (`.github/workflows/ci.yml`) runs `tsc --noEmit`, `vitest run`, and
  `vite build` on every push/PR — this repo had no CI before this build.
