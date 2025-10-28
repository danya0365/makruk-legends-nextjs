"use client";

import { SettingsViewModel } from "@/src/presentation/presenters/settings/SettingsPresenter";
import { useSettingsPresenter } from "@/src/presentation/presenters/settings/useSettingsPresenter";
import { useTheme } from "next-themes";
import { Settings as SettingsIcon, Bell, Lock, User, Globe, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface SettingsViewProps {
  initialViewModel?: SettingsViewModel;
}

export function SettingsView({ initialViewModel }: SettingsViewProps) {
  const [state, actions] = useSettingsPresenter(initialViewModel);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const viewModel = state.viewModel;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!viewModel || !viewModel.user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            กรุณาเข้าสู่ระบบ
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            คุณต้องเข้าสู่ระบบเพื่อเข้าถึงการตั้งค่า
          </p>
        </div>
      </div>
    );
  }

  const { user } = viewModel;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <SettingsIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              การตั้งค่า
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            จัดการการตั้งค่าบัญชีและการแจ้งเตือนของคุณ
          </p>
        </div>

        {/* Success Alert */}
        {state.saveSuccess && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
            <p className="text-sm text-green-800 dark:text-green-300">
              บันทึกการตั้งค่าเรียบร้อยแล้ว
            </p>
          </div>
        )}

        {/* Error Alert */}
        {state.error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-800 dark:text-red-300">
              {state.error}
            </p>
          </div>
        )}

        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <User className="h-6 w-6 mr-2 text-blue-600" />
            ข้อมูลบัญชี
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                value={user.username}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                ชื่อผู้ใช้ไม่สามารถเปลี่ยนได้
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                อีเมล
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ชื่อที่แสดง
              </label>
              <input
                type="text"
                value={user.displayName}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-2 text-blue-600" />
            การแสดงผล
          </h2>

          <div className="space-y-6">
            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ธีม
              </label>
              {mounted && (
                <select
                  value={theme}
                  onChange={(e) => {
                    setTheme(e.target.value);
                    actions.updatePreferences({ theme: e.target.value as "light" | "dark" | "system" });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                >
                  {viewModel.themeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ภาษา
              </label>
              <select
                value={user.preferences.language}
                onChange={(e) =>
                  actions.updatePreferences({ language: e.target.value as "th" | "en" })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              >
                {viewModel.languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Bell className="h-6 w-6 mr-2 text-blue-600" />
            การแจ้งเตือน
          </h2>

          <div className="space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  การแจ้งเตือนทางอีเมล
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  รับการแจ้งเตือนผ่านอีเมล
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.preferences.notifications.email}
                  onChange={(e) =>
                    actions.updatePreferences({
                      notifications: {
                        ...user.preferences.notifications,
                        email: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  การแจ้งเตือนแบบ Push
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  รับการแจ้งเตือนแบบ push บนเบราว์เซอร์
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.preferences.notifications.push}
                  onChange={(e) =>
                    actions.updatePreferences({
                      notifications: {
                        ...user.preferences.notifications,
                        push: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Game Invites */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  คำเชิญเล่นเกม
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  แจ้งเตือนเมื่อมีคนชวนเล่นเกม
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.preferences.notifications.gameInvites}
                  onChange={(e) =>
                    actions.updatePreferences({
                      notifications: {
                        ...user.preferences.notifications,
                        gameInvites: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Tournament Updates */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  อัพเดตทัวร์นาเม้นต์
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  แจ้งเตือนเกี่ยวกับทัวร์นาเม้นต์ที่เข้าร่วม
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.preferences.notifications.tournamentUpdates}
                  onChange={(e) =>
                    actions.updatePreferences({
                      notifications: {
                        ...user.preferences.notifications,
                        tournamentUpdates: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Friend Requests */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  คำขอเป็นเพื่อน
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  แจ้งเตือนเมื่อมีคำขอเป็นเพื่อน
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.preferences.notifications.friendRequests}
                  onChange={(e) =>
                    actions.updatePreferences({
                      notifications: {
                        ...user.preferences.notifications,
                        friendRequests: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Lock className="h-6 w-6 mr-2 text-blue-600" />
            ความปลอดภัย
          </h2>

          <div className="space-y-4">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              เปลี่ยนรหัสผ่าน
            </button>
            <button className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium">
              ตั้งค่าการยืนยันตัวตนแบบ 2 ขั้นตอน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
