"use client";

import localforage from "localforage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type LandingRegionFilter = "all" | "asia" | "global" | "europe";

export type TournamentStatusFilter = "all" | "registration" | "live" | "completed";

export interface LandingStoreState {
  region: LandingRegionFilter;
  tournamentStatus: TournamentStatusFilter;
  showOnlyFeatured: boolean;
  activeCommunityCategory: "forum" | "live" | "learning" | "all";
  setRegion: (region: LandingRegionFilter) => void;
  setTournamentStatus: (status: TournamentStatusFilter) => void;
  toggleFeatured: () => void;
  setCommunityCategory: (category: LandingStoreState["activeCommunityCategory"]) => void;
  reset: () => void;
}

const STORAGE_KEY = "landing-store";

export const useLandingStore = create<LandingStoreState>()(
  persist(
    (set) => ({
      region: "all",
      tournamentStatus: "all",
      showOnlyFeatured: false,
      activeCommunityCategory: "all",
      setRegion: (region) => set({ region }),
      setTournamentStatus: (tournamentStatus) => set({ tournamentStatus }),
      toggleFeatured: () =>
        set((state) => ({
          showOnlyFeatured: !state.showOnlyFeatured,
        })),
      setCommunityCategory: (activeCommunityCategory) => set({ activeCommunityCategory }),
      reset: () =>
        set({
          region: "all",
          tournamentStatus: "all",
          showOnlyFeatured: false,
          activeCommunityCategory: "all",
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localforage),
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        // Future migrations can be handled here.
      },
    },
  ),
);
