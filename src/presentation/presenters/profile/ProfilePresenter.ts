import { User } from "@/src/data/mock/users";
import { MOCK_GAME_HISTORY, GameHistory } from "@/src/data/mock/game-history";

export interface ProfileViewModel {
  user: User | null;
  gameHistory: GameHistory[];
  stats: {
    totalGames: number;
    wins: number;
    losses: number;
    draws: number;
    winRate: number;
    currentStreak: number;
    bestStreak: number;
  };
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedDate?: string;
  }>;
}

/**
 * Presenter for Profile page
 * Follows Clean Architecture with proper separation of concerns
 */
export class ProfilePresenter {
  /**
   * Get view model for the profile page
   */
  async getViewModel(user: User | null): Promise<ProfileViewModel> {
    try {
      if (!user) {
        return {
          user: null,
          gameHistory: [],
          stats: {
            totalGames: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            winRate: 0,
            currentStreak: 0,
            bestStreak: 0,
          },
          achievements: [],
        };
      }

      // Calculate stats from user data
      const stats = {
        totalGames: user.stats.gamesPlayed,
        wins: user.stats.wins,
        losses: user.stats.losses,
        draws: user.stats.draws,
        winRate: user.stats.winRate,
        currentStreak: this.calculateCurrentStreak(),
        bestStreak: this.calculateBestStreak(),
      };

      // Mock achievements
      const achievements = this.getAchievements(user);

      return {
        user,
        gameHistory: MOCK_GAME_HISTORY,
        stats,
        achievements,
      };
    } catch (error) {
      console.error("Error fetching profile data:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(username?: string) {
    try {
      return {
        title: username ? `${username} - โปรไฟล์ | Makruk Legends` : "โปรไฟล์ | Makruk Legends",
        description: "ดูโปรไฟล์และสถิติของผู้เล่น",
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      throw error;
    }
  }

  /**
   * Calculate current win streak
   */
  private calculateCurrentStreak(): number {
    // Mock calculation
    return 5;
  }

  /**
   * Calculate best win streak
   */
  private calculateBestStreak(): number {
    // Mock calculation
    return 12;
  }

  /**
   * Get user achievements
   */
  private getAchievements(user: User) {
    const achievements = [
      {
        id: "first_win",
        name: "ชนะครั้งแรก",
        description: "ชนะเกมแรกของคุณ",
        icon: "🏆",
        unlocked: user.stats.wins > 0,
        unlockedDate: "2024-01-15",
      },
      {
        id: "ten_wins",
        name: "นักสู้ 10 ชัย",
        description: "ชนะ 10 เกม",
        icon: "⭐",
        unlocked: user.stats.wins >= 10,
        unlockedDate: user.stats.wins >= 10 ? "2024-02-20" : undefined,
      },
      {
        id: "hundred_games",
        name: "นักเล่นมืออาชีพ",
        description: "เล่นครบ 100 เกม",
        icon: "🎮",
        unlocked: user.stats.gamesPlayed >= 100,
        unlockedDate: user.stats.gamesPlayed >= 100 ? "2024-05-10" : undefined,
      },
      {
        id: "high_rating",
        name: "ผู้เชี่ยวชาญ",
        description: "ได้คะแนนเกิน 2500",
        icon: "💎",
        unlocked: user.rating >= 2500,
        unlockedDate: user.rating >= 2500 ? "2024-08-15" : undefined,
      },
      {
        id: "master_title",
        name: "มาสเตอร์",
        description: "ได้รับตำแหน่ง Master",
        icon: "👑",
        unlocked: !!user.title,
        unlockedDate: user.title ? "2024-09-01" : undefined,
      },
      {
        id: "tournament_win",
        name: "แชมป์ทัวร์นาเม้นต์",
        description: "ชนะทัวร์นาเม้นต์ครั้งแรก",
        icon: "🥇",
        unlocked: false,
      },
    ];

    return achievements;
  }
}

/**
 * Factory for creating ProfilePresenter instances
 */
export class ProfilePresenterFactory {
  static async createServer(): Promise<ProfilePresenter> {
    return new ProfilePresenter();
  }

  static createClient(): ProfilePresenter {
    return new ProfilePresenter();
  }
}
