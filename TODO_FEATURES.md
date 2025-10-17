# Makruk Legends – Feature Workstreams

## Gameplay & Core Chess Experience
- [ ] **Makruk engine integration**
  - [ ] Evaluate open-source Makruk/Fairy-Stockfish compatibility
  - [ ] Build move validation adapters in `src/domain/services/chess`
  - [ ] Implement PGN/FEN serializer for Makruk notation
- [ ] **Realtime game session**
  - [ ] Design `GameSession` aggregate (players, clock, board state)
  - [ ] Mock socket.io flows for move broadcast & clock sync
  - [ ] Client-side board state with Zustand + optimistic updates
- [ ] **Spectator mode**
  - [ ] Create read-only game view with timeline scrubbing
  - [ ] Implement highlight layers (last move, threats, captures)
  - [ ] Provide commentary overlay mock (text + audio placeholder)
- [ ] **Coach & Analysis tools**
  - [ ] Add engine evaluation bar mock data
  - [ ] Implement move suggestion panel using heuristics mock
  - [ ] Provide heatmap of piece activity using dummy analytics

## Tournament Platform
- [ ] **Tournament creation wizard**
  - [ ] Multi-step form using `react-hook-form` + `zod`
  - [ ] Mock payout structures, eligibility criteria, entry fees
  - [ ] Support formats: Swiss, Round Robin, Knockout, Arena
- [ ] **Scheduling & brackets**
  - [ ] Generate mock schedule matrix with time zones
  - [ ] Render bracket visualizations (single/double elimination)
  - [ ] Create standings table with tie-break algorithms (Buchholz, Sonneborn-Berger) mocked
- [ ] **Registration & check-in**
  - [ ] Zustand store for participant registration journey
  - [ ] Validation for rating caps, invites, waitlist
  - [ ] Mock notifications for reminders & seat confirmations
- [ ] **Broadcast & overlays**
  - [ ] Design caster dashboard layout
  - [ ] Implement mock API for live stats, match picks, polls
  - [ ] Create sponsor lower-third & intermission scenes

## Leaderboard & Ranking System
- [ ] **Global ladder**
  - [ ] Elo/Glicko calculation scaffolding with mock updates
  - [ ] Seasonal split data & prestige tiers (Bronze → Legend)
  - [ ] Regional filters with localization-ready copy
- [ ] **Achievement badges**
  - [ ] Define badge taxonomy (Champion, Blitz Master, Mentor)
  - [ ] Build badge card atoms with animation presets
  - [ ] Mock accrual history & showcase grid for profiles
- [ ] **Player profiles**
  - [ ] Profile overview template (stats, bio, social links)
  - [ ] Match history timeline with filters
  - [ ] Highlight reels & favourite openings section

## Community & Social
- [ ] **Community hub**
  - [ ] Forum board mock with categories & latest threads
  - [ ] Live rooms schedule (voice/video placeholders)
  - [ ] Learning library cards (courses, tactics, masterclasses)
- [ ] **Social features**
  - [ ] Friends & follow system store scaffolding
  - [ ] Activity feed mock (game results, achievements, posts)
  - [ ] In-app messaging UI with optimistic send & read states
- [ ] **Moderation & safety**
  - [ ] Define reporting workflow states (pending, reviewing, resolved)
  - [ ] Admin dashboard wireframe with queue filters
  - [ ] Create code of conduct modal and acceptance tracking mock

## Commerce & Monetization
- [ ] **Premium subscriptions**
  - [ ] Pricing table component with feature comparison
  - [ ] Mock billing integration (Supabase session + Stripe placeholder)
  - [ ] Trial management UI with reminders
- [ ] **Marketplace**
  - [ ] Cosmetic store (boards, pieces, emotes) with mock inventory
  - [ ] Tournament ticketing checkout flow
  - [ ] Sponsorship placement manager for organizers

## Analytics & Insights
- [ ] **Player insights dashboard**
  - [ ] Rating progression charts (line, area)
  - [ ] Opening performance heatmap (Makruk-specific openings)
  - [ ] Match outcome breakdown by time control
- [ ] **Tournament analytics**
  - [ ] Live KPIs (concurrent viewers, matches completed)
  - [ ] Engagement funnel for registrations
  - [ ] Prize distribution summary cards
- [ ] **Community analytics**
  - [ ] Active threads vs new members chart
  - [ ] Sentiment analysis placeholder using mock sentiment scores
  - [ ] Moderation response time tracking mock

## Platform Infrastructure (Future)
- [ ] **Supabase integration plan**
  - [ ] Outline schema for players, matches, tournaments, posts
  - [ ] Plan row-level security policies & JWT claims
  - [ ] Draft task list for realtime channel setup
- [ ] **Nest.js backend roadmap**
  - [ ] Define service boundaries (auth, tournaments, community)
  - [ ] Establish DTO + validation strategy with `class-validator`
  - [ ] Prepare testing approach (unit, e2e) with Jest
- [ ] **Deployment & scaling**
  - [ ] Document infrastructure diagram (Next.js SSR, Supabase, CDN)
  - [ ] Plan observability stack (Winston logs, OpenTelemetry traces)
  - [ ] Draft incident response playbook template

