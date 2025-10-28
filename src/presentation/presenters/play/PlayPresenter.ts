import { GAME_MODES, GameMode } from "@/src/data/master/game-modes";

export interface PlayViewModel {
  gameModes: GameMode[];
  quickPlayOptions: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    timeControl: string;
  }>;
}

/**
 * Presenter for Play page
 * Follows Clean Architecture with proper separation of concerns
 */
export class PlayPresenter {
  /**
   * Get view model for the play page
   */
  async getViewModel(): Promise<PlayViewModel> {
    try {
      return {
        gameModes: GAME_MODES,
        quickPlayOptions: [
          {
            id: "quick-blitz",
            name: "Quick Blitz",
            description: "เล่นด่วน 3 นาที",
            icon: "⚡",
            timeControl: "3+0",
          },
          {
            id: "quick-rapid",
            name: "Quick Rapid",
            description: "เล่นด่วน 10 นาที",
            icon: "🎯",
            timeControl: "10+0",
          },
        ],
      };
    } catch (error) {
      console.error("Error fetching play data:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    try {
      return {
        title: "เล่นเกม | Makruk Legends",
        description: "เลือกโหมดเกมและเริ่มเล่นหมากรุกไทยออนไลน์",
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      throw error;
    }
  }
}

/**
 * Factory for creating PlayPresenter instances
 */
export class PlayPresenterFactory {
  static async createServer(): Promise<PlayPresenter> {
    return new PlayPresenter();
  }

  static createClient(): PlayPresenter {
    return new PlayPresenter();
  }
}
