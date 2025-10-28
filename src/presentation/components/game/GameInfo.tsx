"use client";

import { useGameStore } from "@/src/presentation/stores/gameStore";
import { PIECE_SYMBOLS, PIECE_NAMES_TH } from "@/src/domain/types/game.types";
import { Crown, Flag, Handshake } from "lucide-react";

export function GameInfo() {
  const {
    currentTurn,
    status,
    result,
    capturedPieces,
    moveHistory,
    whitePlayer,
    blackPlayer,
    resignGame,
    acceptDraw,
    resetGame,
  } = useGameStore();

  const getStatusText = () => {
    if (status === "finished") {
      if (result === "white-win") return "ขาวชนะ! 🎉";
      if (result === "black-win") return "ดำชนะ! 🎉";
      if (result === "draw") return "เสมอกัน";
    }
    if (status === "playing") {
      return currentTurn === "white" ? "ตาขาว" : "ตาดำ";
    }
    return "รอเริ่มเกม";
  };

  const getStatusColor = () => {
    if (status === "finished") return "text-yellow-500";
    if (currentTurn === "white") return "text-white";
    return "text-gray-900";
  };

  return (
    <div className="space-y-4">
      {/* Current Turn */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Crown className="h-5 w-5 mr-2 text-yellow-500" />
            สถานะเกม
          </h3>
          <div
            className={`text-2xl font-bold ${getStatusColor()} ${
              status === "playing" ? "animate-pulse" : ""
            }`}
          >
            {getStatusText()}
          </div>
        </div>

        {/* Players */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {whitePlayer} (ขาว)
            </span>
            {currentTurn === "white" && status === "playing" && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                กำลังเล่น
              </span>
            )}
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {blackPlayer} (ดำ)
            </span>
            {currentTurn === "black" && status === "playing" && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                กำลังเล่น
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Captured Pieces */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          หมากที่จับได้
        </h3>

        {/* White captured pieces */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            ขาวจับได้ ({capturedPieces.black.length}):
          </p>
          <div className="flex flex-wrap gap-1 min-h-[40px]">
            {capturedPieces.black.map((piece, index) => (
              <span
                key={`${piece.id}-${index}`}
                className="text-2xl"
                title={PIECE_NAMES_TH[piece.type]}
              >
                {PIECE_SYMBOLS.black[piece.type]}
              </span>
            ))}
          </div>
        </div>

        {/* Black captured pieces */}
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            ดำจับได้ ({capturedPieces.white.length}):
          </p>
          <div className="flex flex-wrap gap-1 min-h-[40px]">
            {capturedPieces.white.map((piece, index) => (
              <span
                key={`${piece.id}-${index}`}
                className="text-2xl"
                title={PIECE_NAMES_TH[piece.type]}
              >
                {PIECE_SYMBOLS.white[piece.type]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Move History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          ประวัติการเดิน ({moveHistory.length} ตา)
        </h3>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {moveHistory.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              ยังไม่มีการเดินหมาก
            </p>
          ) : (
            moveHistory.map((move, index) => (
              <div
                key={index}
                className="text-sm p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <span className="font-semibold">#{index + 1}</span>{" "}
                {PIECE_SYMBOLS[move.piece.color][move.piece.type]}{" "}
                {String.fromCharCode(97 + move.from.col)}
                {8 - move.from.row} →{" "}
                {String.fromCharCode(97 + move.to.col)}
                {8 - move.to.row}
                {move.capturedPiece && (
                  <span className="text-red-600 dark:text-red-400 ml-2">
                    x{PIECE_SYMBOLS[move.capturedPiece.color][move.capturedPiece.type]}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Game Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          ควบคุมเกม
        </h3>
        <div className="space-y-2">
          {status === "playing" && (
            <>
              <button
                onClick={() => resignGame(currentTurn)}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <Flag className="h-4 w-4 mr-2" />
                ยอมแพ้
              </button>
              <button
                onClick={acceptDraw}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                <Handshake className="h-4 w-4 mr-2" />
                เสนอเสมอ
              </button>
            </>
          )}
          <button
            onClick={resetGame}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            เริ่มเกมใหม่
          </button>
        </div>
      </div>
    </div>
  );
}
