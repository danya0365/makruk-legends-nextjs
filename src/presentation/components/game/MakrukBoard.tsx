"use client";

import { useGameStore } from "@/src/presentation/stores/gameStore";
import { MakrukPiece } from "./MakrukPiece";
import { Position } from "@/src/domain/types/game.types";
import { positionsEqual } from "@/src/utils/game-engine";

export function MakrukBoard() {
  const {
    board,
    selectedPiece,
    validMoves,
    currentTurn,
    selectPiece,
    movePiece,
  } = useGameStore();

  const handleSquareClick = (row: number, col: number) => {
    const piece = board[row][col];
    const clickedPosition: Position = { row, col };

    if (selectedPiece) {
      // If a piece is selected, try to move it
      const isValidMove = validMoves.some((move) =>
        positionsEqual(move, clickedPosition)
      );

      if (isValidMove) {
        movePiece(selectedPiece.position, clickedPosition);
      } else if (piece && piece.color === currentTurn) {
        // Select different piece of same color
        selectPiece(piece);
      } else {
        // Deselect
        selectPiece(null);
      }
    } else if (piece && piece.color === currentTurn) {
      // Select piece
      selectPiece(piece);
    }
  };

  const isSquareSelected = (row: number, col: number): boolean => {
    if (!selectedPiece) return false;
    return positionsEqual(selectedPiece.position, { row, col });
  };

  const isValidMoveSquare = (row: number, col: number): boolean => {
    return validMoves.some((move) => positionsEqual(move, { row, col }));
  };

  const getSquareColor = (row: number, col: number): string => {
    const isLight = (row + col) % 2 === 0;
    
    if (isSquareSelected(row, col)) {
      return "bg-yellow-400 dark:bg-yellow-600";
    }
    
    if (isValidMoveSquare(row, col)) {
      return isLight
        ? "bg-green-300 dark:bg-green-700"
        : "bg-green-400 dark:bg-green-800";
    }
    
    return isLight
      ? "bg-amber-100 dark:bg-amber-200"
      : "bg-amber-700 dark:bg-amber-800";
  };

  return (
    <div className="inline-block bg-gray-800 p-4 rounded-xl shadow-2xl">
      {/* Column labels (a-h) */}
      <div className="flex mb-2">
        <div className="w-12" /> {/* Offset for row labels */}
        {["a", "b", "c", "d", "e", "f", "g", "h"].map((label) => (
          <div
            key={label}
            className="w-16 h-6 flex items-center justify-center text-sm font-semibold text-gray-300"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Row labels (8-1) */}
        <div className="flex flex-col mr-2">
          {[8, 7, 6, 5, 4, 3, 2, 1].map((label) => (
            <div
              key={label}
              className="w-6 h-16 flex items-center justify-center text-sm font-semibold text-gray-300"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Board */}
        <div className="grid grid-cols-8 gap-0 border-4 border-gray-900 rounded-lg overflow-hidden">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
                className={`
                  w-16 h-16 relative cursor-pointer transition-colors duration-150
                  ${getSquareColor(rowIndex, colIndex)}
                `}
              >
                {piece && (
                  <MakrukPiece
                    piece={piece}
                    isSelected={isSquareSelected(rowIndex, colIndex)}
                  />
                )}
                
                {/* Valid move indicator */}
                {isValidMoveSquare(rowIndex, colIndex) && !piece && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-green-600 dark:bg-green-500 opacity-60" />
                  </div>
                )}
                
                {/* Capture indicator */}
                {isValidMoveSquare(rowIndex, colIndex) && piece && (
                  <div className="absolute inset-0 border-4 border-red-500 rounded-lg pointer-events-none" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
