"use client";

import { useCallback, useEffect, useState } from "react";
import { PlayViewModel, PlayPresenterFactory } from "./PlayPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = PlayPresenterFactory.createClient();

export interface PlayPresenterState {
  viewModel: PlayViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface PlayPresenterActions {
  loadData: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Play presenter
 * Provides state management and actions for Play operations
 */
export function usePlayPresenter(
  initialViewModel?: PlayViewModel
): [PlayPresenterState, PlayPresenterActions] {
  const [viewModel, setViewModel] = useState<PlayViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading play data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on mount if no initial view model
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

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
