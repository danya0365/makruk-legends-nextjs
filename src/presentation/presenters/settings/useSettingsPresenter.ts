"use client";

import { useCallback, useEffect, useState } from "react";
import { SettingsViewModel, SettingsPresenterFactory } from "./SettingsPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { User } from "@/src/data/mock/users";

// Initialize presenter instance once (singleton pattern)
const presenter = SettingsPresenterFactory.createClient();

export interface SettingsPresenterState {
  viewModel: SettingsViewModel | null;
  loading: boolean;
  error: string | null;
  saveSuccess: boolean;
}

export interface SettingsPresenterActions {
  loadData: () => Promise<void>;
  updatePreferences: (preferences: Partial<User["preferences"]>) => Promise<void>;
  setError: (error: string | null) => void;
  clearSuccess: () => void;
}

/**
 * Custom hook for Settings presenter
 * Provides state management and actions for Settings operations
 */
export function useSettingsPresenter(
  initialViewModel?: SettingsViewModel
): [SettingsPresenterState, SettingsPresenterActions] {
  const { user, updateUser } = useAuthStore();
  const [viewModel, setViewModel] = useState<SettingsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

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
      console.error("Error loading settings data:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Update user preferences
   */
  const updatePreferences = useCallback(
    async (preferences: Partial<User["preferences"]>) => {
      if (!user) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      setLoading(true);
      setError(null);
      setSaveSuccess(false);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Update user in store
        updateUser({
          preferences: {
            ...user.preferences,
            ...preferences,
          },
        });

        setSaveSuccess(true);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "เกิดข้อผิดพลาด";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [user, updateUser]
  );

  /**
   * Clear success message
   */
  const clearSuccess = useCallback(() => {
    setSaveSuccess(false);
  }, []);

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
      saveSuccess,
    },
    {
      loadData,
      updatePreferences,
      setError,
      clearSuccess,
    },
  ];
}
