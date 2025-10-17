# Makruk Legends – Project TODO

## Phase 0 · Foundation & Architecture
- [ ] **Confirm Clean Architecture layers** in `src/` (`domain/`, `application/`, `infrastructure/`, `presentation/`) with index barrels.
- [ ] **Establish atomic design tree** under `src/presentation/components/` (`atoms/`, `molecules/`, `organisms/`, `templates/`, `layouts/`).
- [ ] **Set up theme system** with Tailwind CSS v4, design tokens, and global typography/colors in `public/styles/` & `tailwind.config.ts`.
- [ ] **Create shared types** using `zod` + TypeScript for core entities (`Player`, `Match`, `Tournament`, `LeaderboardEntry`, `CommunityPost`).
- [ ] **Bootstrap Zustand stores** scaffold in `src/presentation/stores/` with persistence adapters (`localforage`).
- [ ] **Document coding standards** (Clean Architecture, SOLID, naming conventions, testing strategy) in `docs/architecture.md`.

## Phase 1 · Core UI & Layout
- [ ] **Implement `MainLayout`** as the default app shell with responsive header, footer, theme toggle, and language switcher placeholder.
- [ ] **Build navigation atoms/molecules** (`Logo`, `NavLink`, theme toggle button, auth CTA) hooked into `MainLayout`.
- [ ] **Create global feedback components** (`ToastProvider`, loading skeletons, error boundary) for reuse.
- [ ] **Set up SEO metadata helpers** in `src/utils/seo.ts` for structured metadata generation.
- [ ] **Integrate iconography** via `lucide-react` with atomic wrappers.

## Phase 2 · Master Data Modeling
- [ ] **Define domain models** and constants for ranks, time controls, tournament formats, community topics in `src/domain/models/`.
- [ ] **Create master data services** (`src/infrastructure/mocks/master-data.ts`) returning typed mock payloads.
- [ ] **Specify mapping utilities** that normalize mock data into presentation view-models.
- [ ] **Author seed mocks** for:
  - Tournament catalog (Swiss, Knockout, Arena)
  - Leaderboard ladders (global, regional, seasonal)
  - Community spaces (forums, live rooms, learning hubs)
  - Featured matches & highlight reels
  - Sponsorship & partner banners
- [ ] **Add validation schemas** using `zod` to guarantee mock data shape consistency.

## Phase 3 · Client-Side State with Zustand
- [ ] **Implement feature stores** (`useLandingStore`, `useTournamentStore`, `useLeaderboardStore`, `useCommunityStore`).
- [ ] **Compose selectors & actions** for filters, pagination, favourites, and real-time updates placeholders.
- [ ] **Wire persistence middleware** (session vs long-term) based on feature needs.
- [ ] **Set up mock API layer** simulating async fetches (latency, success/error states).
- [ ] **Add unit tests** for store logic using `jest` + `@testing-library/react` hooks utilities.

## Phase 4 · Landing Experience (UI-first)
- [ ] **Design hero template** with CTA, live stats, upcoming tournaments ticker.
- [ ] **Implement feature sections** (ranked play, tournaments, community, learning resources, sponsor carousel) using atomic composition.
- [ ] **Integrate mock data** via landing presenter/hook pattern, mapping master data to UI.
- [ ] **Provide interactive demos** (e.g., mini chessboard preview, tournament filter) powered by Zustand.
- [ ] **Add testimonials & trust signals** (partners, pro players, security badges).
- [ ] **Optimize responsive layout** (desktop > tablet > mobile) with Tailwind utilities.

## Phase 5 · Tooling & Quality Gates
- [ ] **Configure ESLint + Prettier rules** aligned with Next.js, Tailwind, and custom aliases.
- [ ] **Introduce Storybook or Ladle** for atomic component previews with mock data knobs.
- [ ] **Add Lighthouse/AXE audits** automation script for accessibility & performance checks.
- [ ] **Set up CI pipeline** for lint, type-check, unit tests, and preview deployment.

## Phase 6 · Documentation & Ops
- [ ] **Publish component catalog** documenting atomic inventory and usage guidelines.
- [ ] **Write onboarding doc** covering data flow, store usage, and mock API strategy.
- [ ] **Prepare feature roadmap** (aligning with `TODO_FEATURES.md`) prioritizing incremental releases.
- [ ] **Draft community moderation policy** outline for future implementation.

---

Refer to `TODO_FEATURES.md` for deep-dive feature workstreams (tournaments, gameplay, realtime, community, analytics).

