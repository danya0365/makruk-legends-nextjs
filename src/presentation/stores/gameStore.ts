"use client";

import { create } from "zustand";
import {
  GameState,
  Piece,
  Position,
  Move,
  PieceColor,
  GameStatus,
  GameResult,
  GameConfig,
} from "@/src/domain/types/game.types";
import {
  initializeBoard,
  getValidMoves,
  makeMove,
  isKingInCheck,
  isCheckmate,
  positionsEqual,
} from "@/src/utils/game-engine";

interface GameActions {
  initializeGame: (config: GameConfig) => void;
  selectPiece: (piece: Piece | null) => void;
  movePiece: (from: Position, to: Position) => void;
  applyOpponentMove: (from: Position, to: Position) => void;
  syncBoardState: (board: (Piece | null)[][], currentTurn: PieceColor) => void;
  resetGame: () => void;
  resignGame: (color: PieceColor) => void;
  offerDraw: () => void;
  acceptDraw: () => void;
}

type GameStore = GameState & GameActions;

const initialState: GameState = {
  board: initializeBoard(),
  currentTurn: "white",
  whitePlayer: "Player 1",
  blackPlayer: "Player 2",
  status: "waiting",
  result: null,
  moveHistory: [],
  selectedPiece: null,
  validMoves: [],
  capturedPieces: {
    white: [],
    black: [],
  },
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  initializeGame: (_config: GameConfig) => {
    set({
      ...initialState,
      board: initializeBoard(),
      status: "playing",
    });
  },

  selectPiece: (piece: Piece | null) => {
    if (!piece) {
      set({ selectedPiece: null, validMoves: [] });
      return;
    }

    const { board, currentTurn, status } = get();

    // Can't select pieces if game is not playing
    if (status !== "playing") {
      return;
    }

    // Can only select own pieces
    if (piece.color !== currentTurn) {
      return;
    }

    const validMoves = getValidMoves(board, piece);

    set({
      selectedPiece: piece,
      validMoves,
    });
  },

  movePiece: (from: Position, to: Position) => {
    const { board, selectedPiece, validMoves, currentTurn, capturedPieces, moveHistory } = get();

    if (!selectedPiece) return;

    // Check if move is valid
    const isValidMove = validMoves.some((move) => positionsEqual(move, to));
    if (!isValidMove) return;

    // Make the move
    const { newBoard, capturedPiece } = makeMove(board, from, to);

    // Update captured pieces
    const newCapturedPieces = { ...capturedPieces };
    if (capturedPiece) {
      if (capturedPiece.color === "white") {
        newCapturedPieces.white.push(capturedPiece);
      } else {
        newCapturedPieces.black.push(capturedPiece);
      }
    }

    // Create move record
    const move: Move = {
      from,
      to,
      piece: selectedPiece,
      capturedPiece: capturedPiece || undefined,
      timestamp: new Date(),
    };

    const newMoveHistory = [...moveHistory, move];

    // Switch turn
    const nextTurn: PieceColor = currentTurn === "white" ? "black" : "white";

    // Check game state
    let newStatus: GameStatus = "playing";
    let newResult: GameResult = null;

    if (isCheckmate(newBoard, nextTurn)) {
      newStatus = "finished";
      newResult = currentTurn === "white" ? "white-win" : "black-win";
    } else if (isKingInCheck(newBoard, nextTurn)) {
      // King is in check but not checkmate - continue playing
      console.log(`${nextTurn} king is in check!`);
    }

    set({
      board: newBoard,
      currentTurn: nextTurn,
      selectedPiece: null,
      validMoves: [],
      capturedPieces: newCapturedPieces,
      moveHistory: newMoveHistory,
      status: newStatus,
      result: newResult,
    });
  },

  applyOpponentMove: (from: Position, to: Position) => {
    const { board, capturedPieces, moveHistory } = get();

    // Get the piece at 'from' position
    const movingPiece = board[from.row][from.col];
    if (!movingPiece) return;

    // Make the move (opponent's move)
    const { newBoard, capturedPiece } = makeMove(board, from, to);

    // Update captured pieces
    const newCapturedPieces = { ...capturedPieces };
    if (capturedPiece) {
      if (capturedPiece.color === "white") {
        newCapturedPieces.white.push(capturedPiece);
      } else {
        newCapturedPieces.black.push(capturedPiece);
      }
    }

    // Create move record
    const move: Move = {
      from,
      to,
      piece: movingPiece,
      capturedPiece: capturedPiece || undefined,
      timestamp: new Date(),
    };

    const newMoveHistory = [...moveHistory, move];

    // Switch turn back to us
    const nextTurn: PieceColor = movingPiece.color === "white" ? "black" : "white";

    // Check game state
    let newStatus: GameStatus = "playing";
    let newResult: GameResult = null;

    if (isCheckmate(newBoard, nextTurn)) {
      newStatus = "finished";
      newResult = movingPiece.color === "white" ? "white-win" : "black-win";
    } else if (isKingInCheck(newBoard, nextTurn)) {
      console.log(`${nextTurn} king is in check!`);
    }

    set({
      board: newBoard,
      currentTurn: nextTurn,
      selectedPiece: null,
      validMoves: [],
      capturedPieces: newCapturedPieces,
      moveHistory: newMoveHistory,
      status: newStatus,
      result: newResult,
    });
  },

  syncBoardState: (board: (Piece | null)[][], currentTurn: PieceColor) => {
    set({
      board,
      currentTurn,
      status: "playing",
      selectedPiece: null,
      validMoves: [],
    });
  },

  resetGame: () => {
    set({
      ...initialState,
      board: initializeBoard(),
      status: "playing",
    });
  },

  resignGame: (color: PieceColor) => {
    set({
      status: "finished",
      result: color === "white" ? "black-win" : "white-win",
    });
  },

  offerDraw: () => {
    // In real implementation, this would send a draw offer to opponent
    console.log("Draw offered");
  },

  acceptDraw: () => {
    set({
      status: "draw",
      result: "draw",
    });
  },
}));

// Selectors
export const selectBoard = (state: GameStore) => state.board;
export const selectCurrentTurn = (state: GameStore) => state.currentTurn;
export const selectSelectedPiece = (state: GameStore) => state.selectedPiece;
export const selectValidMoves = (state: GameStore) => state.validMoves;
export const selectGameStatus = (state: GameStore) => state.status;
export const selectGameResult = (state: GameStore) => state.result;
export const selectMoveHistory = (state: GameStore) => state.moveHistory;
export const selectCapturedPieces = (state: GameStore) => state.capturedPieces;
