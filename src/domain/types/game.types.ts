/**
 * Makruk Game Types and Interfaces
 * Follows Thai Chess (Makruk) rules
 */

export type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
export type PieceColor = "white" | "black";
export type GameStatus = "waiting" | "playing" | "finished" | "draw";
export type GameResult = "white-win" | "black-win" | "draw" | null;

export interface Position {
  row: number; // 0-7
  col: number; // 0-7
}

export interface Piece {
  id: string;
  type: PieceType;
  color: PieceColor;
  position: Position;
  hasMoved: boolean; // For pawn promotion and king/rook tracking
}

export interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  capturedPiece?: Piece;
  timestamp: Date;
}

export interface GameState {
  board: (Piece | null)[][]; // 8x8 board
  currentTurn: PieceColor;
  whitePlayer: string;
  blackPlayer: string;
  status: GameStatus;
  result: GameResult;
  moveHistory: Move[];
  selectedPiece: Piece | null;
  validMoves: Position[];
  capturedPieces: {
    white: Piece[];
    black: Piece[];
  };
  timer?: {
    white: number; // seconds remaining
    black: number;
  };
}

export interface GameConfig {
  timeControl: string; // e.g., "10+0", "5+3"
  mode: "online" | "ai" | "local";
  difficulty?: "easy" | "medium" | "hard"; // for AI
}

// Piece Unicode symbols for display
export const PIECE_SYMBOLS: Record<PieceColor, Record<PieceType, string>> = {
  white: {
    king: "♔",
    queen: "♕",
    rook: "♖",
    bishop: "♗",
    knight: "♘",
    pawn: "♙",
  },
  black: {
    king: "♚",
    queen: "♛",
    rook: "♜",
    bishop: "♝",
    knight: "♞",
    pawn: "♟",
  },
};

// Thai names for pieces
export const PIECE_NAMES_TH: Record<PieceType, string> = {
  king: "ขุน",
  queen: "เม็ด",
  rook: "เรือ",
  bishop: "โคน",
  knight: "ม้า",
  pawn: "เบี้ย",
};
