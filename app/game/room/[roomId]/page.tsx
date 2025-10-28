import { RoomGameView } from "@/src/presentation/components/game/RoomGameView";
import { HudLayout } from "@/src/presentation/components/layout/HudLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ห้องเล่นเกม | Makruk Legends",
  description: "เล่นหมากรุกไทยออนไลน์กับเพื่อน",
};

interface RoomPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

/**
 * Room Game page - Players join and play together
 */
export default async function RoomPage({ params }: RoomPageProps) {
  const { roomId } = await params;
  return (
    <HudLayout>
      <RoomGameView roomId={roomId} />
    </HudLayout>
  );
}
