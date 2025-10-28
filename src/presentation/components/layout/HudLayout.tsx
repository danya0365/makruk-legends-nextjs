"use client";

import { ReactNode } from "react";

interface HudLayoutProps {
  children: ReactNode;
}

/**
 * HudLayout - Full screen layout for game/immersive experiences
 * No header, no footer, no navigation - just pure content with HUD
 */
export function HudLayout({ children }: HudLayoutProps) {
  return <div className="min-h-screen w-full overflow-hidden">{children}</div>;
}
