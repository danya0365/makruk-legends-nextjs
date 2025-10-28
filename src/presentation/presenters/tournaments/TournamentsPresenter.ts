import { MOCK_TOURNAMENTS, Tournament } from "@/src/data/mock/tournaments";

export interface TournamentsViewModel {
  tournaments: Tournament[];
  statusFilters: Array<{ value: string; label: string }>;
  formatFilters: Array<{ value: string; label: string }>;
}

/**
 * Presenter for Tournaments page
 * Follows Clean Architecture with proper separation of concerns
 */
export class TournamentsPresenter {
  /**
   * Get view model for the tournaments page
   */
  async getViewModel(): Promise<TournamentsViewModel> {
    try {
      return {
        tournaments: MOCK_TOURNAMENTS,
        statusFilters: [
          { value: "all", label: "ทั้งหมด" },
          { value: "upcoming", label: "เร็วๆ นี้" },
          { value: "ongoing", label: "กำลังแข่ง" },
          { value: "completed", label: "จบแล้ว" },
        ],
        formatFilters: [
          { value: "all", label: "ทุกรูปแบบ" },
          { value: "swiss", label: "Swiss" },
          { value: "knockout", label: "Knockout" },
          { value: "round-robin", label: "Round Robin" },
          { value: "arena", label: "Arena" },
        ],
      };
    } catch (error) {
      console.error("Error fetching tournaments data:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    try {
      return {
        title: "ทัวร์นาเม้นต์ | Makruk Legends",
        description: "เข้าร่วมทัวร์นาเม้นต์หมากรุกไทยออนไลน์",
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      throw error;
    }
  }
}

/**
 * Factory for creating TournamentsPresenter instances
 */
export class TournamentsPresenterFactory {
  static async createServer(): Promise<TournamentsPresenter> {
    return new TournamentsPresenter();
  }

  static createClient(): TournamentsPresenter {
    return new TournamentsPresenter();
  }
}
