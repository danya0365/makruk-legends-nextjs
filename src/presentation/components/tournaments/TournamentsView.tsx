"use client";

import { TournamentsViewModel } from "@/src/presentation/presenters/tournaments/TournamentsPresenter";
import { useTournamentsPresenter } from "@/src/presentation/presenters/tournaments/useTournamentsPresenter";
import { useTournamentsStore } from "@/src/presentation/stores/tournamentsStore";
import { Trophy, Calendar, Users, Clock, DollarSign, Filter, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";

interface TournamentsViewProps {
  initialViewModel?: TournamentsViewModel;
}

export function TournamentsView({ initialViewModel }: TournamentsViewProps) {
  const [state] = useTournamentsPresenter(initialViewModel);
  const {
    tournaments,
    statusFilter,
    formatFilter,
    searchQuery,
    isLoading: storeLoading,
    setStatusFilter,
    setFormatFilter,
    setSearchQuery,
  } = useTournamentsStore();

  const [showFilters, setShowFilters] = useState(false);
  const viewModel = state.viewModel;
  const loading = state.loading || storeLoading;

  // Show loading only on initial load
  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!viewModel) {
    return null;
  }

  const filteredTournaments = searchQuery
    ? tournaments.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tournaments;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ongoing":
        return "กำลังแข่ง";
      case "upcoming":
        return "เร็วๆ นี้";
      case "completed":
        return "จบแล้ว";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ทัวร์นาเม้นต์
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            เข้าร่วมการแข่งขันและชิงรางวัล
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ค้นหาทัวร์นาเม้นต์..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                />
              </div>
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>ตัวกรอง</span>
            </button>

            {/* Filters (Desktop) */}
            <div className={`flex flex-col sm:flex-row gap-4 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              >
                {viewModel.statusFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              {/* Format Filter */}
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value as typeof formatFilter)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              >
                {viewModel.formatFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="flex justify-center mb-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Tournaments Grid */}
        {filteredTournaments.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ไม่พบทัวร์นาเม้นต์
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              ลองค้นหาด้วยคำอื่นหรือปรับตัวกรอง
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <Link
                key={tournament.id}
                href={`/tournaments/${tournament.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                {/* Tournament Image/Icon */}
                <div className="aspect-video bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-6xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">🏆</div>
                </div>

                {/* Tournament Info */}
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                        tournament.status
                      )}`}
                    >
                      {getStatusLabel(tournament.status)}
                    </span>
                    {tournament.entryFee === 0 ? (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        ฟรี
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ${tournament.entryFee}
                      </span>
                    )}
                  </div>

                  {/* Tournament Name */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tournament.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {tournament.description}
                  </p>

                  {/* Tournament Details */}
                  <div className="space-y-2 text-sm">
                    {/* Prize Pool */}
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <DollarSign className="h-4 w-4 mr-2 text-yellow-500" />
                      <span className="font-semibold">
                        ${tournament.prizePool.toLocaleString()}
                      </span>
                    </div>

                    {/* Players */}
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Users className="h-4 w-4 mr-2 text-blue-500" />
                      <span>
                        {tournament.currentPlayers}/{tournament.maxPlayers} ผู้เล่น
                      </span>
                    </div>

                    {/* Time Control */}
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{tournament.timeControl}</span>
                    </div>

                    {/* Start Date */}
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                      <span>
                        {formatDistanceToNow(new Date(tournament.startDate), {
                          addSuffix: true,
                          locale: th,
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Format Badge */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                      {tournament.format.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {tournaments.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    ทัวร์นาเม้นต์ทั้งหมด
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tournaments.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    ผู้เข้าร่วม
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tournaments.reduce((acc, t) => acc + t.currentPlayers, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                  <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    รางวัลรวม
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${tournaments.reduce((acc, t) => acc + t.prizePool, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
