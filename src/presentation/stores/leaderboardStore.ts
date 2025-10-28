"use client";

import { create } from "zustand";
import { LeaderboardPlayer, MOCK_LEADERBOARD } from "@/src/data/mock/leaderboard";

type TimeFilter = "daily" | "weekly" | "monthly" | "all-time";
type CategoryFilter = "overall" | "blitz" | "rapid" | "classical";

interface LeaderboardState {
  players: LeaderboardPlayer[];
  timeFilter: TimeFilter;
  categoryFilter: CategoryFilter;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

interface LeaderboardActions {
  setTimeFilter: (filter: TimeFilter) => void;
  setCategoryFilter: (filter: CategoryFilter) => void;
  setSearchQuery: (query: string) => void;
  loadPlayers: () => Promise<void>;
  refreshLeaderboard: () => Promise<void>;
}

type LeaderboardStore = LeaderboardState & LeaderboardActions;

export const useLeaderboardStore = create<LeaderboardStore>((set, get) => ({
  // Initial state
  players: [],
  timeFilter: "all-time",
  categoryFilter: "overall",
  searchQuery: "",
  isLoading: false,
  error: null,

  // Actions
  setTimeFilter: (filter: TimeFilter) => {
    set({ timeFilter: filter });
    get().loadPlayers();
  },

  setCategoryFilter: (filter: CategoryFilter) => {
    set({ categoryFilter: filter });
    get().loadPlayers();
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  loadPlayers: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { searchQuery } = get();

      let players = [...MOCK_LEADERBOARD];

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        players = players.filter(
          (p) =>
            p.displayName.toLowerCase().includes(query) ||
            p.username.toLowerCase().includes(query) ||
            p.country.toLowerCase().includes(query)
        );
      }

      set({
        players,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "เกิดข้อผิดพลาด",
        isLoading: false,
      });
    }
  },

  refreshLeaderboard: async () => {
    await get().loadPlayers();
  },
}));

// Selectors
export const selectPlayers = (state: LeaderboardStore) => state.players;
export const selectTimeFilter = (state: LeaderboardStore) => state.timeFilter;
export const selectCategoryFilter = (state: LeaderboardStore) => state.categoryFilter;
export const selectIsLoading = (state: LeaderboardStore) => state.isLoading;
export const selectError = (state: LeaderboardStore) => state.error;
