"use client";

import { useGameStore } from "@/src/presentation/stores/gameStore";
import { Info, History, Settings, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { HUDPanel, HUDPanelToggle } from "../layout/HUDPanel";
import { GameInfoContent } from "./GameInfoContent";
import { GameHistoryContent } from "./GameHistoryContent";

interface GameHUDProps {
  layout?: "standalone" | "embedded";
}

export function GameHUD({ layout = "standalone" }: GameHUDProps) {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const { status, result, moveHistory } = useGameStore();

  const controlsPositionClass = useMemo(
    () => (layout === "standalone" ? "fixed bottom-6 right-6" : "absolute bottom-6 right-6"),
    [layout]
  );

  const togglePanel = (panelName: string) => {
    setActivePanel(activePanel === panelName ? null : panelName);
  };

  return (
    <>
      {/* HUD Controls - Bottom Right */}
      <div className={`${controlsPositionClass} z-30 flex flex-col gap-3`}>
        <HUDPanelToggle
          icon={<Info className="h-6 w-6" />}
          label="ข้อมูล"
          onClick={() => togglePanel("info")}
          isActive={activePanel === "info"}
        />
        <HUDPanelToggle
          icon={<History className="h-6 w-6" />}
          label="ประวัติ"
          onClick={() => togglePanel("history")}
          isActive={activePanel === "history"}
          badge={moveHistory.length > 0 ? moveHistory.length : undefined}
        />
        <HUDPanelToggle
          icon={<Settings className="h-6 w-6" />}
          label="ตั้งค่า"
          onClick={() => togglePanel("settings")}
          isActive={activePanel === "settings"}
        />
      </div>

      {/* Game Result Overlay */}
      {status === "finished" && result && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 border-4 border-yellow-500">
            <div className="text-center">
              <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {result === "white-win" && "ขาวชนะ!"}
                {result === "black-win" && "ดำชนะ!"}
                {result === "draw" && "เสมอกัน!"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {result !== "draw"
                  ? "ยินดีด้วยกับผู้ชนะ! 🎉"
                  : "เกมสิ้นสุดด้วยการเสมอกัน"}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => useGameStore.getState().resetGame()}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  เริ่มเกมใหม่
                </button>
                <button
                  onClick={() => togglePanel("history")}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  ดูประวัติ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Panel */}
      <HUDPanel
        isOpen={activePanel === "info"}
        onClose={() => setActivePanel(null)}
        title="ข้อมูลเกม"
        position="right"
      >
        <GameInfoContent />
      </HUDPanel>

      {/* History Panel */}
      <HUDPanel
        isOpen={activePanel === "history"}
        onClose={() => setActivePanel(null)}
        title="ประวัติการเดิน"
        position="right"
      >
        <GameHistoryContent />
      </HUDPanel>

      {/* Settings Panel */}
      <HUDPanel
        isOpen={activePanel === "settings"}
        onClose={() => setActivePanel(null)}
        title="ตั้งค่าเกม"
        position="right"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              ควบคุมเกม
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  useGameStore.getState().resetGame();
                  setActivePanel(null);
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                เริ่มเกมใหม่
              </button>
              <button
                onClick={() => {
                  useGameStore.getState().resignGame(useGameStore.getState().currentTurn);
                  setActivePanel(null);
                }}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                ยอมแพ้
              </button>
              <button
                onClick={() => {
                  useGameStore.getState().acceptDraw();
                  setActivePanel(null);
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                เสนอเสมอ
              </button>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              คีย์บอร์ด
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>• ESC - ยกเลิกการเลือก</p>
              <p>• R - เริ่มเกมใหม่</p>
              <p>• I - เปิด/ปิดข้อมูล</p>
              <p>• H - เปิด/ปิดประวัติ</p>
            </div>
          </div>
        </div>
      </HUDPanel>
    </>
  );
}
