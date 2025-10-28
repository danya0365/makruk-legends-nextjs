"use client";

import { useEffect } from "react";
import { useGameStore } from "@/src/presentation/stores/gameStore";
import { MakrukBoard } from "./MakrukBoard";
import { GameHUD } from "./GameHUD";
import { GameConfig } from "@/src/domain/types/game.types";
import { Crown } from "lucide-react";

interface GameViewProps {
  config?: GameConfig;
}

export function GameView({ config }: GameViewProps) {
  const { initializeGame, currentTurn, status } = useGameStore();

  useEffect(() => {
    // Initialize game on mount
    if (config) {
      initializeGame(config);
    }
  }, [config, initializeGame]);

  const getStatusText = () => {
    if (status === "playing") {
      return currentTurn === "white" ? "ตาขาว" : "ตาดำ";
    }
    return "รอเริ่มเกม";
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-20">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl">♔</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                หมากรุกไทย
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Makruk - Thai Chess
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                สถานะ:
              </span>
              <span
                className={`text-lg font-bold ${
                  status === "playing"
                    ? currentTurn === "white"
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                    : "text-gray-500"
                } ${status === "playing" ? "animate-pulse" : ""}`}
              >
                {getStatusText()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Board - Centered */}
      <div className="absolute inset-0 flex items-center justify-center pt-16 pb-4">
        <div className="flex items-center justify-center">
          <MakrukBoard />
        </div>
      </div>

      {/* HUD Controls */}
      <GameHUD />

      {/* Quick Instructions - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
          💡 คำแนะนำ
        </h3>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <p>• คลิกหมากเพื่อเลือก</p>
          <p>• ช่องเขียว = เดินได้</p>
          <p>• คลิกไอคอนด้านขวาเพื่อดูข้อมูล</p>
        </div>
      </div>
    </div>
  );
}
