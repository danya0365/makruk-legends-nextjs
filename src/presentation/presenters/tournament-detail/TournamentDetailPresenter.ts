import { MOCK_TOURNAMENTS, Tournament } from "@/src/data/mock/tournaments";
import { MOCK_LEADERBOARD, LeaderboardPlayer } from "@/src/data/mock/leaderboard";

export interface TournamentDetailViewModel {
  tournament: Tournament | null;
  topPlayers: LeaderboardPlayer[];
  canJoin: boolean;
  isRegistered: boolean;
}

/**
 * Presenter for Tournament Detail page
 * Follows Clean Architecture with proper separation of concerns
 */
export class TournamentDetailPresenter {
  /**
   * Get view model for the tournament detail page
   */
  async getViewModel(tournamentId: string, userId?: string): Promise<TournamentDetailViewModel> {
    try {
      const tournament = MOCK_TOURNAMENTS.find((t) => t.id === tournamentId);

      if (!tournament) {
        return {
          tournament: null,
          topPlayers: [],
          canJoin: false,
          isRegistered: false,
        };
      }

      // Check if user can join
      const canJoin =
        tournament.isOpen &&
        tournament.currentPlayers < tournament.maxPlayers &&
        (tournament.status === "upcoming" || tournament.status === "ongoing");

      // Mock: Check if user is registered
      const isRegistered = false; // In real app, check from database

      return {
        tournament,
        topPlayers: MOCK_LEADERBOARD.slice(0, 3), // Top 3 players
        canJoin,
        isRegistered,
      };
    } catch (error) {
      console.error("Error fetching tournament detail:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(tournamentId: string) {
    try {
      const tournament = MOCK_TOURNAMENTS.find((t) => t.id === tournamentId);

      return {
        title: tournament
          ? `${tournament.name} | Makruk Legends`
          : "Tournament | Makruk Legends",
        description: tournament?.description || "Tournament details",
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      throw error;
    }
  }
}

/**
 * Factory for creating TournamentDetailPresenter instances
 */
export class TournamentDetailPresenterFactory {
  static async createServer(): Promise<TournamentDetailPresenter> {
    return new TournamentDetailPresenter();
  }

  static createClient(): TournamentDetailPresenter {
    return new TournamentDetailPresenter();
  }
}
