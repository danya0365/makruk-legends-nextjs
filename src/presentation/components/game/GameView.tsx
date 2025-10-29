"use client";

import { GameConfig } from "@/src/domain/types/game.types";
import { supabaseClient } from "@/src/infrastructure/supabase/client";
import { useRealtimeGame } from "@/src/presentation/hooks/useRealtimeGame";
import { useGameStore } from "@/src/presentation/stores/gameStore";
import { cn } from "@/src/utils/cn";
import { Crown, Users, Wifi, WifiOff } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { GameHUD } from "./GameHUD";
import { MakrukBoard } from "./MakrukBoard";

interface GameViewProps {
  roomId?: string;
  playerId?: string;
  playerName?: string;
  myColor?: "white" | "black" | null;
  config?: GameConfig;
  /**
   * เลือก layout ของ GameView
   * - standalone: ใช้เต็มหน้าจอพร้อม top bar ภายในตัวเอง
   * - embedded: ใช้เป็นส่วนหนึ่งของหน้าจออื่น (เช่น RoomGameView)
   */
  layout?: "standalone" | "embedded";
  /** ซ่อน/แสดง top bar ด้านบน */
  showTopBar?: boolean;
  /** ซ่อน/แสดง quick tips มุมล่างซ้าย */
  showQuickTips?: boolean;
  /** กำหนด className เพิ่มเติมให้ container หลัก */
  className?: string;
}

export function GameView({
  roomId,
  playerId,
  playerName,
  myColor,
  config,
  layout = "standalone",
  showTopBar = true,
  showQuickTips = true,
  className,
}: GameViewProps) {
  const { initializeGame, currentTurn, status, applyOpponentMove } =
    useGameStore();

  // Track our own moves to prevent double-apply
  const ourLastMoveRef = useRef<string | null>(null);
  const isRestoringRef = useRef(false);
  const restoredMoveCountRef = useRef<number>(0); // Track how many moves we restored

  // Use realtime hook only for multiplayer (when roomId exists)
  const isMultiplayer = !!roomId && !!playerId && !!playerName;
  const isSpectator = myColor === null;

  // Always call hook (React rule) but use dummy values for local play
  const {
    connected,
    loading,
    error,
    gameRoom,
    players,
    lastMove,
    sendMove,
    updateGameState,
  } = useRealtimeGame({
    roomId: roomId || "local",
    playerId: playerId || "local",
    playerName: playerName || "Local Player",
  });

  // Initialize game on mount (only once)
  useEffect(() => {
    if (config) {
      initializeGame(config);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync game state from database when room loads (refresh handling)
  useEffect(() => {
    let isMounted = true;

    const restoreBoardFromDatabase = async () => {
      if (!gameRoom?.game_state || !isMultiplayer || !roomId) return;
      if (isRestoringRef.current) return; // Already restoring

      const dbMoveCount = gameRoom.game_state.moveCount || 0;

      // Skip if we already restored this number of moves
      if (restoredMoveCountRef.current === dbMoveCount) {
        return;
      }

      // If there are moves in DB, restore board by replaying moves
      if (dbMoveCount > 0) {
        isRestoringRef.current = true;
        console.log(`🔄 Restoring board state... (${dbMoveCount} moves)`);

        try {
          // Load all moves from database
          const { data: moves, error: loadError } = await supabaseClient
            .from("game_moves")
            .select("*")
            .eq("room_id", roomId)
            .order("move_number", { ascending: true });

          if (loadError) {
            console.error("Failed to load moves:", loadError);
            isRestoringRef.current = false;
            return;
          }

          if (!isMounted) return;

          if (moves && moves.length > 0) {
            console.log(
              `✅ Loaded ${moves.length} moves. Replaying instantly...`
            );

            // Reset board to initial state first
            initializeGame(config || { timeControl: "10+0", mode: "online" });

            // Replay ALL moves instantly (no delay!)
            for (const move of moves) {
              if (!isMounted) break;

              const from = {
                row: parseInt(move.from_square.charAt(0)),
                col: parseInt(move.from_square.charAt(1)),
              };
              const to = {
                row: parseInt(move.to_square.charAt(0)),
                col: parseInt(move.to_square.charAt(1)),
              };

              // Apply move instantly
              applyOpponentMove(from, to);
            }

            // Mark how many moves we restored
            restoredMoveCountRef.current = moves.length;
            console.log(`✅ Board restored in ${moves.length} moves!`);
          }
        } catch (error) {
          console.error("Failed to restore board:", error);
        } finally {
          isRestoringRef.current = false;
        }
      }
    };

    restoreBoardFromDatabase();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameRoom?.game_state?.moveCount, isMultiplayer, roomId]);

  // Handle incoming moves from opponent
  useEffect(() => {
    if (!lastMove || !isMultiplayer || isRestoringRef.current) return;

    const moveKey = `${lastMove.player_id}-${lastMove.move_number}`;

    // Skip if this is OUR own move coming back from realtime
    if (lastMove.player_id === playerId) {
      console.log("⏭️ Skipping our own move (already applied locally)");
      ourLastMoveRef.current = moveKey;
      return;
    }

    // Skip if we already processed this move
    if (ourLastMoveRef.current === moveKey) {
      return;
    }

    console.log("📥 Received opponent's move:", lastMove);

    // Apply opponent's move to our board
    const from = {
      row: parseInt(lastMove.from_square.charAt(0)),
      col: parseInt(lastMove.from_square.charAt(1)),
    };
    const to = {
      row: parseInt(lastMove.to_square.charAt(0)),
      col: parseInt(lastMove.to_square.charAt(1)),
    };

    applyOpponentMove(from, to);
    ourLastMoveRef.current = moveKey;
  }, [lastMove, isMultiplayer, playerId, applyOpponentMove]);

  // Callback to send move after player moves
  const handlePlayerMove = useCallback(
    async (
      from: { row: number; col: number },
      to: { row: number; col: number },
      piece: { type: string; color: string }
    ) => {
      if (!isMultiplayer || !sendMove || !updateGameState) return;

      const fromSquare = `${from.row}${from.col}`;
      const toSquare = `${to.row}${to.col}`;

      console.log("📤 Sending our move:", fromSquare, "->", toSquare);

      // Send move to opponent via realtime (non-blocking)
      sendMove({
        from: fromSquare,
        to: toSquare,
        piece: piece.type,
        notation: `${piece.type} ${fromSquare} -> ${toSquare}`,
        fen: "", // TODO: Generate FEN from board
      });

      // Update game_state in database (non-blocking)
      const nextTurn = piece.color === "white" ? "black" : "white";
      updateGameState({
        turn: nextTurn,
        moveCount: (gameRoom?.game_state.moveCount || 0) + 1,
        fen: "", // TODO: Generate FEN
      });
    },
    [isMultiplayer, sendMove, updateGameState, gameRoom]
  );

  // Show error if connection failed
  if (error) {
    console.error("Realtime error:", error);
  }

  const containerClass = cn(
    "flex flex-col w-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden",
    layout === "standalone" ? "absolute inset-0" : "relative h-full min-h-full",
    className
  );

  const topBarClass = cn(
    "left-0 right-0 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-20",
    layout === "standalone" ? "absolute top-0" : "relative w-full"
  );

  const boardWrapperClass = cn(
    "flex flex-1 items-center justify-center",
    layout === "standalone" && showTopBar ? "pt-16 pb-4" : "py-4"
  );
  return (
    <div className={containerClass}>
      {showTopBar && (
        <div className={topBarClass}>
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

            {/* Status & Realtime Info */}
            <div className="flex items-center space-x-6">
              {/* Connection Status - Only show for multiplayer */}
              {isMultiplayer && (
                <div className="flex items-center space-x-2">
                  {connected ? (
                    <>
                      <Wifi className="h-4 w-4 text-green-500" />
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">
                        เชื่อมต่อแล้ว
                      </span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-4 w-4 text-red-500" />
                      <span className="text-xs font-medium text-red-600 dark:text-red-400">
                        {loading ? "กำลังเชื่อมต่อ..." : "ไม่ได้เชื่อมต่อ"}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Players Count - Only show for multiplayer */}
              {isMultiplayer && (
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {players.length}/2 ผู้เล่น
                  </span>
                </div>
              )}

              {/* Game Status */}
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  ตาของ:
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
                  {currentTurn === "white" ? "⚪" : "⚫"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Board - Centered */}
      <div className={boardWrapperClass}>
        <div
          className={cn(
            "flex items-center justify-center",
            isSpectator
              ? "cursor-not-allowed pointer-events-none"
              : "cursor-pointer pointer-events-auto"
          )}
        >
          <MakrukBoard
            onMove={isMultiplayer ? handlePlayerMove : undefined}
            myColor={myColor}
          />
        </div>
      </div>

      {/* HUD Controls */}
      <GameHUD />

      {/* Quick Instructions - Bottom Left */}
      {showQuickTips && (
        <div
          className={cn(
            "z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs",
            layout === "standalone"
              ? "fixed bottom-6 left-6"
              : "absolute bottom-6 left-6"
          )}
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
            💡 คำแนะนำ
          </h3>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>• คลิกหมากเพื่อเลือก</p>
            <p>• ช่องเขียว = เดินได้</p>
            <p>• คลิกไอคอนด้านขวาเพื่อดูข้อมูล</p>
          </div>
        </div>
      )}
    </div>
  );
}
