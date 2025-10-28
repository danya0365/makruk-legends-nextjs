"use client";

import { LandingViewModel } from "@/src/presentation/presenters/landing/LandingPresenter";
import { useLandingPresenter } from "@/src/presentation/presenters/landing/useLandingPresenter";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

interface LandingViewProps {
  initialViewModel?: LandingViewModel;
}

export function LandingView({ initialViewModel }: LandingViewProps) {
  const [state] = useLandingPresenter(initialViewModel);
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

  // Show error state if there's an error but we have no data
  if (state.error && !viewModel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 font-medium mb-2">
            เกิดข้อผิดพลาด
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{state.error}</p>
        </div>
      </div>
    );
  }

  if (!viewModel) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10 dark:opacity-20"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 text-8xl animate-bounce">♔</div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl mb-6">
              Makruk Legends
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              หมากรุกไทยออนไลน์
            </p>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400 mb-12">
              เล่นหมากรุกไทยออนไลน์กับผู้เล่นจากทั่วโลก
              แข่งขันทัวร์นาเม้นต์ระดับนานาชาติ พัฒนาทักษะด้วยบทเรียนจากผู้เชี่ยวชาญ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/play"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                เริ่มเล่นเลย
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
              >
                เรียนรู้หมากรุก
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {viewModel.statCards.map((stat) => (
              <div
                key={stat.id}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl">{stat.icon}</div>
                  {stat.trend && (
                    <div
                      className={`flex items-center text-sm font-medium ${
                        stat.trend.isPositive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {stat.trend.value}%
                    </div>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              เลือกรูปแบบการเล่น
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              เลือกรูปแบบที่เหมาะกับคุณ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {viewModel.gameModes.map((mode) => (
              <Link
                key={mode.id}
                href={`/play/${mode.id}`}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-5xl mb-4">{mode.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {mode.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {mode.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-500">
                    ⏱️ {mode.timeControl}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform">
                    เล่นเลย →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              ฟีเจอร์ครบครัน
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              ทุกอย่างที่คุณต้องการสำหรับการเล่นหมากรุก
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {viewModel.features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tournaments Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                ทัวร์นาเม้นต์แนะนำ
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                เข้าร่วมการแข่งขันและชิงรางวัล
              </p>
            </div>
            <Link
              href="/tournaments"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
            >
              ดูทั้งหมด
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {viewModel.featuredTournaments.map((tournament) => (
              <Link
                key={tournament.id}
                href={`/tournaments/${tournament.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                <div className="aspect-video bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-6xl">
                  🏆
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        tournament.status === "ongoing"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                    >
                      {tournament.status === "ongoing" ? "กำลังแข่ง" : "เร็วๆ นี้"}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      💰 ${tournament.prizePool.toLocaleString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tournament.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {tournament.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span>⏱️ {tournament.timeControl}</span>
                    <span>
                      👥 {tournament.currentPlayers}/{tournament.maxPlayers}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Players Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                ผู้เล่นอันดับต้น
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                ติดตามผู้เล่นชั้นนำของเรา
              </p>
            </div>
            <Link
              href="/leaderboard"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
            >
              ดูอันดับทั้งหมด
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      อันดับ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ผู้เล่น
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      คะแนน
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      เกมที่เล่น
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ชนะ/เสมอ/แพ้
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {viewModel.topPlayers.map((player) => (
                    <tr
                      key={player.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`text-2xl ${
                              player.rank === 1
                                ? "text-yellow-500"
                                : player.rank === 2
                                ? "text-gray-400"
                                : player.rank === 3
                                ? "text-orange-600"
                                : ""
                            }`}
                          >
                            {player.rank === 1
                              ? "🥇"
                              : player.rank === 2
                              ? "🥈"
                              : player.rank === 3
                              ? "🥉"
                              : `#${player.rank}`}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                            {player.displayName.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {player.displayName}
                              {player.title && (
                                <span className="ml-2 text-xs font-semibold px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                  {player.title}
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              @{player.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {player.rating}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {player.gamesPlayed}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          <span className="text-green-600 dark:text-green-400">
                            {player.wins}
                          </span>
                          /
                          <span className="text-gray-600 dark:text-gray-400">
                            {player.draws}
                          </span>
                          /
                          <span className="text-red-600 dark:text-red-400">
                            {player.losses}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            เข้าร่วมกับผู้เล่นหมากรุกหลายพันคนจากทั่วโลก
            เริ่มต้นเล่นฟรีวันนี้
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              สมัครสมาชิกฟรี
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/play"
              className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl border-2 border-white"
            >
              เล่นทันที (ไม่ต้องสมัคร)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
