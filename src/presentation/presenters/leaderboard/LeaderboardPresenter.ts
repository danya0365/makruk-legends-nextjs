import { MOCK_LEADERBOARD, LeaderboardPlayer } from "@/src/data/mock/leaderboard";

export interface LeaderboardViewModel {
  players: LeaderboardPlayer[];
  totalPlayers: number;
  timeFilters: Array<{ value: string; label: string }>;
  categoryFilters: Array<{ value: string; label: string }>;
}

/**
 * Presenter for Leaderboard page
 * Follows Clean Architecture with proper separation of concerns
 */
export class LeaderboardPresenter {
  /**
   * Get view model for the leaderboard page
   */
  async getViewModel(): Promise<LeaderboardViewModel> {
    try {
      const players = MOCK_LEADERBOARD;

      return {
        players,
        totalPlayers: players.length,
        timeFilters: [
          { value: "daily", label: "รายวัน" },
          { value: "weekly", label: "รายสัปดาห์" },
          { value: "monthly", label: "รายเดือน" },
          { value: "all-time", label: "ตลอดกาล" },
        ],
        categoryFilters: [
          { value: "overall", label: "ทั้งหมด" },
          { value: "blitz", label: "Blitz" },
          { value: "rapid", label: "Rapid" },
          { value: "classical", label: "Classical" },
        ],
      };
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    try {
      return {
        title: "อันดับผู้เล่น | Makruk Legends",
        description: "ติดตามอันดับและคะแนนของผู้เล่นหมากรุกไทยออนไลน์",
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      throw error;
    }
  }
}

/**
 * Factory for creating LeaderboardPresenter instances
 */
export class LeaderboardPresenterFactory {
  static async createServer(): Promise<LeaderboardPresenter> {
    return new LeaderboardPresenter();
  }

  static createClient(): LeaderboardPresenter {
    return new LeaderboardPresenter();
  }
}
