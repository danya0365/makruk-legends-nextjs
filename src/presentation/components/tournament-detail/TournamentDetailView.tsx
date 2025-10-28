"use client";

import { TournamentDetailViewModel } from "@/src/presentation/presenters/tournament-detail/TournamentDetailPresenter";
import { useTournamentDetailPresenter } from "@/src/presentation/presenters/tournament-detail/useTournamentDetailPresenter";
import { Trophy, Calendar, Users, Clock, DollarSign, MapPin, Award, CheckCircle } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";

interface TournamentDetailViewProps {
  tournamentId: string;
  initialViewModel?: TournamentDetailViewModel;
}

export function TournamentDetailView({
  tournamentId,
  initialViewModel,
}: TournamentDetailViewProps) {
  const [state, actions] = useTournamentDetailPresenter(tournamentId, initialViewModel);
  const { viewModel, loading, error, registering } = state;

  // Show loading only on initial load
  if (loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!viewModel?.tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ไม่พบทัวร์นาเม้นต์
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ทัวร์นาเม้นต์นี้อาจถูกลบหรือไม่มีอยู่ในระบบ
          </p>
          <Link
            href="/tournaments"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            กลับไปหน้าทัวร์นาเม้นต์
          </Link>
        </div>
      </div>
    );
  }

  const { tournament, topPlayers, canJoin, isRegistered } = viewModel;

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
        {/* Back Button */}
        <Link
          href="/tournaments"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-6"
        >
          ← กลับไปหน้าทัวร์นาเม้นต์
        </Link>

        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Tournament Image */}
            <div className="flex-shrink-0">
              <div className="w-full lg:w-64 h-64 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-8xl">
                🏆
              </div>
            </div>

            {/* Tournament Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(
                      tournament.status
                    )} mb-3`}
                  >
                    {getStatusLabel(tournament.status)}
                  </span>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {tournament.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {tournament.description}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${tournament.prizePool.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">รางวัล</p>
                </div>

                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tournament.currentPlayers}/{tournament.maxPlayers}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">ผู้เล่น</p>
                </div>

                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {tournament.timeControl}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">เวลา</p>
                </div>

                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Award className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-xl font-bold text-gray-900 dark:text-white uppercase">
                    {tournament.format}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">รูปแบบ</p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {isRegistered ? (
                  <button
                    disabled
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium opacity-75 cursor-not-allowed"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    ลงทะเบียนแล้ว
                  </button>
                ) : canJoin ? (
                  <button
                    onClick={actions.handleRegister}
                    disabled={registering}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {registering ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        กำลังลงทะเบียน...
                      </>
                    ) : (
                      <>
                        <Trophy className="h-5 w-5 mr-2" />
                        สมัครเข้าร่วม
                        {tournament.entryFee > 0 && ` ($${tournament.entryFee})`}
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-6 py-3 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                  >
                    ไม่สามารถสมัครได้
                  </button>
                )}

                <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium">
                  แชร์
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tournament Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                รายละเอียด
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">วันเริ่มต้น</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(tournament.startDate).toLocaleString("th-TH", {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      ({formatDistanceToNow(new Date(tournament.startDate), {
                        addSuffix: true,
                        locale: th,
                      })})
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">วันสิ้นสุด</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tournament.endDate
                        ? new Date(tournament.endDate).toLocaleString("th-TH", {
                            dateStyle: "full",
                            timeStyle: "short",
                          })
                        : "ยังไม่กำหนด"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">สถานที่</p>
                    <p className="text-gray-600 dark:text-gray-400">ออนไลน์</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">ค่าสมัคร</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tournament.entryFee === 0 ? "ฟรี" : `$${tournament.entryFee}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                กติกา
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>ผู้เข้าร่วมต้องมีคะแนน rating อย่างน้อย 1200</li>
                  <li>เกมแต่ละตาจะมีเวลา {tournament.timeControl}</li>
                  <li>รูปแบบการแข่งขันแบบ {tournament.format.toUpperCase()}</li>
                  <li>ห้ามใช้ AI หรือโปรแกรมช่วยในการเล่น</li>
                  <li>ผู้เล่นต้องเคารพคู่แข่งและกรรมการ</li>
                  <li>การตัดสินของกรรมการถือเป็นที่สิ้นสุด</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Players */}
            {topPlayers.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
                  ผู้เล่นชั้นนำ
                </h2>
                <div className="space-y-4">
                  {topPlayers.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="text-2xl mr-3">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {player.displayName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Rating: {player.rating}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prize Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-green-500" />
                การแบ่งรางวัล
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">🥇 อันดับ 1</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ${(tournament.prizePool * 0.5).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">🥈 อันดับ 2</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ${(tournament.prizePool * 0.3).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">🥉 อันดับ 3</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ${(tournament.prizePool * 0.2).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
