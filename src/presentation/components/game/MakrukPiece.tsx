"use client";

import { Piece, PIECE_SYMBOLS } from "@/src/domain/types/game.types";

interface MakrukPieceProps {
  piece: Piece;
  onClick?: () => void;
  isSelected?: boolean;
  isDraggable?: boolean;
}

export function MakrukPiece({
  piece,
  onClick,
  isSelected = false,
  isDraggable = true,
}: MakrukPieceProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-center w-full h-full text-5xl cursor-pointer
        select-none transition-all duration-200
        ${isSelected ? "scale-110 drop-shadow-lg" : "hover:scale-105"}
        ${isDraggable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}
      `}
      draggable={isDraggable}
    >
      <span className={`
        ${piece.color === "white" ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" : "text-gray-900"}
      `}>
        {PIECE_SYMBOLS[piece.color][piece.type]}
      </span>
    </div>
  );
}
