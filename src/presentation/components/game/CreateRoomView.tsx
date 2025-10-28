"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Clock, ArrowRight, Sparkles } from "lucide-react";

export function CreateRoomView() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [timeControl, setTimeControl] = useState("10+0");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Generate unique room ID
  const generateRoomId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let roomId = "";
    for (let i = 0; i < 6; i++) {
      roomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return roomId;
  };

  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      alert("กรุณาใส่ชื่อของคุณ");
      return;
    }

    setIsCreating(true);

    // Simulate room creation
    setTimeout(() => {
      const roomId = generateRoomId();
      
      // Store player info in localStorage
      localStorage.setItem(`room_${roomId}_host`, JSON.stringify({
        name: playerName,
        timeControl,
        isPrivate,
        createdAt: new Date().toISOString(),
      }));

      // Navigate to room
      router.push(`/game/room/${roomId}`);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-20">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🏠</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                สร้างห้องเล่น
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                สร้างห้องและเชิญเพื่อนมาเล่นด้วยกัน
              </p>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← กลับ
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center pt-16">
        <div className="w-full max-w-2xl mx-4">
          {/* Main Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="h-8 w-8" />
                <h2 className="text-3xl font-bold">สร้างห้องใหม่</h2>
              </div>
              <p className="text-blue-100">
                กรอกข้อมูลและสร้างห้องเพื่อเล่นกับเพื่อน
              </p>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={20}
                />
              </div>

              {/* Time Control */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  ระยะเวลา
                </label>
                <select
                  value={timeControl}
                  onChange={(e) => setTimeControl(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="3+0">⚡ Blitz - 3 นาที</option>
                  <option value="5+0">⚡ Blitz - 5 นาที</option>
                  <option value="10+0">🏃 Rapid - 10 นาที</option>
                  <option value="15+0">🏃 Rapid - 15 นาที</option>
                  <option value="30+0">🎯 Classical - 30 นาที</option>
                  <option value="unlimited">♾️ ไม่จำกัดเวลา</option>
                </select>
              </div>

              {/* Privacy */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ห้องส่วนตัว
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    เฉพาะคนที่มีลิงค์เท่านั้นที่เข้าได้
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Create Button */}
              <button
                onClick={handleCreateRoom}
                disabled={isCreating || !playerName.trim()}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>กำลังสร้างห้อง...</span>
                  </>
                ) : (
                  <>
                    <span>สร้างห้องเลย</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {/* Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-900 dark:text-blue-300">
                  💡 <strong>เคล็ดลับ:</strong> หลังจากสร้างห้อง คุณจะได้ลิงค์เพื่อแชร์ให้เพื่อน
                  เพื่อนของคุณสามารถคลิกลิงค์และเข้ามาเล่นได้ทันที!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
