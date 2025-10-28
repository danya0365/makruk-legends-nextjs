import { CreateRoomView } from "@/src/presentation/components/game/CreateRoomView";
import { HudLayout } from "@/src/presentation/components/layout/HudLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สร้างห้องเล่น | Makruk Legends",
  description: "สร้างห้องเล่นและเชิญเพื่อนเข้ามาเล่นด้วยกัน",
};

/**
 * Create Room page - Guest can create a room and share link
 */
export default function CreateRoomPage() {
  return (
    <HudLayout>
      <CreateRoomView />
    </HudLayout>
  );
}
