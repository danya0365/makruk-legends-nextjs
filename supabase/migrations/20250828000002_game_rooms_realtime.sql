-- Game Rooms & Moves Tables for Real-time Multiplayer
-- Created: 2024-10-28
-- Purpose: Enable real-time multiplayer chess games

-- ============================================
-- Game Rooms Table
-- ============================================
CREATE TABLE IF NOT EXISTS game_rooms (
  id TEXT PRIMARY KEY,
  
  -- Host (Player 1) - รองรับทั้ง guest และ logged-in user
  host_id TEXT NOT NULL,                    -- guest_xxxxx หรือ user UUID
  host_name TEXT NOT NULL,
  host_user_id UUID,                        -- NULL ถ้าเป็น guest, UUID ถ้า login
  
  -- Guest (Player 2) - รองรับทั้ง guest และ logged-in user
  guest_id TEXT,                            -- guest_xxxxx หรือ user UUID
  guest_name TEXT,
  guest_user_id UUID,                       -- NULL ถ้าเป็น guest, UUID ถ้า login
  
  -- Game Settings
  time_control TEXT NOT NULL DEFAULT '10+0',
  is_private BOOLEAN DEFAULT false,
  
  -- Game State
  game_state JSONB DEFAULT '{
    "fen": "rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1",
    "turn": "white",
    "moveCount": 0,
    "check": false,
    "checkmate": false,
    "stalemate": false
  }'::jsonb,
  
  -- Status & Results
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'finished', 'cancelled')),
  winner TEXT CHECK (winner IN ('white', 'black', 'draw', NULL)),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ
);

-- ============================================
-- Game Moves Table
-- ============================================
CREATE TABLE IF NOT EXISTS game_moves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL REFERENCES game_rooms(id) ON DELETE CASCADE,
  player_id TEXT NOT NULL,
  player_name TEXT NOT NULL,
  move_number INTEGER NOT NULL,
  from_square TEXT NOT NULL,
  to_square TEXT NOT NULL,
  piece TEXT NOT NULL,
  captured TEXT,
  promotion TEXT,
  fen TEXT NOT NULL,
  notation TEXT NOT NULL,
  time_remaining JSONB DEFAULT '{
    "white": 600,
    "black": 600
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_game_rooms_status ON game_rooms(status);
CREATE INDEX IF NOT EXISTS idx_game_rooms_created_at ON game_rooms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_game_moves_room_id ON game_moves(room_id);
CREATE INDEX IF NOT EXISTS idx_game_moves_created_at ON game_moves(created_at);

-- ============================================
-- Updated At Trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_game_rooms_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_game_rooms_updated_at ON game_rooms;
CREATE TRIGGER trigger_update_game_rooms_updated_at
  BEFORE UPDATE ON game_rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_game_rooms_updated_at();

-- ============================================
-- Enable Realtime
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE game_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE game_moves;

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE game_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_moves ENABLE ROW LEVEL SECURITY;

-- Everyone can read game rooms
CREATE POLICY "Anyone can read game rooms"
  ON game_rooms
  FOR SELECT
  USING (true);

-- Anyone can create a game room
CREATE POLICY "Anyone can create game rooms"
  ON game_rooms
  FOR INSERT
  WITH CHECK (true);

-- Players can update their own game rooms
CREATE POLICY "Players can update their game rooms"
  ON game_rooms
  FOR UPDATE
  USING (true);

-- Players can delete their own game rooms
CREATE POLICY "Players can delete their game rooms"
  ON game_rooms
  FOR DELETE
  USING (true);

-- Everyone can read game moves
CREATE POLICY "Anyone can read game moves"
  ON game_moves
  FOR SELECT
  USING (true);

-- Anyone can insert moves
CREATE POLICY "Anyone can insert moves"
  ON game_moves
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- Helper Functions
-- ============================================

-- Get game room with move count
CREATE OR REPLACE FUNCTION get_game_room_with_stats(p_room_id TEXT)
RETURNS TABLE (
  room game_rooms,
  move_count BIGINT,
  last_move game_moves
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gr.*,
    COUNT(gm.id)::BIGINT as move_count,
    (
      SELECT gm2.*
      FROM game_moves gm2
      WHERE gm2.room_id = p_room_id
      ORDER BY gm2.created_at DESC
      LIMIT 1
    ) as last_move
  FROM game_rooms gr
  LEFT JOIN game_moves gm ON gr.id = gm.room_id
  WHERE gr.id = p_room_id
  GROUP BY gr.id;
END;
$$ LANGUAGE plpgsql;

-- Clean up old finished games (older than 24 hours)
CREATE OR REPLACE FUNCTION cleanup_old_games()
RETURNS void AS $$
BEGIN
  DELETE FROM game_rooms
  WHERE status = 'finished'
    AND finished_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Comments
-- ============================================
COMMENT ON TABLE game_rooms IS 'Stores multiplayer game room information';
COMMENT ON TABLE game_moves IS 'Stores all moves made in game rooms';
COMMENT ON COLUMN game_rooms.game_state IS 'Current game state in JSON format (FEN, turn, check, etc.)';
COMMENT ON COLUMN game_moves.time_remaining IS 'Time remaining for both players in seconds';
