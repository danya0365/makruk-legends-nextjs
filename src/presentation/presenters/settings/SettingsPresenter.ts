import { User } from "@/src/data/mock/users";

export interface SettingsViewModel {
  user: User | null;
  themeOptions: Array<{ value: string; label: string }>;
  languageOptions: Array<{ value: string; label: string }>;
}

/**
 * Presenter for Settings page
 * Follows Clean Architecture with proper separation of concerns
 */
export class SettingsPresenter {
  /**
   * Get view model for the settings page
   */
  async getViewModel(user: User | null): Promise<SettingsViewModel> {
    try {
      return {
        user,
        themeOptions: [
          { value: "light", label: "สว่าง" },
          { value: "dark", label: "มืด" },
          { value: "system", label: "ตามระบบ" },
        ],
        languageOptions: [
          { value: "th", label: "ไทย" },
          { value: "en", label: "English" },
        ],
      };
    } catch (error) {
      console.error("Error fetching settings data:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    try {
      return {
        title: "ตั้งค่า | Makruk Legends",
        description: "ตั้งค่าบัญชีและการแจ้งเตือน",
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      throw error;
    }
  }
}

/**
 * Factory for creating SettingsPresenter instances
 */
export class SettingsPresenterFactory {
  static async createServer(): Promise<SettingsPresenter> {
    return new SettingsPresenter();
  }

  static createClient(): SettingsPresenter {
    return new SettingsPresenter();
  }
}
