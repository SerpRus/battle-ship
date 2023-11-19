import React from 'react';

export type PositionType = {
  x: number;
  y: number;
};

export type SizeWithPositionType = {
  width: number;
  height: number;
  position: PositionType;
};

export type ShipsType = {
  locations: string[];
  hits: string[];
}[];

export type BoardType = {
  ships: ShipsType;
  shots: null[][] | string[][];
  hits: number;
};

export interface GameStepI {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  setGameStep: React.Dispatch<React.SetStateAction<string>>;
  setPlayerBoard: React.Dispatch<React.SetStateAction<BoardType>>;
  playerBoard: BoardType;
  setComputerBoard: React.Dispatch<React.SetStateAction<BoardType>>;
  computerBoard: BoardType;
  isPlayerWin: boolean;
  setIsPlayerWin: React.Dispatch<React.SetStateAction<boolean>>;
}
