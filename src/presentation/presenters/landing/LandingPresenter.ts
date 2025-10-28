import { GAME_MODES, GameMode } from "@/src/data/master/game-modes";
import { FEATURES, Feature } from "@/src/data/master/features";
import { MOCK_LANDING_STATS, MOCK_STAT_CARDS, LandingStats, StatCard } from "@/src/data/mock/landing-stats";
import { MOCK_TOURNAMENTS, Tournament } from "@/src/data/mock/tournaments";
import { MOCK_LEADERBOARD, LeaderboardPlayer } from "@/src/data/mock/leaderboard";

export interface LandingViewModel {
  gameModes: GameMode[];
  features: Feature[];
  stats: LandingStats;
  statCards: StatCard[];
  featuredTournaments: Tournament[];
  topPlayers: LeaderboardPlayer[];
}

/**
 * Presenter for Landing page
 * Follows Clean Architecture with proper separation of concerns
 */
export class LandingPresenter {
  /**
   * Get view model for the landing page
   */
  async getViewModel(): Promise<LandingViewModel> {
    try {
      // Get data in parallel for better performance
      const [gameModes, features, stats, statCards, tournaments, players] = await Promise.all([
        this.getGameModes(),
        this.getFeatures(),
        this.getStats(),
        this.getStatCards(),
        this.getFeaturedTournaments(),
        this.getTopPlayers(),
      ]);

      return {
        gameModes,
        features,
        stats,
        statCards,
        featuredTournaments: tournaments,
        topPlayers: players,
      };
    } catch (error) {
      console.error("Error fetching landing data:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    try {
      return {
        title: "Makruk Legends - หมากรุกไทยออนไลน์",
        description: "เล่นหมากรุกไทยออนไลน์ แข่งขันทัวร์นาเม้นต์ระดับโลก พร้อมระบบจัดอันดับและชุมชนผู้เล่น",
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      throw error;
    }
  }

  /**
   * Get available game modes
   */
  async getGameModes(): Promise<GameMode[]> {
    // In real app, this would fetch from API/Database
    return GAME_MODES.filter((mode) => mode.isAvailable);
  }

  /**
   * Get platform features
   */
  async getFeatures(): Promise<Feature[]> {
    // In real app, this would fetch from API/Database
    return FEATURES;
  }

  /**
   * Get platform statistics
   */
  async getStats(): Promise<LandingStats> {
    // In real app, this would fetch from API/Database
    return MOCK_LANDING_STATS;
  }

  /**
   * Get stat cards for display
   */
  async getStatCards(): Promise<StatCard[]> {
    // In real app, this would fetch from API/Database
    return MOCK_STAT_CARDS;
  }

  /**
   * Get featured tournaments
   */
  async getFeaturedTournaments(): Promise<Tournament[]> {
    // In real app, this would fetch from API/Database
    // Return top 3 featured tournaments
    return MOCK_TOURNAMENTS.filter((t) => t.status === "upcoming" || t.status === "ongoing").slice(0, 3);
  }

  /**
   * Get top players from leaderboard
   */
  async getTopPlayers(): Promise<LeaderboardPlayer[]> {
    // In real app, this would fetch from API/Database
    // Return top 5 players
    return MOCK_LEADERBOARD.slice(0, 5);
  }
}

/**
 * Factory for creating LandingPresenter instances
 */
export class LandingPresenterFactory {
  static async createServer(): Promise<LandingPresenter> {
    return new LandingPresenter();
  }

  static createClient(): LandingPresenter {
    return new LandingPresenter();
  }
}
