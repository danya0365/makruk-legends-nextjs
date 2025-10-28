import { GameView } from "@/src/presentation/components/game/GameView";
import { HudLayout } from "@/src/presentation/components/layout/HudLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เล่นเกม | Makruk Legends",
  description: "เล่นหมากรุกไทยออนไลน์",
};

/**
 * Game page - Play Makruk (Thai Chess)
 * Uses HudLayout for full screen immersive experience
 */
export default function GamePage() {
  return (
    <HudLayout>
      <GameView
        config={{
          timeControl: "10+0",
          mode: "local",
        }}
      />
    </HudLayout>
  );
}
