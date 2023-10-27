import React from 'react';
import createGrid from '../elements/grid';
import text from '../elements/text';
import board from '../elements/board';
import {
  BOARD_SIZE,
  COMPUTER_BOARD_POSITION,
  PLAYER_BOARD_POSITION,
} from '../utils/constants';
import { ShipsType } from '../types';
import ships from '../elements/ships';

export default class EndStep {
  ctx: CanvasRenderingContext2D;

  canvas: HTMLCanvasElement;

  setGameStep: React.Dispatch<React.SetStateAction<string>>;

  setPlayerShips?: React.Dispatch<React.SetStateAction<ShipsType>>;

  setComputerShips?: React.Dispatch<React.SetStateAction<ShipsType>>;

  isPlayerWin?: boolean;

  playerBoard: {
    ships: ShipsType
    shots: null[][] | string[][]
    hits: number
  } = {
    ships: [],
    shots: [...Array(BOARD_SIZE)].map(() => Array(BOARD_SIZE)),
    hits: 0,
  };

  computerBoard: {
    ships: ShipsType
    shots: null[][] | string[][]
    hits: number
  } = {
    ships: [],
    shots: [...Array(BOARD_SIZE)].map(() => Array(BOARD_SIZE)),
    hits: 0,
  };

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    setGameStep: React.Dispatch<React.SetStateAction<string>>,
    setPlayerShips?: React.Dispatch<React.SetStateAction<ShipsType>>,
    playerShips?: ShipsType,
    setComputerShips?: React.Dispatch<React.SetStateAction<ShipsType>>,
    computerShips?: ShipsType,
    isPlayerWin?: boolean
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.setGameStep = setGameStep;
    this.setPlayerShips = setPlayerShips;
    this.setComputerShips = setComputerShips;

    if (playerShips !== undefined && computerShips !== undefined) {
      this.playerBoard.ships = playerShips;
      this.computerBoard.ships = computerShips;
    }

    if (isPlayerWin !== undefined) {
      this.isPlayerWin = isPlayerWin;
    }
  }

  render = async () => {
    createGrid(this.ctx);

    const textMessage = `Игра окончена, победил ${
      this.isPlayerWin ? 'Игрок' : 'Компьютер'
    }`;
    await text(this.ctx, textMessage, this.canvas.width / 2 - 200, 50);

    board(this.ctx, {
      x: PLAYER_BOARD_POSITION.x,
      y: PLAYER_BOARD_POSITION.y,
    });

    board(this.ctx, {
      x: COMPUTER_BOARD_POSITION.x,
      y: COMPUTER_BOARD_POSITION.y,
    });

    ships(
      this.ctx,
      {
        x: PLAYER_BOARD_POSITION.x,
        y: PLAYER_BOARD_POSITION.y,
      },
      this.playerBoard.ships
    );

    ships(
      this.ctx,
      {
        x: COMPUTER_BOARD_POSITION.x,
        y: COMPUTER_BOARD_POSITION.y,
      },
      this.computerBoard.ships
    );
  }

  clickHandler = () => {
    this.setGameStep('end');
  };
}
