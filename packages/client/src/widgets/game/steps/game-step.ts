import React from 'react';
import {
  PLAYER_BOARD_POSITION,
  COMPUTER_BOARD_POSITION,
  CELL_SIZE,
  BOARD_SIZE,
} from '../utils/constants';
import { ShipsType } from '../types';
import checkClickElement from '../utils/check-click-element';
import getClickPosition from '../utils/get-click-position';
import getBoardCellPosition from '../utils/get-board-cell-position';
import hitCheck from '../utils/hit-check';
import generateComputerShot from '../utils/generate-computer.shot';
import getHitsToWin from '../utils/get-hits-to-win';
import createGrid from '../elements/grid';
import text from '../elements/text';
import board from '../elements/board';
import ships from '../elements/ships';
import renderShot from '../elements/render-shot';

export default class GameStep {
  ctx;

  canvas;

  setGameStep;

  setPlayerShips;

  setComputerShips;

  playerBoard: {
    ships: ShipsType;
    shots: null[][] | string[][];
    hits: number;
  } = {
    ships: [],
    shots: [...Array(BOARD_SIZE)].map(() => Array(BOARD_SIZE)),
    hits: 0,
  };

  computerBoard: {
    ships: ShipsType;
    shots: null[][] | string[][];
    hits: number;
  } = {
    ships: [],
    shots: [...Array(BOARD_SIZE)].map(() => Array(BOARD_SIZE)),
    hits: 0,
  };

  setIsPlayerWin?: React.Dispatch<React.SetStateAction<boolean>>;

  isPlayersTurn = true;

  hitsToWin = getHitsToWin();

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    setGameStep: React.Dispatch<React.SetStateAction<string>>,
    setPlayerShips: React.Dispatch<React.SetStateAction<ShipsType>>,
    playerShips: ShipsType,
    setComputerShips?: React.Dispatch<React.SetStateAction<ShipsType>>,
    computerShips?: ShipsType,
    isPlayerWin?: boolean,
    setIsPlayerWin?: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.setGameStep = setGameStep;
    this.setPlayerShips = setPlayerShips;
    this.playerBoard.ships = playerShips;
    this.setComputerShips = setComputerShips;

    if (setIsPlayerWin !== undefined) {
      this.setIsPlayerWin = setIsPlayerWin;
    }

    if (computerShips !== undefined) {
      this.computerBoard.ships = computerShips;
    }
  }

  render = async () => {
    createGrid(this.ctx);

    await text(this.ctx, 'Игра', this.canvas.width / 2 - 30, 50);

    board(this.ctx, {
      x: PLAYER_BOARD_POSITION.x,
      y: PLAYER_BOARD_POSITION.y,
    });

    board(this.ctx, {
      x: COMPUTER_BOARD_POSITION.x,
      y: COMPUTER_BOARD_POSITION.y,
    });

    if (!this.playerBoard.ships) {
      return;
    }

    ships(
      this.ctx,
      {
        x: PLAYER_BOARD_POSITION.x,
        y: PLAYER_BOARD_POSITION.y,
      },
      this.playerBoard.ships
    );
  };

  clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const { x, y } = getClickPosition(this.canvas, e);

    this.setGameStep('game');

    if (!this.isComputerBoardClick(x, y)) {
      return;
    }

    const clickCellPosition = getBoardCellPosition(
      {
        x: COMPUTER_BOARD_POSITION.x,
        y: COMPUTER_BOARD_POSITION.y,
      },
      {
        x,
        y,
      }
    );

    if (
      this.computerBoard.shots[clickCellPosition.x][clickCellPosition.y] ||
      !this.isPlayersTurn
    ) {
      return;
    }

    const isHit = hitCheck(clickCellPosition, this.computerBoard.ships);

    this.computerBoard.shots[clickCellPosition.x][clickCellPosition.y] = isHit
      ? 'HIT'
      : 'MISS';

    renderShot(this.ctx, COMPUTER_BOARD_POSITION, clickCellPosition, isHit);

    if (isHit) {
      this.playerBoard.hits += 1;

      if (this.playerBoard.hits === this.hitsToWin) {
        this.gameOver(true);
      }

      return;
    }

    this.isPlayersTurn = false;

    this.computerTurn();

    this.isPlayersTurn = true;
  };

  isComputerBoardClick(x: number, y: number) {
    return checkClickElement(
      {
        width: BOARD_SIZE * CELL_SIZE,
        height: BOARD_SIZE * CELL_SIZE,
        position: {
          x: COMPUTER_BOARD_POSITION.x,
          y: COMPUTER_BOARD_POSITION.y,
        },
      },
      {
        x,
        y,
      }
    );
  }

  computerTurn() {
    let isHit;

    do {
      let computerShotPosition;
      do {
        computerShotPosition = generateComputerShot();
      } while (
        this.playerBoard.shots[computerShotPosition.x][computerShotPosition.y]
      );

      this.playerBoard.shots[computerShotPosition.x][computerShotPosition.y] =
        isHit ? 'HIT' : 'MISS';

      isHit = hitCheck(computerShotPosition, this.playerBoard.ships);

      renderShot(this.ctx, PLAYER_BOARD_POSITION, computerShotPosition, isHit);

      if (isHit) {
        this.computerBoard.hits += 1;

        if (this.computerBoard.hits === this.hitsToWin) {
          this.gameOver(false);

          return;
        }
      }
    } while (isHit);
  }

  gameOver(isPlayerWin: boolean) {
    if (this.setIsPlayerWin) {
      this.setIsPlayerWin(isPlayerWin);
    }

    this.setGameStep('end');
  }
}
