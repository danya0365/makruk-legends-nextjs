"use client";

import { supabaseClient } from "@/src/infrastructure/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";

interface GameRoom {
  id: string;
  // Host (Player 1) - รองรับทั้ง guest และ logged-in user
  host_id: string; // guest_xxxxx หรือ user UUID
  host_name: string;
  host_user_id: string | null; // NULL ถ้าเป็น guest, UUID ถ้า login
  // Guest (Player 2) - รองรับทั้ง guest และ logged-in user
  guest_id: string | null; // guest_xxxxx หรือ user UUID
  guest_name: string | null;
  guest_user_id: string | null; // NULL ถ้าเป็น guest, UUID ถ้า login
  // Game Settings
  time_control: string;
  is_private: boolean;
  // Game State
  game_state: {
    fen: string;
    turn: "white" | "black";
    moveCount: number;
    check: boolean;
    checkmate: boolean;
    stalemate: boolean;
  };
  // Status & Results
  status: "waiting" | "playing" | "finished" | "cancelled";
  winner: "white" | "black" | "draw" | null;
  // Timestamps
  created_at: string;
  updated_at: string;
}

interface GameMove {
  id: string;
  room_id: string;
  player_id: string;
  player_name: string;
  move_number: number;
  from_square: string;
  to_square: string;
  piece: string;
  captured: string | null;
  promotion: string | null;
  fen: string;
  notation: string;
  time_remaining: {
    white: number;
    black: number;
  };
  created_at: string;
}

interface PlayerPresence {
  id: string;
  name: string;
  color: "white" | "black" | null;
  online_at: string;
}

interface UseRealtimeGameOptions {
  roomId: string;
  playerId: string;
  playerName: string;
}

export function useRealtimeGame({
  roomId,
  playerId,
  playerName,
}: UseRealtimeGameOptions) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [connected, setConnected] = useState(false);
  const [players, setPlayers] = useState<PlayerPresence[]>([]);
  const [gameRoom, setGameRoom] = useState<GameRoom | null>(null);
  const [lastMove, setLastMove] = useState<GameMove | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionKey, setConnectionKey] = useState(0);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Load initial game room data
  const loadGameRoom = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabaseClient
        .from("game_rooms")
        .select("*")
        .eq("id", roomId)
        .single();

      if (fetchError) {
        console.error("Error loading game room:", fetchError);
        setError("ไม่พบห้องเกมนี้");
        return;
      }

      // Map database response to GameRoom interface
      const gameRoomData: GameRoom = {
        id: data.id,
        host_id: data.host_id,
        host_name: data.host_name,
        host_user_id: data.host_user_id,
        guest_id: data.guest_id,
        guest_name: data.guest_name,
        guest_user_id: data.guest_user_id,
        time_control: data.time_control || "10+0",
        is_private: data.is_private ?? false,
        game_state: data.game_state as GameRoom["game_state"],
        status: data.status as GameRoom["status"],
        winner: data.winner as GameRoom["winner"],
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString(),
      };

      setGameRoom(gameRoomData);
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError("เกิดข้อผิดพลาดในการโหลดห้องเกม");
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  // Create or update game room
  const createOrUpdateRoom = useCallback(
    async (roomData: Partial<GameRoom>) => {
      try {
        // Prepare upsert data with new fields
        const upsertData: Record<string, unknown> = {
          id: roomId,
          host_user_id: null, // Default to null for guest
          guest_user_id: null, // Default to null for guest
          ...roomData,
        };

        const { data, error: upsertError } = await supabaseClient
          .from("game_rooms")
          .upsert(upsertData as never)
          .select()
          .single();

        if (upsertError) {
          console.error("Error upserting room:", upsertError);
          return null;
        }

        // Map database response to GameRoom interface
        const gameRoomData: GameRoom = {
          id: data.id,
          host_id: data.host_id,
          host_name: data.host_name,
          host_user_id: data.host_user_id,
          guest_id: data.guest_id,
          guest_name: data.guest_name,
          guest_user_id: data.guest_user_id,
          time_control: data.time_control || "10+0",
          is_private: data.is_private ?? false,
          game_state: data.game_state as GameRoom["game_state"],
          status: data.status as GameRoom["status"],
          winner: data.winner as GameRoom["winner"],
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString(),
        };

        setGameRoom(gameRoomData);
        return gameRoomData;
      } catch (err) {
        console.error("Error:", err);
        return null;
      }
    },
    [roomId]
  );

  // Send move
  const sendMove = useCallback(
    async (move: {
      from: string;
      to: string;
      piece: string;
      captured?: string;
      promotion?: string;
      fen: string;
      notation: string;
    }) => {
      if (!channel || !gameRoom) return;

      try {
        // Get current move count
        const { count } = await supabaseClient
          .from("game_moves")
          .select("*", { count: "exact", head: true })
          .eq("room_id", roomId);

        const moveNumber = (count || 0) + 1;

        // Insert move into database
        const { data: moveData, error: insertError } = await supabaseClient
          .from("game_moves")
          .insert({
            room_id: roomId,
            player_id: playerId,
            player_name: playerName,
            move_number: moveNumber,
            from_square: move.from,
            to_square: move.to,
            piece: move.piece,
            captured: move.captured || null,
            promotion: move.promotion || null,
            fen: move.fen,
            notation: move.notation,
          })
          .select()
          .single();

        if (insertError) {
          console.error("Error inserting move:", insertError);
          return;
        }

        // Map move data to GameMove interface
        const gameMoveData: GameMove = {
          id: moveData.id,
          room_id: moveData.room_id,
          player_id: moveData.player_id,
          player_name: moveData.player_name,
          move_number: moveData.move_number,
          from_square: moveData.from_square,
          to_square: moveData.to_square,
          piece: moveData.piece,
          captured: moveData.captured,
          promotion: moveData.promotion,
          fen: moveData.fen,
          notation: moveData.notation,
          time_remaining: moveData.time_remaining as GameMove["time_remaining"],
          created_at: moveData.created_at || new Date().toISOString(),
        };

        await channel.send({
          type: "broadcast",
          event: "move",
          payload: gameMoveData,
        });

        setLastMove(gameMoveData);
      } catch (err) {
        console.error("Error sending move:", err);
      }
    },
    [channel, gameRoom, roomId, playerId, playerName]
  );

  // Update game state
  const updateGameState = useCallback(
    async (newState: Partial<GameRoom["game_state"]>) => {
      if (!gameRoom) return;

      try {
        const updatedGameState = {
          ...gameRoom.game_state,
          ...newState,
        };

        await supabaseClient
          .from("game_rooms")
          .update({ game_state: updatedGameState })
          .eq("id", roomId);

        setGameRoom((prev) =>
          prev
            ? {
                ...prev,
                game_state: updatedGameState,
              }
            : null
        );
      } catch (err) {
        console.error("Error updating game state:", err);
      }
    },
    [gameRoom, roomId]
  );

  // Join room as guest
  const joinAsGuest = useCallback(
    async (override?: { id: string; name: string }) => {
      if (!gameRoom) {
        return false;
      }

      const guestId = override?.id ?? playerId;
      const guestName = override?.name ?? playerName;

      if (!guestId || !guestName) {
        return false;
      }

      if (gameRoom.guest_id) {
        return gameRoom.guest_id === guestId;
      }

      try {
        const { error: updateError } = await supabaseClient
          .from("game_rooms")
          .update({
            guest_id: guestId,
            guest_name: guestName,
            status: "playing",
            started_at: new Date().toISOString(),
          })
          .eq("id", roomId);

        if (updateError) {
          console.error("Error joining as guest:", updateError);
          return false;
        }

        setGameRoom((prev) =>
          prev
            ? {
                ...prev,
                guest_id: guestId,
                guest_name: guestName,
                status: "playing",
              }
            : prev
        );

        return true;
      } catch (err) {
        console.error("Error joining as guest:", err);
        return false;
      }
    },
    [gameRoom, playerId, playerName, roomId]
  );

  // Setup Realtime channel
  useEffect(() => {
    loadGameRoom();

    // Create channel
    const gameChannel = supabaseClient.channel(`game:${roomId}`, {
      config: {
        broadcast: { self: true },
        presence: { key: playerId },
      },
    });

    // Track presence
    gameChannel
      .on("presence", { event: "sync" }, () => {
        const state = gameChannel.presenceState();
        const presenceList: PlayerPresence[] = Object.values(state)
          .flat()
          .map((p) => ({
            id: (p as unknown as PlayerPresence).id,
            name: (p as unknown as PlayerPresence).name,
            color: (p as unknown as PlayerPresence).color,
            online_at: (p as unknown as PlayerPresence).online_at,
          }));
        setPlayers(presenceList);
      })
      .on("broadcast", { event: "move" }, ({ payload }) => {
        console.log("Move received:", payload);
        setLastMove(payload);
      })
      .on("broadcast", { event: "game-state" }, ({ payload }) => {
        console.log("Game state update:", payload);
        setGameRoom((prev) =>
          prev
            ? {
                ...prev,
                game_state: payload,
              }
            : null
        );
      })
      .subscribe((status) => {
        console.log("Realtime status:", status);
        setConnected(status === "SUBSCRIBED");
      });

    // Track self
    gameChannel.track({
      id: playerId,
      name: playerName,
      color: null,
      online_at: new Date().toISOString(),
    });

    setChannel(gameChannel);
    channelRef.current = gameChannel;

    // Listen to database changes
    const roomSubscription = supabaseClient
      .channel(`room_changes:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_rooms",
          filter: `id=eq.${roomId}`,
        },
        (payload) => {
          console.log("Room change:", payload);
          if (payload.new) {
            const data = payload.new as Record<string, unknown>;
            const gameRoomData: GameRoom = {
              id: data.id as string,
              host_id: data.host_id as string,
              host_name: data.host_name as string,
              host_user_id: (data.host_user_id as string) || null,
              guest_id: (data.guest_id as string) || null,
              guest_name: (data.guest_name as string) || null,
              guest_user_id: (data.guest_user_id as string) || null,
              time_control: (data.time_control as string) || "10+0",
              is_private: (data.is_private as boolean) ?? false,
              game_state: data.game_state as GameRoom["game_state"],
              status: data.status as GameRoom["status"],
              winner: (data.winner as GameRoom["winner"]) || null,
              created_at:
                (data.created_at as string) || new Date().toISOString(),
              updated_at:
                (data.updated_at as string) || new Date().toISOString(),
            };
            setGameRoom(gameRoomData);
          }
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      console.log("Cleaning up realtime channels");
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      gameChannel.unsubscribe();
      roomSubscription.unsubscribe();
      channelRef.current = null;
    };
  }, [roomId, playerId, playerName, loadGameRoom, connectionKey]);

  useEffect(() => {
    if (roomId === "local") {
      return;
    }

    if (connected || loading) {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      return;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectTimeoutRef.current = setTimeout(() => {
      console.log("🔁 Attempting to reconnect to realtime channel...");
      setConnectionKey((prev) => prev + 1);
    }, 3000);

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [connected, loading, roomId]);

  return {
    // State
    connected,
    loading,
    error,
    gameRoom,
    players,
    lastMove,

    // Actions
    sendMove,
    updateGameState,
    createOrUpdateRoom,
    joinAsGuest,
  };
}
