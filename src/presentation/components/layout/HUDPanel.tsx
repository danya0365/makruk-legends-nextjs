"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface HUDPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  position?: "left" | "right";
  width?: string;
}

export function HUDPanel({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  width = "w-96",
}: HUDPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`
          fixed top-0 ${position === "left" ? "left-0" : "right-0"} 
          h-screen ${width} bg-white dark:bg-gray-800 
          shadow-2xl z-50 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : position === "left" ? "-translate-x-full" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </>
  );
}

interface HUDPanelToggleProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  badge?: string | number;
}

export function HUDPanelToggle({
  icon,
  label,
  onClick,
  isActive = false,
  badge,
}: HUDPanelToggleProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center
        p-3 rounded-xl transition-all duration-200
        ${
          isActive
            ? "bg-blue-600 text-white shadow-lg scale-105"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md hover:shadow-lg"
        }
      `}
      title={label}
    >
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );
}
