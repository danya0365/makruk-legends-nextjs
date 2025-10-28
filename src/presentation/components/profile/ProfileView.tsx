"use client";

import { ProfileViewModel } from "@/src/presentation/presenters/profile/ProfilePresenter";
import { useProfilePresenter } from "@/src/presentation/presenters/profile/useProfilePresenter";
import { getCountryName } from "@/src/data/master/countries";
import { Trophy, Target, Zap, Award, Clock, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";

interface ProfileViewProps {
  initialViewModel?: ProfileViewModel;
}

export function ProfileView({ initialViewModel }: ProfileViewProps) {
  const [state] = useProfilePresenter(initialViewModel);
  const viewModel = state.viewModel;

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

  if (!viewModel || !viewModel.user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            กรุณาเข้าสู่ระบบ
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            คุณต้องเข้าสู่ระบบเพื่อดูโปรไฟล์
          </p>
        </div>
      </div>
    );
  }

  const { user, stats, gameHistory, achievements } = viewModel;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-5xl shadow-lg">
                {user.displayName.charAt(0)}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user.displayName}
                </h1>
                {user.title && (
                  <span className="inline-flex text-sm font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    {user.title}
                  </span>
                )}
                {user.isPremium && (
                  <span className="inline-flex text-sm font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    👑 Premium
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                @{user.username}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                {getCountryName(user.country)} • สมัครเมื่อ {new Date(user.joinedDate).toLocaleDateString("th-TH")}
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.rating}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Rating
                </span>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalGames}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">เกมทั้งหมด</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.wins}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ชนะ</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                    {stats.draws}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">เสมอ</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {stats.losses}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">แพ้</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.winRate}%
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">อัตราชนะ</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.currentStreak}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ชนะติดต่อกัน</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.bestStreak}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">สถิติสูงสุด</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {achievements.filter((a) => a.unlocked).length}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">รางวัล</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game History */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-blue-600" />
                ประวัติการเล่นล่าสุด
              </h2>

              <div className="space-y-4">
                {gameHistory.map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Result Badge */}
                      <div
                        className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                          game.result === "win"
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                            : game.result === "loss"
                            ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {game.result === "win" ? "W" : game.result === "loss" ? "L" : "D"}
                      </div>

                      {/* Game Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            vs {game.opponent.displayName}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({game.opponent.rating})
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <span className="px-2 py-1 rounded bg-white dark:bg-gray-600">
                            {game.gameMode}
                          </span>
                          <span>{game.timeControl}</span>
                          <span>•</span>
                          <span>{game.moves} ตา</span>
                          <span>•</span>
                          <span>{game.duration}</span>
                        </div>
                      </div>

                      {/* Rating Change */}
                      <div className="flex-shrink-0 text-right">
                        <div
                          className={`text-lg font-bold ${
                            game.ratingChange > 0
                              ? "text-green-600 dark:text-green-400"
                              : game.ratingChange < 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {game.ratingChange > 0 ? "+" : ""}
                          {game.ratingChange}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDistanceToNow(new Date(game.date), {
                            addSuffix: true,
                            locale: th,
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Award className="h-6 w-6 mr-2 text-yellow-600" />
                รางวัลผลงาน
              </h2>

              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700"
                        : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 opacity-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {achievement.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.unlockedDate && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(achievement.unlockedDate).toLocaleDateString("th-TH")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
