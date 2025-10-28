"use client";

import { useCallback, useEffect, useState } from "react";
import { LeaderboardViewModel, LeaderboardPresenterFactory } from "./LeaderboardPresenter";
import { useLeaderboardStore } from "@/src/presentation/stores/leaderboardStore";

// Initialize presenter instance once (singleton pattern)
const presenter = LeaderboardPresenterFactory.createClient();

export interface LeaderboardPresenterState {
  viewModel: LeaderboardViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface LeaderboardPresenterActions {
  loadData: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Leaderboard presenter
 * Provides state management and actions for Leaderboard operations
 */
export function useLeaderboardPresenter(
  initialViewModel?: LeaderboardViewModel
): [LeaderboardPresenterState, LeaderboardPresenterActions] {
  const [viewModel, setViewModel] = useState<LeaderboardViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { loadPlayers } = useLeaderboardStore();

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
      // Also load players into store
      await loadPlayers();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading leaderboard data:", err);
    } finally {
      setLoading(false);
    }
  }, [loadPlayers]);

  // Load data on mount if no initial view model
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    } else {
      // Still load players into store if we have initial view model
      loadPlayers();
    }
  }, [initialViewModel, loadData, loadPlayers]);

  return [
    {
      viewModel,
      loading,
      error,
    },
    {
      loadData,
      setError,
    },
  ];
}
