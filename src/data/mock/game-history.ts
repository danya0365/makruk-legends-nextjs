export interface GameHistory {
  id: string;
  opponent: {
    id: string;
    username: string;
    displayName: string;
    rating: number;
    avatar?: string;
  };
  result: "win" | "loss" | "draw";
  gameMode: "blitz" | "rapid" | "classical" | "daily";
  timeControl: string;
  moves: number;
  duration: string;
  date: string;
  ratingChange: number;
}

export const MOCK_GAME_HISTORY: GameHistory[] = [
  {
    id: "1",
    opponent: {
      id: "2",
      username: "thaiking88",
      displayName: "Somchai Makrukmaster",
      rating: 2650,
    },
    result: "win",
    gameMode: "rapid",
    timeControl: "10+0",
    moves: 45,
    duration: "18m 32s",
    date: "2024-10-28T10:30:00Z",
    ratingChange: 12,
  },
  {
    id: "2",
    opponent: {
      id: "3",
      username: "bangkokbeast",
      displayName: "Nattapong Champion",
      rating: 2820,
    },
    result: "loss",
    gameMode: "blitz",
    timeControl: "3+2",
    moves: 38,
    duration: "8m 15s",
    date: "2024-10-27T15:45:00Z",
    ratingChange: -8,
  },
  {
    id: "3",
    opponent: {
      id: "4",
      username: "siamstrategist",
      displayName: "Apinya Tactical",
      rating: 2790,
    },
    result: "draw",
    gameMode: "classical",
    timeControl: "30+0",
    moves: 67,
    duration: "1h 24m",
    date: "2024-10-26T20:15:00Z",
    ratingChange: 0,
  },
  {
    id: "4",
    opponent: {
      id: "5",
      username: "chesswarrior",
      displayName: "Kitti Warrior",
      rating: 2765,
    },
    result: "win",
    gameMode: "rapid",
    timeControl: "10+0",
    moves: 52,
    duration: "22m 18s",
    date: "2024-10-25T14:20:00Z",
    ratingChange: 10,
  },
  {
    id: "5",
    opponent: {
      id: "6",
      username: "makrukpro",
      displayName: "Surasak Professional",
      rating: 2740,
    },
    result: "win",
    gameMode: "blitz",
    timeControl: "5+0",
    moves: 41,
    duration: "11m 45s",
    date: "2024-10-24T09:30:00Z",
    ratingChange: 11,
  },
];
