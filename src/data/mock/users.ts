import { UserRole, UserTitle } from "../master/user-roles";

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  role: UserRole;
  title?: UserTitle;
  rating: number;
  country: string;
  joinedDate: string;
  isEmailVerified: boolean;
  isPremium: boolean;
  stats: {
    gamesPlayed: number;
    wins: number;
    losses: number;
    draws: number;
    winRate: number;
  };
  preferences: {
    theme: "light" | "dark" | "system";
    language: "th" | "en";
    notifications: {
      email: boolean;
      push: boolean;
      gameInvites: boolean;
      tournamentUpdates: boolean;
      friendRequests: boolean;
    };
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  displayName: string;
  password: string;
  confirmPassword: string;
  country: string;
}

// Mock users สำหรับทดสอบ login
export const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    email: "admin@makruklegends.com",
    password: "admin123",
    username: "admin",
    displayName: "Admin User",
    avatar: "/avatars/admin.jpg",
    role: UserRole.ADMIN,
    title: UserTitle.GM,
    rating: 2900,
    country: "TH",
    joinedDate: "2023-01-01",
    isEmailVerified: true,
    isPremium: true,
    stats: {
      gamesPlayed: 5000,
      wins: 3800,
      losses: 800,
      draws: 400,
      winRate: 76,
    },
    preferences: {
      theme: "system",
      language: "th",
      notifications: {
        email: true,
        push: true,
        gameInvites: true,
        tournamentUpdates: true,
        friendRequests: true,
      },
    },
  },
  {
    id: "2",
    email: "player@makruklegends.com",
    password: "player123",
    username: "thaiking88",
    displayName: "Somchai Makrukmaster",
    avatar: "/avatars/player1.jpg",
    role: UserRole.PREMIUM,
    title: UserTitle.IM,
    rating: 2650,
    country: "TH",
    joinedDate: "2023-03-15",
    isEmailVerified: true,
    isPremium: true,
    stats: {
      gamesPlayed: 1250,
      wins: 890,
      losses: 180,
      draws: 180,
      winRate: 71.2,
    },
    preferences: {
      theme: "dark",
      language: "th",
      notifications: {
        email: true,
        push: true,
        gameInvites: true,
        tournamentUpdates: true,
        friendRequests: true,
      },
    },
  },
  {
    id: "3",
    email: "test@makruklegends.com",
    password: "test123",
    username: "testuser",
    displayName: "Test User",
    avatar: "/avatars/default.jpg",
    role: UserRole.PLAYER,
    rating: 1500,
    country: "TH",
    joinedDate: "2024-01-01",
    isEmailVerified: false,
    isPremium: false,
    stats: {
      gamesPlayed: 50,
      wins: 25,
      losses: 20,
      draws: 5,
      winRate: 50,
    },
    preferences: {
      theme: "light",
      language: "th",
      notifications: {
        email: true,
        push: false,
        gameInvites: true,
        tournamentUpdates: false,
        friendRequests: true,
      },
    },
  },
];

// Helper function สำหรับ mock login
export function mockLogin(credentials: LoginCredentials): User | null {
  const user = MOCK_USERS.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) return null;

  // Remove password from returned user object
  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Helper function สำหรับ mock register
export function mockRegister(data: RegisterData): User {
  const newUser: User = {
    id: `user_${Date.now()}`,
    email: data.email,
    username: data.username,
    displayName: data.displayName,
    role: UserRole.PLAYER,
    rating: 1200,
    country: data.country,
    joinedDate: new Date().toISOString(),
    isEmailVerified: false,
    isPremium: false,
    stats: {
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      winRate: 0,
    },
    preferences: {
      theme: "system",
      language: "th",
      notifications: {
        email: true,
        push: true,
        gameInvites: true,
        tournamentUpdates: true,
        friendRequests: true,
      },
    },
  };

  return newUser;
}

// Helper function สำหรับหา user by email
export function findUserByEmail(email: string): User | null {
  const user = MOCK_USERS.find((u) => u.email === email);
  if (!user) return null;

  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Helper function สำหรับหา user by username
export function findUserByUsername(username: string): User | null {
  const user = MOCK_USERS.find((u) => u.username === username);
  if (!user) return null;

  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
