"use client";

import { useCallback, useEffect, useState } from "react";
import { TournamentDetailViewModel, TournamentDetailPresenterFactory } from "./TournamentDetailPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";

// Initialize presenter instance once (singleton pattern)
const presenter = TournamentDetailPresenterFactory.createClient();

export interface TournamentDetailPresenterState {
  viewModel: TournamentDetailViewModel | null;
  loading: boolean;
  error: string | null;
  registering: boolean;
}

export interface TournamentDetailPresenterActions {
  loadData: (tournamentId: string) => Promise<void>;
  handleRegister: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Tournament Detail presenter
 * Provides state management and actions for Tournament Detail operations
 */
export function useTournamentDetailPresenter(
  tournamentId: string,
  initialViewModel?: TournamentDetailViewModel
): [TournamentDetailPresenterState, TournamentDetailPresenterActions] {
  const { user } = useAuthStore();
  const [viewModel, setViewModel] = useState<TournamentDetailViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const newViewModel = await presenter.getViewModel(id, user?.id);
        setViewModel(newViewModel);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error loading tournament detail:", err);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  /**
   * Handle tournament registration
   */
  const handleRegister = useCallback(async () => {
    if (!user) {
      setError("กรุณาเข้าสู่ระบบก่อนสมัครทัวร์นาเม้นต์");
      return;
    }

    if (!viewModel?.tournament) {
      setError("ไม่พบข้อมูลทัวร์นาเม้นต์");
      return;
    }

    setRegistering(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In real app, call API to register
      console.log("Registering for tournament:", viewModel.tournament.id);

      // Update view model
      setViewModel({
        ...viewModel,
        isRegistered: true,
        tournament: {
          ...viewModel.tournament,
          currentPlayers: viewModel.tournament.currentPlayers + 1,
        },
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "เกิดข้อผิดพลาด";
      setError(errorMessage);
    } finally {
      setRegistering(false);
    }
  }, [user, viewModel]);

  // Load data on mount if no initial view model
  useEffect(() => {
    if (!initialViewModel && tournamentId) {
      loadData(tournamentId);
    }
  }, [initialViewModel, tournamentId, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
      registering,
    },
    {
      loadData,
      handleRegister,
      setError,
    },
  ];
}
