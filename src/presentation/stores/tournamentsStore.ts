"use client";

import { create } from "zustand";
import { Tournament, MOCK_TOURNAMENTS } from "@/src/data/mock/tournaments";

type StatusFilter = "all" | "upcoming" | "ongoing" | "completed";
type FormatFilter = "all" | "swiss" | "knockout" | "round-robin" | "arena";

interface TournamentsState {
  tournaments: Tournament[];
  statusFilter: StatusFilter;
  formatFilter: FormatFilter;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

interface TournamentsActions {
  setStatusFilter: (filter: StatusFilter) => void;
  setFormatFilter: (filter: FormatFilter) => void;
  setSearchQuery: (query: string) => void;
  loadTournaments: () => Promise<void>;
  refreshTournaments: () => Promise<void>;
}

type TournamentsStore = TournamentsState & TournamentsActions;

export const useTournamentsStore = create<TournamentsStore>((set, get) => ({
  // Initial state
  tournaments: [],
  statusFilter: "all",
  formatFilter: "all",
  searchQuery: "",
  isLoading: false,
  error: null,

  // Actions
  setStatusFilter: (filter: StatusFilter) => {
    set({ statusFilter: filter });
    get().loadTournaments();
  },

  setFormatFilter: (filter: FormatFilter) => {
    set({ formatFilter: filter });
    get().loadTournaments();
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  loadTournaments: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const { statusFilter, formatFilter, searchQuery } = get();
      let tournaments = [...MOCK_TOURNAMENTS];

      // Filter by status
      if (statusFilter !== "all") {
        tournaments = tournaments.filter((t) => t.status === statusFilter);
      }

      // Filter by format
      if (formatFilter !== "all") {
        tournaments = tournaments.filter((t) => t.format === formatFilter);
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        tournaments = tournaments.filter(
          (t) =>
            t.name.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query)
        );
      }

      set({
        tournaments,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "เกิดข้อผิดพลาด",
        isLoading: false,
      });
    }
  },

  refreshTournaments: async () => {
    await get().loadTournaments();
  },
}));

// Selectors
export const selectTournaments = (state: TournamentsStore) => state.tournaments;
export const selectStatusFilter = (state: TournamentsStore) => state.statusFilter;
export const selectFormatFilter = (state: TournamentsStore) => state.formatFilter;
export const selectIsLoading = (state: TournamentsStore) => state.isLoading;
export const selectError = (state: TournamentsStore) => state.error;
