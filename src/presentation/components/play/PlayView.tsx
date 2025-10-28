"use client";

import { PlayViewModel } from "@/src/presentation/presenters/play/PlayPresenter";
import { usePlayPresenter } from "@/src/presentation/presenters/play/usePlayPresenter";
import { Zap, Users, Bot } from "lucide-react";
import Link from "next/link";

interface PlayViewProps {
  initialViewModel?: PlayViewModel;
}

export function PlayView({ initialViewModel }: PlayViewProps) {
  const [state] = usePlayPresenter(initialViewModel);
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

  if (!viewModel) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4 animate-bounce">♔</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            เลือกโหมดการเล่น
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            เลือกรูปแบบที่คุณชื่นชอบและเริ่มเล่นเลย
          </p>
        </div>

        {/* Quick Play Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Zap className="h-7 w-7 mr-2 text-yellow-500" />
            เล่นด่วน
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {viewModel.quickPlayOptions.map((option) => (
              <Link
                key={option.id}
                href="/game"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-left block"
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">{option.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {option.name}
                  </h3>
                  <p className="text-blue-100 mb-4">{option.description}</p>
                  <div className="flex items-center justify-between text-white/90">
                    <span className="text-sm">⏱️ {option.timeControl}</span>
                    <span className="text-sm font-semibold">เล่นเลย →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Game Modes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            โหมดทั้งหมด
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {viewModel.gameModes.map((mode) => (
              <Link
                key={mode.id}
                href="/game"
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-5xl mb-4">{mode.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {mode.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {mode.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-500">
                    ⏱️ {mode.timeControl}
                  </span>
                  {mode.minPlayers === mode.maxPlayers ? (
                    <span className="text-gray-500 dark:text-gray-500">
                      {mode.minPlayers === 1 ? "1 ผู้เล่น" : `${mode.minPlayers} ผู้เล่น`}
                    </span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-500">
                      {mode.minPlayers}-{mode.maxPlayers} ผู้เล่น
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Play Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Play vs Friend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              เล่นกับเพื่อน
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ส่งลิงก์ให้เพื่อนและเล่นด้วยกัน
            </p>
            <Link
              href="/game/create-room"
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              สร้างห้อง
            </Link>
          </div>

          {/* Play vs Computer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
              <Bot className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              เล่นกับคอมพิวเตอร์
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ฝึกฝนกับ AI ได้หลายระดับ
            </p>
            <Link
              href="/game"
              className="block w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              เริ่มเล่น
            </Link>
          </div>

          {/* Random Match */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              จับคู่สุ่ม
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              หาคู่แข่งที่มีคะแนนใกล้เคียง
            </p>
            <Link
              href="/game"
              className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              ค้นหาคู่แข่ง
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            💡 คำแนะนำ
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Blitz (3-5 นาที):</strong> เหมาะสำหรับผู้เล่นที่ต้องการเกมรวดเร็ว
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Rapid (10-15 นาที):</strong> เวลาพอดีสำหรับการคิดกลยุทธ์
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Classical (30+ นาที):</strong> สำหรับเกมที่ต้องการคิดอย่างรอบคอบ
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Daily:</strong> เล่นทีละตา สามารถเล่นได้หลายเกมพร้อมกัน
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
