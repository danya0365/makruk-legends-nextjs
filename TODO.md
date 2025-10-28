# TODO - Makruk Legends (หมากรุกออนไลน์)

## Phase 1: Foundation & Layout ✅ (In Progress)

### 1.1 Project Setup
- [x] Initialize Next.js project with TypeScript
- [x] Setup Tailwind CSS
- [x] Setup Zustand for state management
- [x] Setup Supabase client configuration
- [ ] Update root layout metadata
- [ ] Create MainLayout with Header, Footer, Theme Toggle

### 1.2 Landing Page
- [ ] Create landing page presenter
- [ ] Create landing page hook
- [ ] Create landing page view component
- [ ] Add master data for landing page
- [ ] Add mock data for landing page
- [ ] Design hero section with game introduction
- [ ] Add feature highlights section
- [ ] Add tournament showcase section
- [ ] Add leaderboard preview section
- [ ] Add call-to-action sections

---

## Phase 2: Authentication & User Management

### 2.1 Authentication Pages
- [ ] Create login page (follow CREATE_PAGE_PATTERN.md)
- [ ] Create register page
- [ ] Create forgot password page
- [ ] Create reset password page
- [ ] Create email verification page

### 2.2 User Profile
- [ ] Create profile page
- [ ] Create profile edit page
- [ ] Create avatar upload feature
- [ ] Create user settings page
- [ ] Create notification preferences

### 2.3 Authentication Store
- [ ] Create auth store with Zustand
- [ ] Implement login/logout actions
- [ ] Implement session management
- [ ] Implement token refresh logic
- [ ] Create auth guards/middleware

---

## Phase 3: Core Game Features

### 3.1 Makruk Board & Game Engine
- [ ] Design Makruk board component
- [ ] Implement piece movement logic
- [ ] Implement game rules validation
- [ ] Implement check/checkmate detection
- [ ] Implement draw conditions (stalemate, repetition, 50-move rule)
- [ ] Create piece components (King, Queen, Rook, Bishop, Knight, Pawn)
- [ ] Add move animation
- [ ] Add sound effects
- [ ] Create move history display
- [ ] Implement undo/redo functionality

### 3.2 Game State Management
- [ ] Create game store with Zustand
- [ ] Implement board state
- [ ] Implement turn management
- [ ] Implement captured pieces tracking
- [ ] Implement timer management
- [ ] Save game state to localStorage/Supabase

### 3.3 Game Modes
- [ ] Create single player vs AI page
- [ ] Create online multiplayer page
- [ ] Create local multiplayer page
- [ ] Create practice mode page
- [ ] Create puzzle mode page
- [ ] Create training mode page

---

## Phase 4: Tournament System

### 4.1 Tournament Management
- [ ] Create tournaments list page
- [ ] Create tournament detail page
- [ ] Create tournament creation page (admin)
- [ ] Create tournament registration page
- [ ] Create tournament bracket display
- [ ] Create tournament schedule page
- [ ] Implement tournament types (Single Elimination, Double Elimination, Round Robin, Swiss)

### 4.2 Tournament Store
- [ ] Create tournament store with Zustand
- [ ] Implement tournament list actions
- [ ] Implement tournament registration actions
- [ ] Implement tournament progress tracking
- [ ] Implement match scheduling

### 4.3 Match Management
- [ ] Create match detail page
- [ ] Create live match page
- [ ] Create match history page
- [ ] Implement match result submission
- [ ] Implement match dispute system

---

## Phase 5: Leaderboard & Rankings

### 5.1 Leaderboard System
- [ ] Create global leaderboard page
- [ ] Create regional leaderboard page
- [ ] Create tournament leaderboard page
- [ ] Create weekly/monthly leaderboard
- [ ] Create friends leaderboard page

### 5.2 Rating System
- [ ] Implement ELO rating calculation
- [ ] Create rating history page
- [ ] Create rating statistics page
- [ ] Implement rating decay system
- [ ] Create rating distribution charts

### 5.3 Rankings Display
- [ ] Design leaderboard table component
- [ ] Add filtering options (time period, region, game mode)
- [ ] Add search functionality
- [ ] Add pagination
- [ ] Create player card component with rank badges

---

## Phase 6: Community Features

### 6.1 Social Features
- [ ] Create friends system page
- [ ] Create friend requests page
- [ ] Create chat system
- [ ] Create direct messaging
- [ ] Create group chat rooms

### 6.2 Community Pages
- [ ] Create community forum page
- [ ] Create post creation page
- [ ] Create post detail page with comments
- [ ] Create user activity feed
- [ ] Create trending topics page

### 6.3 Clubs & Teams
- [ ] Create clubs list page
- [ ] Create club detail page
- [ ] Create club creation page
- [ ] Create club members management
- [ ] Create club tournaments

---

## Phase 7: Advanced Features (See TODO_FEATURES.md)

### 7.1 Analysis Tools
- [ ] Game analysis engine
- [ ] Move suggestions
- [ ] Position evaluation
- [ ] Opening database
- [ ] Endgame tablebase

### 7.2 Learning & Training
- [ ] Tutorials system
- [ ] Puzzle challenges
- [ ] Training exercises
- [ ] Strategy guides
- [ ] Video lessons

### 7.3 Streaming & Spectating
- [ ] Live game streaming
- [ ] Spectator mode
- [ ] Tournament broadcasts
- [ ] Commentary system
- [ ] Replay system

---

## Phase 8: Mobile Optimization

### 8.1 Responsive Design
- [ ] Optimize board for mobile devices
- [ ] Implement touch controls
- [ ] Add mobile navigation
- [ ] Optimize performance for mobile
- [ ] Add offline mode support

---

## Phase 9: Admin Dashboard

### 9.1 Admin Panel
- [ ] Create admin dashboard
- [ ] User management page
- [ ] Tournament management page
- [ ] Content moderation page
- [ ] Analytics dashboard
- [ ] System settings page

---

## Phase 10: Database & Backend

### 10.1 Supabase Setup
- [ ] Design database schema
- [ ] Create user tables
- [ ] Create game tables
- [ ] Create tournament tables
- [ ] Create leaderboard tables
- [ ] Create community tables
- [ ] Write database migrations
- [ ] Setup Row Level Security (RLS)
- [ ] Create database functions
- [ ] Create database triggers

### 10.2 Real-time Features
- [ ] Setup Supabase Realtime subscriptions
- [ ] Implement live game updates
- [ ] Implement live chat
- [ ] Implement live tournament updates
- [ ] Implement notification system

---

## Phase 11: Testing & Quality Assurance

### 11.1 Testing
- [ ] Write unit tests for game logic
- [ ] Write integration tests
- [ ] Write E2E tests
- [ ] Performance testing
- [ ] Cross-browser testing

### 11.2 Quality Assurance
- [ ] Code review checklist
- [ ] Accessibility audit
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Security audit

---

## Phase 12: Deployment & Monitoring

### 12.1 Deployment
- [ ] Setup production environment
- [ ] Configure CI/CD pipeline
- [ ] Setup monitoring tools
- [ ] Setup error tracking (Sentry)
- [ ] Setup analytics (Google Analytics)
- [ ] Setup CDN
- [ ] Configure caching strategy

### 12.2 Documentation
- [ ] Write API documentation
- [ ] Write user guide
- [ ] Write developer documentation
- [ ] Create FAQ page
- [ ] Create help center

---

## Notes

- ทุก page ต้องทำตาม pattern ใน `/prompt/CREATE_PAGE_PATTERN.md`
- ใช้ Zustand สำหรับ client-side state management
- ใช้ mock data ในช่วง development
- ทำ responsive design ตั้งแต่แรก
- ใส่ Thai language localization ทุกที่
- เน้น performance และ UX
- ทำ dark mode support ทุก component

---

## Priority Order

1. **High Priority**: Phase 1-3 (Foundation, Auth, Core Game)
2. **Medium Priority**: Phase 4-6 (Tournament, Leaderboard, Community)
3. **Low Priority**: Phase 7-9 (Advanced Features, Mobile, Admin)
4. **Continuous**: Phase 10-12 (Database, Testing, Deployment)
