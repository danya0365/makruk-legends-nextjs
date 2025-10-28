"use client";

import { useGameStore } from "@/src/presentation/stores/gameStore";
import { PIECE_SYMBOLS } from "@/src/domain/types/game.types";
import { Clock, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";

export function GameHistoryContent() {
  const { moveHistory } = useGameStore();

  const exportHistory = () => {
    const historyText = moveHistory
      .map((move, index) => {
        const from = `${String.fromCharCode(97 + move.from.col)}${8 - move.from.row}`;
        const to = `${String.fromCharCode(97 + move.to.col)}${8 - move.to.row}`;
        const piece = PIECE_SYMBOLS[move.piece.color][move.piece.type];
        const capture = move.capturedPiece ? "x" : "-";
        return `${index + 1}. ${piece} ${from}${capture}${to}`;
      })
      .join("\n");

    const blob = new Blob([historyText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `makruk-game-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <span className="font-semibold text-gray-900 dark:text-white">
            ประวัติการเดิน ({moveHistory.length} ตา)
          </span>
        </div>
        {moveHistory.length > 0 && (
          <button
            onClick={exportHistory}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="ดาวน์โหลดประวัติ"
          >
            <Download className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>

      {/* Move List */}
      <div className="space-y-2">
        {moveHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">♟️</div>
            <p className="text-gray-500 dark:text-gray-400">
              ยังไม่มีการเดินหมาก
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              เริ่มเล่นเพื่อบันทึกประวัติ
            </p>
          </div>
        ) : (
          <>
            {moveHistory.map((move, index) => {
              const from = `${String.fromCharCode(97 + move.from.col)}${8 - move.from.row}`;
              const to = `${String.fromCharCode(97 + move.to.col)}${8 - move.to.row}`;
              const isWhiteMove = move.piece.color === "white";

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    isWhiteMove
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900 dark:text-white">
                        #{index + 1}
                      </span>
                      <span className="text-2xl">
                        {PIECE_SYMBOLS[move.piece.color][move.piece.type]}
                      </span>
                      <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                        {from} → {to}
                      </span>
                    </div>
                    {move.capturedPiece && (
                      <span className="text-xl" title="จับได้">
                        {PIECE_SYMBOLS[move.capturedPiece.color][move.capturedPiece.type]}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(move.timestamp, {
                      addSuffix: true,
                      locale: th,
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Summary */}
      {moveHistory.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            สรุป
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400">ตาทั้งหมด</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {moveHistory.length}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">หมากที่จับ</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {moveHistory.filter((m) => m.capturedPiece).length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
