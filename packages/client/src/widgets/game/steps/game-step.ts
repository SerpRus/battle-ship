import React from 'react';
import {
  PLAYER_BOARD_POSITION,
  COMPUTER_BOARD_POSITION,
  CELL_SIZE,
  BOARD_SIZE,
} from '../utils/constants';
import { BoardType, GameStepI } from '../types';
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

export default class GameStep implements GameStepI {
  ctx;

  canvas;

  setGameStep;

  setPlayerBoard;

  playerBoard;

  setComputerBoard;

  computerBoard;

  isPlayerWin;

  setIsPlayerWin;

  isPlayersTurn = true;

  hitsToWin = getHitsToWin();

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
  }

  render = async () => {
    createGrid(this.ctx);

    await text(this.ctx, 'Игра', this.canvas.width / 2 - 30, 50);

    await text(
      this.ctx,
      'Игрок',
      this.canvas.width / 4 - 50,
      this.canvas.height - CELL_SIZE
    );

    await text(
      this.ctx,
      'Компьютер',
      this.canvas.width / 1.5,
      this.canvas.height - CELL_SIZE
    );

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
      clickCellPosition.x >= BOARD_SIZE ||
      clickCellPosition.y >= BOARD_SIZE ||
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
      
      isHit = hitCheck(computerShotPosition, this.playerBoard.ships);


      this.playerBoard.shots[computerShotPosition.x][computerShotPosition.y] =
        isHit ? 'HIT' : 'MISS';

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
