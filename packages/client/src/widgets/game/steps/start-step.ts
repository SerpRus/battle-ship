import React from 'react';
import {
  BOARD_SIZE,
  CELL_SIZE,
  PLAYER_BOARD_POSITION,
  SHIPS,
} from '../utils/constants';
import { ShipsType, BoardType, GameStepI } from '../types';
import checkClickElement from '../utils/check-click-element';
import generateShipLocations from '../utils/generate-ships';
import createGrid from '../elements/grid';
import text from '../elements/text';
import button from '../elements/button';
import board from '../elements/board';
import getClickPosition from '../utils/get-click-position';
import ships from '../elements/ships';

export default class StartStep implements GameStepI {
  ctx;

  canvas;

  setGameStep;

  setPlayerBoard;

  playerShips: ShipsType = [];

  playerBoard;

  startGameButtonInfo;

  isStartGameButtonVisible = false;

  randomGenerateShipsButtonInfo;

  setComputerBoard;

  computerBoard;

  isPlayerWin;

  setIsPlayerWin;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    setGameStep: React.Dispatch<React.SetStateAction<string>>,
    setPlayerBoard: React.Dispatch<React.SetStateAction<BoardType>>,
    playerBoard: BoardType,
    setComputerBoard: React.Dispatch<React.SetStateAction<BoardType>>,
    computerBoard: BoardType,
    isPlayerWin: boolean,
    setIsPlayerWin: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.setGameStep = setGameStep;
    this.setPlayerBoard = setPlayerBoard;
    this.playerBoard = playerBoard;
    this.setComputerBoard = setComputerBoard;
    this.computerBoard = computerBoard;
    this.isPlayerWin = isPlayerWin;
    this.setIsPlayerWin = setIsPlayerWin;

    this.randomGenerateShipsButtonInfo = {
      width: 300,
      height: CELL_SIZE,
      position: {
        x: canvas.width / 2,
        y: CELL_SIZE * 4,
      },
    };

    this.startGameButtonInfo = {
      width: 120,
      height: canvas.height / 2,
      position: {
        x: canvas.width / 2,
        y: this.canvas.height - CELL_SIZE,
      },
    };
  }

  render = async () => {
    createGrid(this.ctx);

    await text(
      this.ctx,
      'Расстановка кораблей',
      this.canvas.width / 2 - 100,
      50
    );

    await text(
      this.ctx,
      'Игрок',
      this.canvas.width / 4 - 50,
      this.canvas.height - CELL_SIZE
    );

    await button(
      this.ctx,
      '1. Случайным образом',
      this.randomGenerateShipsButtonInfo.width,
      {
        x: this.randomGenerateShipsButtonInfo.position.x,
        y: this.randomGenerateShipsButtonInfo.position.y,
      }
    );

    board(this.ctx, {
      x: PLAYER_BOARD_POSITION.x,
      y: PLAYER_BOARD_POSITION.y,
    });
  };

  clickHandler = async (e: React.MouseEvent<HTMLElement>) => {
    const { x, y } = getClickPosition(this.canvas, e);

    if (this.isRandomGenerateShipsButtonClick(x, y)) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      await this.render();

      this.playerShips = generateShipLocations(BOARD_SIZE, SHIPS);

      ships(
        this.ctx,
        {
          x: PLAYER_BOARD_POSITION.x,
          y: PLAYER_BOARD_POSITION.y,
        },
        this.playerShips
      );

      await button(this.ctx, 'Играть', this.startGameButtonInfo.width, {
        x: this.startGameButtonInfo.position.x,
        y: this.startGameButtonInfo.position.y,
      });

      this.isStartGameButtonVisible = true;
    }

    if (this.isGameStartButtonClick(x, y) && this.playerShips) {
      this.setPlayerBoard({
        ...this.playerBoard,
        ships: this.playerShips,
      });

      const computerShips = generateShipLocations(BOARD_SIZE, SHIPS);

      this.setComputerBoard({
        ...this.computerBoard,
        ships: computerShips,
      });

      this.setGameStep('game');
    }
  };

  isGameStartButtonClick(x: number, y: number) {
    return checkClickElement(
      {
        width: this.startGameButtonInfo.width,
        height: CELL_SIZE,
        position: {
          x: this.startGameButtonInfo.position.x,
          y: this.startGameButtonInfo.position.y - CELL_SIZE,
        },
      },
      {
        x,
        y,
      }
    );
  }

  isRandomGenerateShipsButtonClick(x: number, y: number) {
    return checkClickElement(
      {
        width: this.randomGenerateShipsButtonInfo.width,
        height: CELL_SIZE,
        position: {
          x: this.randomGenerateShipsButtonInfo.position.x,
          y: this.randomGenerateShipsButtonInfo.position.y - CELL_SIZE,
        },
      },
      {
        x,
        y,
      }
    );
  }
}
