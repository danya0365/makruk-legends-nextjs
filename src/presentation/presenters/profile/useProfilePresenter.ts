"use client";

import { useCallback, useEffect, useState } from "react";
import { ProfileViewModel, ProfilePresenterFactory } from "./ProfilePresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";

// Initialize presenter instance once (singleton pattern)
const presenter = ProfilePresenterFactory.createClient();

export interface ProfilePresenterState {
  viewModel: ProfileViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface ProfilePresenterActions {
  loadData: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Profile presenter
 * Provides state management and actions for Profile operations
 */
export function useProfilePresenter(
  initialViewModel?: ProfileViewModel
): [ProfilePresenterState, ProfilePresenterActions] {
  const { user } = useAuthStore();
  const [viewModel, setViewModel] = useState<ProfileViewModel | null>(
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
      const newViewModel = await presenter.getViewModel(user);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading profile data:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Refresh profile data
   */
  const refreshProfile = useCallback(async () => {
    await loadData();
  }, [loadData]);

  // Load data on mount if no initial view model
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  // Reload when user changes
  useEffect(() => {
    if (initialViewModel && user) {
      loadData();
    }
  }, [user, initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
    },
    {
      loadData,
      refreshProfile,
      setError,
    },
  ];
}
