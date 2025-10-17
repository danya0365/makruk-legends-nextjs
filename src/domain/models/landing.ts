export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: HeroStat[];
}

export interface HeroStat {
  label: string;
  value: string;
  subLabel: string;
}

export interface FeatureHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TournamentInfo {
  id: string;
  name: string;
  format: string;
  timeControl: string;
  prizePool: string;
  startDate: string;
  playerCap: number;
  registeredPlayers: number;
  region: string;
  status: "registration" | "live" | "completed";
  tags: string[];
  description: string;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  rating: number;
  country: string;
  region: string;
  rank: number;
  winRate: number;
  streak: number;
}

export interface CommunityHighlight {
  id: string;
  title: string;
  description: string;
  category: "forum" | "live" | "learning";
  memberCount: number;
  engagementScore: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  url: string;
}

export interface InsightMetric {
  id: string;
  label: string;
  value: string;
  trend: "up" | "down" | "steady";
  change: string;
}

export interface LandingMasterData {
  hero: HeroContent;
  highlights: FeatureHighlight[];
  tournaments: TournamentInfo[];
  leaderboards: LeaderboardEntry[];
  community: CommunityHighlight[];
  testimonials: Testimonial[];
  partners: Partner[];
  insights: InsightMetric[];
}
