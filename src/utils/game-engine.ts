/**
 * Makruk Game Engine
 * Implements Thai Chess (Makruk) rules and logic
 */

import {
  Piece,
  Position,
  PieceColor,
  PieceType,
  Move,
  GameState,
} from "@/src/domain/types/game.types";

/**
 * Initialize a new Makruk board with standard starting position
 */
export function initializeBoard(): (Piece | null)[][] {
  const board: (Piece | null)[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  // Black pieces (row 0 and 1)
  const blackPieces: PieceType[] = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
  blackPieces.forEach((type, col) => {
    board[0][col] = {
      id: `black-${type}-${col}`,
      type,
      color: "black",
      position: { row: 0, col },
      hasMoved: false,
    };
  });

  // Black pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = {
      id: `black-pawn-${col}`,
      type: "pawn",
      color: "black",
      position: { row: 1, col },
      hasMoved: false,
    };
  }

  // White pawns
  for (let col = 0; col < 8; col++) {
    board[6][col] = {
      id: `white-pawn-${col}`,
      type: "pawn",
      color: "white",
      position: { row: 6, col },
      hasMoved: false,
    };
  }

  // White pieces (row 7)
  const whitePieces: PieceType[] = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
  whitePieces.forEach((type, col) => {
    board[7][col] = {
      id: `white-${type}-${col}`,
      type,
      color: "white",
      position: { row: 7, col },
      hasMoved: false,
    };
  });

  return board;
}

/**
 * Check if a position is within board bounds
 */
export function isValidPosition(pos: Position): boolean {
  return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
}

/**
 * Check if two positions are equal
 */
export function positionsEqual(pos1: Position, pos2: Position): boolean {
  return pos1.row === pos2.row && pos1.col === pos2.col;
}

/**
 * Get piece at position
 */
export function getPieceAt(board: (Piece | null)[][], pos: Position): Piece | null {
  if (!isValidPosition(pos)) return null;
  return board[pos.row][pos.col];
}

/**
 * Check if a square is occupied by opponent's piece
 */
export function isOpponentPiece(
  board: (Piece | null)[][],
  pos: Position,
  color: PieceColor
): boolean {
  const piece = getPieceAt(board, pos);
  return piece !== null && piece.color !== color;
}

/**
 * Check if a square is occupied by own piece
 */
export function isOwnPiece(
  board: (Piece | null)[][],
  pos: Position,
  color: PieceColor
): boolean {
  const piece = getPieceAt(board, pos);
  return piece !== null && piece.color === color;
}

/**
 * Get all valid moves for a piece
 */
export function getValidMoves(
  board: (Piece | null)[][],
  piece: Piece
): Position[] {
  const moves: Position[] = [];

  switch (piece.type) {
    case "pawn":
      moves.push(...getPawnMoves(board, piece));
      break;
    case "knight":
      moves.push(...getKnightMoves(board, piece));
      break;
    case "bishop":
      moves.push(...getBishopMoves(board, piece));
      break;
    case "rook":
      moves.push(...getRookMoves(board, piece));
      break;
    case "queen":
      moves.push(...getQueenMoves(board, piece));
      break;
    case "king":
      moves.push(...getKingMoves(board, piece));
      break;
  }

  return moves;
}

/**
 * Get valid pawn moves (Makruk rules: pawns move forward 1 square, capture diagonally)
 */
function getPawnMoves(board: (Piece | null)[][], piece: Piece): Position[] {
  const moves: Position[] = [];
  const direction = piece.color === "white" ? -1 : 1;
  const { row, col } = piece.position;

  // Forward move
  const forward = { row: row + direction, col };
  if (isValidPosition(forward) && !getPieceAt(board, forward)) {
    moves.push(forward);
  }

  // Capture diagonally
  const captureLeft = { row: row + direction, col: col - 1 };
  const captureRight = { row: row + direction, col: col + 1 };

  if (isValidPosition(captureLeft) && isOpponentPiece(board, captureLeft, piece.color)) {
    moves.push(captureLeft);
  }

  if (isValidPosition(captureRight) && isOpponentPiece(board, captureRight, piece.color)) {
    moves.push(captureRight);
  }

  return moves;
}

/**
 * Get valid knight moves (L-shape)
 */
function getKnightMoves(board: (Piece | null)[][], piece: Piece): Position[] {
  const moves: Position[] = [];
  const { row, col } = piece.position;

  const knightMoves = [
    { row: row - 2, col: col - 1 },
    { row: row - 2, col: col + 1 },
    { row: row - 1, col: col - 2 },
    { row: row - 1, col: col + 2 },
    { row: row + 1, col: col - 2 },
    { row: row + 1, col: col + 2 },
    { row: row + 2, col: col - 1 },
    { row: row + 2, col: col + 1 },
  ];

  knightMoves.forEach((move) => {
    if (isValidPosition(move) && !isOwnPiece(board, move, piece.color)) {
      moves.push(move);
    }
  });

  return moves;
}

/**
 * Get valid bishop moves (Makruk: moves 1 square diagonally)
 */
function getBishopMoves(board: (Piece | null)[][], piece: Piece): Position[] {
  const moves: Position[] = [];
  const { row, col } = piece.position;

  const directions = [
    { row: -1, col: -1 },
    { row: -1, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 1 },
  ];

  directions.forEach(({ row: dr, col: dc }) => {
    const newPos = { row: row + dr, col: col + dc };
    if (isValidPosition(newPos) && !isOwnPiece(board, newPos, piece.color)) {
      moves.push(newPos);
    }
  });

  return moves;
}

/**
 * Get valid rook moves (straight lines)
 */
function getRookMoves(board: (Piece | null)[][], piece: Piece): Position[] {
  const moves: Position[] = [];
  const { row, col } = piece.position;

  const directions = [
    { row: -1, col: 0 }, // up
    { row: 1, col: 0 }, // down
    { row: 0, col: -1 }, // left
    { row: 0, col: 1 }, // right
  ];

  directions.forEach(({ row: dr, col: dc }) => {
    let newRow = row + dr;
    let newCol = col + dc;

    while (isValidPosition({ row: newRow, col: newCol })) {
      const targetPiece = getPieceAt(board, { row: newRow, col: newCol });

      if (!targetPiece) {
        moves.push({ row: newRow, col: newCol });
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }

      newRow += dr;
      newCol += dc;
    }
  });

  return moves;
}

/**
 * Get valid queen moves (Makruk: moves 1 square diagonally like bishop)
 */
function getQueenMoves(board: (Piece | null)[][], piece: Piece): Position[] {
  // In Makruk, Queen (Met) moves like a weak bishop - only 1 square diagonally
  return getBishopMoves(board, piece);
}

/**
 * Get valid king moves (1 square in any direction)
 */
function getKingMoves(board: (Piece | null)[][], piece: Piece): Position[] {
  const moves: Position[] = [];
  const { row, col } = piece.position;

  const directions = [
    { row: -1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
  ];

  directions.forEach(({ row: dr, col: dc }) => {
    const newPos = { row: row + dr, col: col + dc };
    if (isValidPosition(newPos) && !isOwnPiece(board, newPos, piece.color)) {
      moves.push(newPos);
    }
  });

  return moves;
}

/**
 * Make a move on the board
 */
export function makeMove(
  board: (Piece | null)[][],
  from: Position,
  to: Position
): {
  newBoard: (Piece | null)[][];
  capturedPiece: Piece | null;
} {
  const newBoard = board.map((row) => [...row]);
  const piece = getPieceAt(newBoard, from);
  const capturedPiece = getPieceAt(newBoard, to);

  if (!piece) {
    return { newBoard, capturedPiece: null };
  }

  // Move piece
  newBoard[to.row][to.col] = {
    ...piece,
    position: to,
    hasMoved: true,
  };
  newBoard[from.row][from.col] = null;

  return { newBoard, capturedPiece };
}

/**
 * Check if the king is in check
 */
export function isKingInCheck(
  board: (Piece | null)[][],
  color: PieceColor
): boolean {
  // Find king position
  let kingPos: Position | null = null;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === "king" && piece.color === color) {
        kingPos = { row, col };
        break;
      }
    }
    if (kingPos) break;
  }

  if (!kingPos) return false;

  // Check if any opponent piece can attack the king
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color !== color) {
        const validMoves = getValidMoves(board, piece);
        if (validMoves.some((move) => positionsEqual(move, kingPos!))) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Check if the game is checkmate
 */
export function isCheckmate(
  board: (Piece | null)[][],
  color: PieceColor
): boolean {
  if (!isKingInCheck(board, color)) return false;

  // Check if any move can get out of check
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const validMoves = getValidMoves(board, piece);

        for (const move of validMoves) {
          const { newBoard } = makeMove(board, piece.position, move);
          if (!isKingInCheck(newBoard, color)) {
            return false; // Found a move that gets out of check
          }
        }
      }
    }
  }

  return true; // No moves can get out of check
}
