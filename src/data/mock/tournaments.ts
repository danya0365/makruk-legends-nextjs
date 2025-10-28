export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  format: "swiss" | "knockout" | "round-robin" | "arena";
  timeControl: string;
  prizePool: number;
  currentPlayers: number;
  maxPlayers: number;
  status: "upcoming" | "ongoing" | "completed";
  image: string;
  entryFee: number;
  isOpen: boolean;
}

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: "1",
    name: "Makruk World Championship 2024",
    description: "การแข่งขันชิงแชมป์โลกประจำปี 2024",
    startDate: "2024-12-01",
    endDate: "2024-12-15",
    format: "knockout",
    timeControl: "15+10",
    prizePool: 50000,
    currentPlayers: 128,
    maxPlayers: 256,
    status: "upcoming",
    image: "/images/tournaments/world-championship.jpg",
    entryFee: 100,
    isOpen: true,
  },
  {
    id: "2",
    name: "Thailand Open Rapid",
    description: "การแข่งขันแบบ Rapid ออนไลน์",
    startDate: "2024-11-15",
    endDate: "2024-11-15",
    format: "swiss",
    timeControl: "10+0",
    prizePool: 5000,
    currentPlayers: 64,
    maxPlayers: 100,
    status: "ongoing",
    image: "/images/tournaments/thailand-open.jpg",
    entryFee: 0,
    isOpen: true,
  },
  {
    id: "3",
    name: "Blitz Battle Arena",
    description: "การแข่งขันแบบ Arena ไม่จำกัดรอบ",
    startDate: "2024-11-10",
    endDate: "2024-11-10",
    format: "arena",
    timeControl: "3+2",
    prizePool: 2000,
    currentPlayers: 250,
    maxPlayers: 500,
    status: "ongoing",
    image: "/images/tournaments/blitz-arena.jpg",
    entryFee: 0,
    isOpen: true,
  },
  {
    id: "4",
    name: "Beginner's Cup",
    description: "ทัวร์นาเม้นต์สำหรับผู้เริ่มต้น",
    startDate: "2024-11-20",
    endDate: "2024-11-20",
    format: "round-robin",
    timeControl: "10+5",
    prizePool: 1000,
    currentPlayers: 32,
    maxPlayers: 50,
    status: "upcoming",
    image: "/images/tournaments/beginners-cup.jpg",
    entryFee: 0,
    isOpen: true,
  },
];
