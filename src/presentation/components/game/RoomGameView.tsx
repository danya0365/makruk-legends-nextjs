"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Users, Link as LinkIcon, Crown, AlertCircle } from "lucide-react";
import { GameView } from "./GameView";

interface RoomGameViewProps {
  roomId: string;
}

export function RoomGameView({ roomId }: RoomGameViewProps) {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [showJoinForm, setShowJoinForm] = useState(true);
  const [roomInfo, setRoomInfo] = useState<{
    name: string;
    timeControl: string;
    isPrivate: boolean;
    createdAt: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    // Load room info from localStorage
    const hostInfo = localStorage.getItem(`room_${roomId}_host`);
    
    if (hostInfo) {
      setRoomInfo(JSON.parse(hostInfo));
    }
  }, [roomId]);

  const roomUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/game/room/${roomId}`
    : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      alert("กรุณาใส่ชื่อของคุณ");
      return;
    }

    // Check if user is host
    const hostInfo = localStorage.getItem(`room_${roomId}_host`);
    if (hostInfo) {
      const host = JSON.parse(hostInfo);
      if (host.name === playerName) {
        setIsHost(true);
      }
    }

    // Store player info
    localStorage.setItem(`room_${roomId}_player`, JSON.stringify({
      name: playerName,
      joinedAt: new Date().toISOString(),
    }));

    setShowJoinForm(false);
  };

  // If already in game, show game view
  if (!showJoinForm) {
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

        {/* Game View with offset */}
        <div className="pt-12">
          <GameView
            config={{
              timeControl: roomInfo?.timeControl || "10+0",
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
          {!roomInfo ? (
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
                  ห้องของ <strong>{roomInfo.name}</strong>
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
                      {roomInfo.timeControl === "unlimited" ? "♾️ ไม่จำกัด" : `⏱️ ${roomInfo.timeControl}`}
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
