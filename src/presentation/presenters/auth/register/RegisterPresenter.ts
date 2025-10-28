import { COUNTRIES, Country } from "@/src/data/master/countries";

export interface RegisterViewModel {
  title: string;
  description: string;
  countries: Country[];
  showLoginLink: boolean;
}

/**
 * Presenter for Register page
 * Follows Clean Architecture with proper separation of concerns
 */
export class RegisterPresenter {
  /**
   * Get view model for the register page
   */
  async getViewModel(): Promise<RegisterViewModel> {
    try {
      return {
        title: "สมัครสมาชิก",
        description: "สร้างบัญชีเพื่อเริ่มเล่นหมากรุกออนไลน์",
        countries: COUNTRIES,
        showLoginLink: true,
      };
    } catch (error) {
      console.error("Error fetching register data:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    try {
      return {
        title: "สมัครสมาชิก | Makruk Legends",
        description: "สมัครสมาชิกเพื่อเล่นหมากรุกไทยออนไลน์",
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      throw error;
    }
  }
}

/**
 * Factory for creating RegisterPresenter instances
 */
export class RegisterPresenterFactory {
  static async createServer(): Promise<RegisterPresenter> {
    return new RegisterPresenter();
  }

  static createClient(): RegisterPresenter {
    return new RegisterPresenter();
  }
}
