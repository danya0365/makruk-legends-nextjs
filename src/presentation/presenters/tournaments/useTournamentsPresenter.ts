"use client";

import { useCallback, useEffect, useState } from "react";
import { TournamentsViewModel, TournamentsPresenterFactory } from "./TournamentsPresenter";
import { useTournamentsStore } from "@/src/presentation/stores/tournamentsStore";

// Initialize presenter instance once (singleton pattern)
const presenter = TournamentsPresenterFactory.createClient();

export interface TournamentsPresenterState {
  viewModel: TournamentsViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface TournamentsPresenterActions {
  loadData: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Tournaments presenter
 * Provides state management and actions for Tournaments operations
 */
export function useTournamentsPresenter(
  initialViewModel?: TournamentsViewModel
): [TournamentsPresenterState, TournamentsPresenterActions] {
  const [viewModel, setViewModel] = useState<TournamentsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { loadTournaments } = useTournamentsStore();

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
      // Also load tournaments into store
      await loadTournaments();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading tournaments data:", err);
    } finally {
      setLoading(false);
    }
  }, [loadTournaments]);

  // Load data on mount if no initial view model
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    } else {
      // Still load tournaments into store if we have initial view model
      loadTournaments();
    }
  }, [initialViewModel, loadData, loadTournaments]);

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
