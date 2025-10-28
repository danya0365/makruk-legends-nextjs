export interface LoginViewModel {
  title: string;
  description: string;
  showRegisterLink: boolean;
  showForgotPasswordLink: boolean;
}

/**
 * Presenter for Login page
 * Follows Clean Architecture with proper separation of concerns
 */
export class LoginPresenter {
  /**
   * Get view model for the login page
   */
  async getViewModel(): Promise<LoginViewModel> {
    try {
      return {
        title: "เข้าสู่ระบบ",
        description: "เข้าสู่ระบบเพื่อเริ่มเล่นหมากรุกออนไลน์",
        showRegisterLink: true,
        showForgotPasswordLink: true,
      };
    } catch (error) {
      console.error("Error fetching login data:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    try {
      return {
        title: "เข้าสู่ระบบ | Makruk Legends",
        description: "เข้าสู่ระบบเพื่อเล่นหมากรุกไทยออนไลน์",
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      throw error;
    }
  }
}

/**
 * Factory for creating LoginPresenter instances
 */
export class LoginPresenterFactory {
  static async createServer(): Promise<LoginPresenter> {
    return new LoginPresenter();
  }

  static createClient(): LoginPresenter {
    return new LoginPresenter();
  }
}
