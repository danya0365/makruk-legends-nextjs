import type { Metadata } from "next";

import type { LandingMasterData } from "@/src/domain/models/landing";
import { getLandingMasterData } from "@/src/infrastructure/mocks/landing/master-data";

export class LandingPresenter {
  async getViewModel(): Promise<LandingMasterData> {
    return this.getMasterData();
  }

  async getMasterData(): Promise<LandingMasterData> {
    return getLandingMasterData();
  }

  generateMetadata(): Metadata {
    return {
      title: "Makruk Legends | Thai Chess Esports Platform",
      description:
        "Experience elite Makruk tournaments, ranked play, and vibrant community experiences tailored for Thai chess.",
      openGraph: {
        title: "Makruk Legends | Thai Chess Esports Platform",
        description:
          "Compete globally in Makruk tournaments with real-time analytics, leaderboards, and community-driven events.",
        url: "https://makruk-legends.example.com",
        siteName: "Makruk Legends",
        locale: "th_TH",
        type: "website" as const,
      },
      alternates: {
        canonical: "https://makruk-legends.example.com",
      },
      keywords: [
        "Makruk",
        "Thai Chess",
        "Esports",
        "Tournament",
        "Leaderboard",
        "Community",
        "Online Chess",
      ],
    };
  }
}

export class LandingPresenterFactory {
  static async createServer(): Promise<LandingPresenter> {
    return new LandingPresenter();
  }

  static createClient(): LandingPresenter {
    return new LandingPresenter();
  }
}
