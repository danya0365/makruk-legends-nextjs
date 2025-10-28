"use client";

import { useGameStore } from "@/src/presentation/stores/gameStore";
import { PIECE_SYMBOLS, PIECE_NAMES_TH } from "@/src/domain/types/game.types";
import { Crown, Users } from "lucide-react";

export function GameInfoContent() {
  const {
    currentTurn,
    status,
    whitePlayer,
    blackPlayer,
    capturedPieces,
  } = useGameStore();

  const getStatusText = () => {
    if (status === "playing") {
      return currentTurn === "white" ? "ตาขาว" : "ตาดำ";
    }
    return "รอเริ่มเกม";
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Crown className="h-6 w-6 text-yellow-500 mr-2" />
            <span className="font-semibold text-gray-900 dark:text-white">
              สถานะเกม
            </span>
          </div>
          <div
            className={`text-xl font-bold ${
              currentTurn === "white" ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"
            } ${status === "playing" ? "animate-pulse" : ""}`}
          >
            {getStatusText()}
          </div>
        </div>
      </div>

      {/* Players */}
      <div className="space-y-3">
        <div className="flex items-center mb-2">
          <Users className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            ผู้เล่น
          </h3>
        </div>
        
        <div className={`p-3 rounded-lg ${
          currentTurn === "white" && status === "playing"
            ? "bg-yellow-100 dark:bg-yellow-900/30 ring-2 ring-yellow-500"
            : "bg-gray-100 dark:bg-gray-700"
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900 dark:text-white">
              ♔ {whitePlayer}
            </span>
            {currentTurn === "white" && status === "playing" && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white font-semibold">
                กำลังเล่น
              </span>
            )}
          </div>
        </div>

        <div className={`p-3 rounded-lg ${
          currentTurn === "black" && status === "playing"
            ? "bg-yellow-100 dark:bg-yellow-900/30 ring-2 ring-yellow-500"
            : "bg-gray-100 dark:bg-gray-700"
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900 dark:text-white">
              ♚ {blackPlayer}
            </span>
            {currentTurn === "black" && status === "playing" && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white font-semibold">
                กำลังเล่น
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Captured Pieces */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          หมากที่จับได้
        </h3>

        {/* White captured */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            ขาวจับได้ ({capturedPieces.black.length}):
          </p>
          <div className="flex flex-wrap gap-2 min-h-[48px]">
            {capturedPieces.black.length === 0 ? (
              <span className="text-sm text-gray-400 dark:text-gray-500">
                ยังไม่มี
              </span>
            ) : (
              capturedPieces.black.map((piece, index) => (
                <span
                  key={`${piece.id}-${index}`}
                  className="text-3xl"
                  title={PIECE_NAMES_TH[piece.type]}
                >
                  {PIECE_SYMBOLS.black[piece.type]}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Black captured */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            ดำจับได้ ({capturedPieces.white.length}):
          </p>
          <div className="flex flex-wrap gap-2 min-h-[48px]">
            {capturedPieces.white.length === 0 ? (
              <span className="text-sm text-gray-400 dark:text-gray-500">
                ยังไม่มี
              </span>
            ) : (
              capturedPieces.white.map((piece, index) => (
                <span
                  key={`${piece.id}-${index}`}
                  className="text-3xl"
                  title={PIECE_NAMES_TH[piece.type]}
                >
                  {PIECE_SYMBOLS.white[piece.type]}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Piece Legend */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          ชื่อหมาก
        </h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
          <div>♔/♚ ขุน (King)</div>
          <div>♕/♛ เม็ด (Queen)</div>
          <div>♖/♜ เรือ (Rook)</div>
          <div>♗/♝ โคน (Bishop)</div>
          <div>♘/♞ ม้า (Knight)</div>
          <div>♙/♟ เบี้ย (Pawn)</div>
        </div>
      </div>
    </div>
  );
}
