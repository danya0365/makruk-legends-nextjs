"use client";

import { useRealtimeGame } from "@/src/presentation/hooks/useRealtimeGame";
import { cn } from "@/src/utils/cn";
import {
  AlertCircle,
  Check,
  Copy,
  Crown,
  Link as LinkIcon,
  Users,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GameView } from "./GameView";

interface RoomGameViewProps {
  roomId: string;
}

export function RoomGameView({ roomId }: RoomGameViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [showJoinForm, setShowJoinForm] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [myColor, setMyColor] = useState<"white" | "black" | null>(null);
  const [role, setRole] = useState<"host" | "guest" | "spectator" | null>(null);
  const [spectatorMessage, setSpectatorMessage] = useState<string | null>(null);

  // Check if user is host from URL params
  useEffect(() => {
    const isHostParam = searchParams.get("host") === "true";
    const hostId = searchParams.get("hostId");
    const hostName = searchParams.get("hostName");
    const timeControl = searchParams.get("timeControl");

    if (isHostParam && hostId && hostName) {
      const decodedHostName = decodeURIComponent(hostName);
      setIsHost(true);
      setPlayerId(hostId);
      setPlayerName(decodedHostName);
      setMyColor("white"); // Host เล่นขาว
      setRole("host");
      setSpectatorMessage(null);

      // Auto-join if host
      setShowJoinForm(false);

      // Store player info
      localStorage.setItem(
        `room_${roomId}_player`,
        JSON.stringify({
          id: hostId,
          name: decodedHostName,
          isHost: true,
          role: "host",
          color: "white",
          timeControl,
        })
      );
    } else {
      // Try to load from localStorage
      const stored = localStorage.getItem(`room_${roomId}_player`);
      if (stored) {
        try {
          const data = JSON.parse(stored) as {
            id?: string;
            name?: string;
            isHost?: boolean;
            role?: "host" | "guest" | "spectator";
            color?: "white" | "black";
          };

          if (data?.name) {
            if (data.id) {
              setPlayerId(data.id);
            }
            setPlayerName(data.name);
            setIsHost(Boolean(data.isHost));

            const storedRole: "host" | "guest" | "spectator" =
              data.role ?? (data.isHost ? "host" : "guest");
            setRole(storedRole);

            if (storedRole === "host") {
              setMyColor("white");
              setSpectatorMessage(null);
              setShowJoinForm(false);
            } else if (storedRole === "guest") {
              setMyColor(data.color ?? "black");
              setSpectatorMessage(null);
              setShowJoinForm(false);
            } else if (storedRole === "spectator") {
              setMyColor(null);
              setSpectatorMessage(
                "ผู้เล่นทั้งสองฝั่งกำลังเล่นอยู่ คุณสามารถรับชมเกมได้แบบเรียลไทม์"
              );
              setShowJoinForm(false);
            }
          }
        } catch (error) {
          console.warn("Failed to parse stored player info", error);
          localStorage.removeItem(`room_${roomId}_player`);
        }
      }
    }
  }, [roomId, searchParams]);

  // Initialize Realtime (use stable IDs to prevent re-initialization)
  const stablePlayerId = playerId || "temp_guest";
  const stablePlayerName =
    playerId && role !== "spectator" ? playerName : "Guest";

  const {
    connected,
    loading: realtimeLoading,
    error: realtimeError,
    gameRoom,
    players,
    joinAsGuest,
  } = useRealtimeGame({
    roomId,
    playerId: stablePlayerId,
    playerName: stablePlayerName,
  });

  // Update role when room data changes (e.g., refresh or new guest joins)
  useEffect(() => {
    if (!gameRoom) {
      return;
    }

    if (gameRoom.host_id === playerId) {
      setRole("host");
      setSpectatorMessage(null);
      return;
    }

    if (gameRoom.guest_id === playerId) {
      setRole("guest");
      setSpectatorMessage(null);
      return;
    }

    if (gameRoom.guest_id) {
      setRole("spectator");
      setSpectatorMessage(
        "ผู้เล่นทั้งสองฝั่งกำลังเล่นอยู่ คุณสามารถรับชมเกมได้แบบเรียลไทม์"
      );
      setMyColor(null);
      return;
    }
  }, [gameRoom, playerId]);

  const roomUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/game/room/${roomId}`
      : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinRoom = async () => {
    if (!playerName.trim()) {
      alert("กรุณาใส่ชื่อของคุณ");
      return;
    }

    try {
      const guestId = `guest_${Date.now()}`;

      // Guest ALWAYS plays as BLACK
      const playerColor: "white" | "black" = "black";

      // Guest joins the room
      const joined = await joinAsGuest({ id: guestId, name: playerName });

      if (!joined) {
        const spectatorId = `spectator_${Date.now()}`;
        setRole("spectator");
        setPlayerId(spectatorId);
        setMyColor(null);
        setSpectatorMessage(
          "ผู้เล่นทั้งสองฝั่งถูกจับจองแล้ว คุณกำลังชมเป็นผู้สังเกตการณ์"
        );
        localStorage.setItem(
          `room_${roomId}_player`,
          JSON.stringify({
            id: spectatorId,
            name: playerName,
            role: "spectator",
            isHost: false,
          })
        );
        setShowJoinForm(false);
        return;
      }

      setPlayerId(guestId);
      setMyColor(playerColor);
      setIsHost(false);
      setRole("guest");
      setSpectatorMessage(null);

      // Store player info
      localStorage.setItem(
        `room_${roomId}_player`,
        JSON.stringify({
          id: guestId,
          name: playerName,
          isHost: false,
          role: "guest",
          color: playerColor,
          joinedAt: new Date().toISOString(),
        })
      );

      console.log(`✅ Guest joined as BLACK: ${playerName} (${guestId})`);
      setShowJoinForm(false);
    } catch (error) {
      console.error("Error joining room:", error);
      alert("เกิดข้อผิดพลาดในการเข้าร่วมห้อง");
    }
  };

  // If already in game, show game view
  if (!showJoinForm) {
    const isSpectator = role === "spectator";
    const effectivePlayerId = isSpectator ? "spectator" : playerId;
    const effectivePlayerName = isSpectator
      ? playerName || "Spectator"
      : playerName;
    const effectiveColor = isSpectator ? null : myColor;

    return (
      <>
        {/* Room Info Bar */}
        <div className="fixed top-16 left-0 right-0 h-12 bg-blue-600 text-white z-30 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="text-sm font-semibold">ห้อง: {roomId}</span>
            </div>
            {isHost && (
              <span className="text-xs px-2 py-1 bg-yellow-500 text-yellow-900 rounded-full font-bold">
                <Crown className="h-3 w-3 inline mr-1" />
                Host
              </span>
            )}
          </div>
          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>คัดลอกแล้ว!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>แชร์ลิงค์</span>
              </>
            )}
          </button>
        </div>

        {/* Connection Status */}
        {!connected && (
          <div className="absolute top-28 right-6 px-4 py-2 bg-yellow-500 text-yellow-900 rounded-lg shadow-lg text-sm font-medium animate-pulse">
            ⚠️ กำลังเชื่อมต่อ...
          </div>
        )}

        {/* Players Info */}
        <div className="absolute top-28 left-6 space-y-2 z-40">
          {/* Players Count */}
          <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="font-semibold">
                {Math.min(players.length, 2)}/2 ผู้เล่น
                {players.length > 2 && ` • ผู้ชม ${players.length - 2}`}
              </span>
            </div>
          </div>

          {/* Match Info - ALWAYS SHOW */}
          <div className="px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-sm space-y-2">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">⚪ ขาว:</span>
              <span className="font-medium">
                {gameRoom?.host_name || "Host"}
              </span>
              {isHost && <Crown className="h-3 w-3 text-yellow-500" />}
            </div>
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">⚫ ดำ:</span>
              <span className="font-medium">
                {players.length > 1
                  ? players.find((p) => p.id !== gameRoom?.host_id)?.name ||
                    playerName
                  : !isHost && !isSpectator
                  ? playerName
                  : "รอผู้เล่น..."}
              </span>
              {!isHost && !isSpectator && (
                <span className="text-xs">(คุณ)</span>
              )}
              {isSpectator && (
                <span className="text-xs text-blue-500">(ผู้ชม)</span>
              )}
            </div>
            <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                {isSpectator
                  ? "คุณกำลังชมเกม (เดินหมากไม่ได้)"
                  : isHost
                  ? "คุณเล่นเป็น: ⚪ ขาว (เดินก่อน)"
                  : "คุณเล่นเป็น: ⚫ ดำ (เดินทีสอง)"}
              </span>
            </div>
          </div>
          {spectatorMessage && (
            <div className="px-4 py-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg shadow-lg text-xs text-yellow-800 dark:text-yellow-200">
              👀 {spectatorMessage}
            </div>
          )}
        </div>

        {/* Game View with offset */}
        <div
          className={cn(
            "fixed inset-0 pt-12",
            isSpectator
              ? "cursor-not-allowed pointer-events-none"
              : "cursor-pointer pointer-events-auto"
          )}
        >
          <GameView
            roomId={roomId}
            playerId={effectivePlayerId}
            playerName={effectivePlayerName}
            myColor={effectiveColor}
            config={{
              timeControl: gameRoom?.time_control || "10+0",
              mode: "online",
            }}
          />
        </div>
      </>
    );
  }

  // Show join form
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-20">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🎮</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                เข้าร่วมห้อง {roomId}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                เล่นหมากรุกไทยกับเพื่อน
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/play")}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← กลับหน้าหลัก
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center pt-16">
        <div className="w-full max-w-2xl mx-4">
          {realtimeLoading ? (
            /* Loading Room */
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                กำลังโหลดห้องเกม...
              </p>
            </div>
          ) : realtimeError || !gameRoom ? (
            /* Room Not Found */
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                ไม่พบห้องนี้
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                ห้องหมายเลข {roomId} อาจถูกปิดไปแล้ว หรือลิงค์ไม่ถูกต้อง
              </p>
              <button
                onClick={() => router.push("/play")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                กลับหน้าหลัก
              </button>
            </div>
          ) : (
            /* Join Form */
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="h-8 w-8" />
                  <h2 className="text-3xl font-bold">เข้าร่วมห้อง</h2>
                </div>
                <p className="text-green-100">
                  ห้องของ <strong>{gameRoom.host_name}</strong>
                </p>
              </div>

              {/* Form */}
              <div className="p-8 space-y-6">
                {/* Room Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      รหัสห้อง
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {roomId}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      ระยะเวลา
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {gameRoom.time_control === "unlimited"
                        ? "♾️ ไม่จำกัด"
                        : `⏱️ ${gameRoom.time_control}`}
                    </p>
                  </div>
                </div>

                {/* Player Name */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    ชื่อของคุณ
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="ใส่ชื่อของคุณ..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    maxLength={20}
                    onKeyPress={(e) => e.key === "Enter" && handleJoinRoom()}
                  />
                </div>

                {/* Share Link */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                        ลิงค์ห้อง
                      </span>
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>คัดลอกแล้ว</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>คัดลอก</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-300 font-mono break-all">
                    {roomUrl}
                  </p>
                </div>

                {/* Join Button */}
                <button
                  onClick={handleJoinRoom}
                  disabled={!playerName.trim()}
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  เข้าร่วมห้อง
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
