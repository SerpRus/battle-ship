import React from 'react';
import createGrid from '../elements/grid';
import text from '../elements/text';
import board from '../elements/board';
import {
  PLAYER_BOARD_POSITION,
  COMPUTER_BOARD_POSITION,
  CELL_SIZE,
  BOARD_SIZE,
} from '../utils/constants';
import { ShipsType } from '../utils/generate-ships';
import ships from '../elements/ships';
import checkClickElement from '../utils/check-click-element';
import getClickPosition from '../utils/get-click-position';

export default class GameStep {
  ctx: CanvasRenderingContext2D;

  canvas: HTMLCanvasElement;

  setGameStep: React.Dispatch<React.SetStateAction<string>>;

  setPlayerShips?: React.Dispatch<React.SetStateAction<ShipsType>>;

  playerShips?: ShipsType;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    setGameStep: React.Dispatch<React.SetStateAction<string>>,
    setPlayerShips: React.Dispatch<React.SetStateAction<ShipsType>>,
    playerShips: ShipsType
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.setGameStep = setGameStep;
    this.setPlayerShips = setPlayerShips;
    this.playerShips = playerShips;
  }

  render() {
    createGrid(this.ctx);

    text(this.ctx, 'Игра', this.canvas.width / 2 - 30, 50);

    board(this.ctx, PLAYER_BOARD_POSITION.x, PLAYER_BOARD_POSITION.y);

    board(this.ctx, COMPUTER_BOARD_POSITION.x, COMPUTER_BOARD_POSITION.y);

    if (!this.playerShips) {
      return;
    }

    ships(
      this.ctx,
      {
        x: PLAYER_BOARD_POSITION.x,
        y: PLAYER_BOARD_POSITION.y,
      },
      this.playerShips
    );
  }

  clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const { x, y } = getClickPosition(this.canvas, e);

    this.setGameStep('game');

    this.isComputerBoardClick(x, y);
  };

  isComputerBoardClick(x: number, y: number) {
    return checkClickElement(
      {
        width: BOARD_SIZE * CELL_SIZE,
        height: BOARD_SIZE * CELL_SIZE,
        x: COMPUTER_BOARD_POSITION.x,
        y: COMPUTER_BOARD_POSITION.y,
      },
      {
        x,
        y,
      }
    );
  }
}
