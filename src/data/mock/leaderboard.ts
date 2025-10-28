export interface LeaderboardPlayer {
  id: string;
  rank: number;
  username: string;
  displayName: string;
  rating: number;
  country: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  avatar: string;
  title?: "GM" | "IM" | "FM" | "CM" | "NM";
}

export const MOCK_LEADERBOARD: LeaderboardPlayer[] = [
  {
    id: "1",
    rank: 1,
    username: "ThaiKing88",
    displayName: "Somchai Makrukmaster",
    rating: 2850,
    country: "TH",
    gamesPlayed: 1250,
    wins: 890,
    losses: 180,
    draws: 180,
    avatar: "/avatars/player1.jpg",
    title: "GM",
  },
  {
    id: "2",
    rank: 2,
    username: "BangkokBeast",
    displayName: "Nattapong Champion",
    rating: 2820,
    country: "TH",
    gamesPlayed: 980,
    wins: 720,
    losses: 140,
    draws: 120,
    avatar: "/avatars/player2.jpg",
    title: "GM",
  },
  {
    id: "3",
    rank: 3,
    username: "SiamStrategist",
    displayName: "Apinya Tactical",
    rating: 2790,
    country: "TH",
    gamesPlayed: 1100,
    wins: 780,
    losses: 190,
    draws: 130,
    avatar: "/avatars/player3.jpg",
    title: "IM",
  },
  {
    id: "4",
    rank: 4,
    username: "ChessWarrior",
    displayName: "Kitti Warrior",
    rating: 2765,
    country: "TH",
    gamesPlayed: 890,
    wins: 640,
    losses: 150,
    draws: 100,
    avatar: "/avatars/player4.jpg",
    title: "IM",
  },
  {
    id: "5",
    rank: 5,
    username: "MakrukPro",
    displayName: "Surasak Professional",
    rating: 2740,
    country: "TH",
    gamesPlayed: 1050,
    wins: 720,
    losses: 210,
    draws: 120,
    avatar: "/avatars/player5.jpg",
    title: "FM",
  },
];
