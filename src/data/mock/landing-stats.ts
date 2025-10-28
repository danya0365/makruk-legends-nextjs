export interface LandingStats {
  totalPlayers: number;
  gamesPlayed: number;
  activeTournaments: number;
  countriesServed: number;
}

export const MOCK_LANDING_STATS: LandingStats = {
  totalPlayers: 125000,
  gamesPlayed: 3500000,
  activeTournaments: 45,
  countriesServed: 85,
};

export interface StatCard {
  id: string;
  label: string;
  value: string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const MOCK_STAT_CARDS: StatCard[] = [
  {
    id: "players",
    label: "ผู้เล่นทั้งหมด",
    value: "125K+",
    icon: "👥",
    trend: {
      value: 12.5,
      isPositive: true,
    },
  },
  {
    id: "games",
    label: "เกมที่เล่น",
    value: "3.5M+",
    icon: "♟️",
    trend: {
      value: 8.3,
      isPositive: true,
    },
  },
  {
    id: "tournaments",
    label: "ทัวร์นาเม้นต์ที่กำลังเล่น",
    value: "45",
    icon: "🏆",
  },
  {
    id: "countries",
    label: "ประเทศทั่วโลก",
    value: "85",
    icon: "🌍",
  },
];
