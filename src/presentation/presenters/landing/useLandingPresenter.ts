"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type {
  CommunityHighlight,
  LandingMasterData,
  LeaderboardEntry,
  TournamentInfo,
} from "@/src/domain/models/landing";
import { LandingPresenterFactory } from "@/src/presentation/presenters/landing/LandingPresenter";
import {
  useLandingStore,
  type LandingStoreState,
  type LandingRegionFilter,
  type TournamentStatusFilter,
} from "@/src/presentation/stores/landingStore";

const presenter = LandingPresenterFactory.createClient();

export interface LandingPresenterState {
  viewModel: LandingMasterData | null;
  featuredTournaments: TournamentInfo[];
  filteredTournaments: TournamentInfo[];
  topLeaders: LeaderboardEntry[];
  trendingCommunities: CommunityHighlight[];
  loading: boolean;
  error: string | null;
  filters: Pick<LandingStoreState, "region" | "tournamentStatus" | "showOnlyFeatured" | "activeCommunityCategory">;
}

export interface LandingPresenterActions {
  loadData: () => Promise<void>;
  setRegion: (region: LandingRegionFilter) => void;
  setTournamentStatus: (status: TournamentStatusFilter) => void;
  toggleFeatured: () => void;
  setCommunityCategory: (category: LandingStoreState["activeCommunityCategory"]) => void;
  resetFilters: () => void;
}

export function useLandingPresenter(
  initialViewModel?: LandingMasterData,
): [LandingPresenterState, LandingPresenterActions] {
  const {
    region,
    tournamentStatus,
    showOnlyFeatured,
    activeCommunityCategory,
    setRegion,
    setTournamentStatus,
    toggleFeatured,
    setCommunityCategory,
    reset,
  } = useLandingStore();

  const [viewModel, setViewModel] = useState<LandingMasterData | null>(initialViewModel || null);
  const [loading, setLoading] = useState<boolean>(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await presenter.getMasterData();
      setViewModel(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "เกิดข้อผิดพลาดไม่ทราบสาเหตุ";
      setError(message);
      console.error("Error loading landing data", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  const featuredTournaments = useMemo(() => {
    if (!viewModel) return [];
    return viewModel.tournaments.filter((item) => item.tags.includes("featured"));
  }, [viewModel]);

  const filteredTournaments = useMemo(() => {
    if (!viewModel) return [];

    return viewModel.tournaments.filter((tournament) => {
      if (region !== "all" && tournament.region !== region) {
        return false;
      }

      if (tournamentStatus !== "all" && tournament.status !== tournamentStatus) {
        return false;
      }

      if (showOnlyFeatured && !tournament.tags.includes("featured")) {
        return false;
      }

      return true;
    });
  }, [region, showOnlyFeatured, tournamentStatus, viewModel]);

  const topLeaders = useMemo(() => {
    if (!viewModel) return [];
    return viewModel.leaderboards.slice(0, 5);
  }, [viewModel]);

  const trendingCommunities = useMemo(() => {
    if (!viewModel) return [];

    const sorted = viewModel.community
      .slice()
      .sort((a, b) => b.engagementScore - a.engagementScore);

    if (activeCommunityCategory === "all") {
      return sorted.slice(0, 3);
    }

    return sorted.filter((item) => item.category === activeCommunityCategory).slice(0, 3);
  }, [activeCommunityCategory, viewModel]);

  return [
    {
      viewModel,
      featuredTournaments,
      filteredTournaments,
      topLeaders,
      trendingCommunities,
      loading,
      error,
      filters: {
        region,
        tournamentStatus,
        showOnlyFeatured,
        activeCommunityCategory,
      },
    },
    {
      loadData,
      setRegion,
      setTournamentStatus,
      toggleFeatured,
      setCommunityCategory,
      resetFilters: reset,
    },
  ];
}
