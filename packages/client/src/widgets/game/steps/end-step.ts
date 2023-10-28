import React from 'react';
import createGrid from '../elements/grid';
import text from '../elements/text';
import board from '../elements/board';
import {
  COMPUTER_BOARD_POSITION,
  PLAYER_BOARD_POSITION,
} from '../utils/constants';
import { BoardType } from '../types';
import ships from '../elements/ships';
import renderBoardShots from '../elements/render-board-shots';

export default class EndStep {
  ctx: CanvasRenderingContext2D;

  canvas: HTMLCanvasElement;

  setGameStep: React.Dispatch<React.SetStateAction<string>>;

  setPlayerBoard: React.Dispatch<React.SetStateAction<BoardType>>;

  setComputerBoard: React.Dispatch<React.SetStateAction<BoardType>>;

  isPlayerWin?: boolean;

  playerBoard: BoardType;

  computerBoard: BoardType;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    setGameStep: React.Dispatch<React.SetStateAction<string>>,
    setPlayerBoard: React.Dispatch<React.SetStateAction<BoardType>>,
    playerBoard: BoardType,
    setComputerBoard: React.Dispatch<React.SetStateAction<BoardType>>,
    computerBoard: BoardType,
    isPlayerWin: boolean
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.setGameStep = setGameStep;
    this.setPlayerBoard = setPlayerBoard;
    this.playerBoard = playerBoard;
    this.setComputerBoard = setComputerBoard;
    this.computerBoard = computerBoard;

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

    renderBoardShots(
      this.ctx,
      PLAYER_BOARD_POSITION,
      this.playerBoard.shots as string[][]
    );
    renderBoardShots(
      this.ctx,
      COMPUTER_BOARD_POSITION,
      this.computerBoard.shots as string[][]
    );
  };

  clickHandler = () => {
    this.setGameStep('end');
  };
}
