import React from 'react'
import {
  PLAYER_BOARD_POSITION,
  COMPUTER_BOARD_POSITION,
  CELL_SIZE,
  BOARD_SIZE,
  SHIPS,
} from '../utils/constants'
import { ShipsType } from '../types'
import checkClickElement from '../utils/check-click-element'
import getClickPosition from '../utils/get-click-position'
import getBoardCellPosition from '../utils/get-board-cell-position'
import generateShipLocations from '../utils/generate-ships'
import hitCheck from '../utils/hit-check'
import generateComputerShot from '../utils/generate-computer.shot'
import createGrid from '../elements/grid'
import text from '../elements/text'
import board from '../elements/board'
import ships from '../elements/ships'
import renderShot from '../elements/render-shot'

export default class GameStep {
  ctx

  canvas

  setGameStep

  setPlayerShips

  playerBoard: {
    ships: ShipsType
    shots: null[][] | string[][]
  } = {
    ships: [],
    shots: [...Array(BOARD_SIZE)].map(() => Array(BOARD_SIZE)),
  }

  computerBoard: {
    ships: ShipsType
    shots: null[][] | string[][]
  } = {
    ships: [],
    shots: [...Array(BOARD_SIZE)].map(() => Array(BOARD_SIZE)),
  }

  isPlayersTurn = true

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    setGameStep: React.Dispatch<React.SetStateAction<string>>,
    setPlayerShips: React.Dispatch<React.SetStateAction<ShipsType>>,
    playerShips: ShipsType
  ) {
    this.ctx = ctx
    this.canvas = canvas
    this.setGameStep = setGameStep
    this.setPlayerShips = setPlayerShips
    this.playerBoard.ships = playerShips
  }

  render() {
    createGrid(this.ctx)

    text(this.ctx, 'Игра', this.canvas.width / 2 - 30, 50)

    board(this.ctx, {
      x: PLAYER_BOARD_POSITION.x,
      y: PLAYER_BOARD_POSITION.y,
    })

    board(this.ctx, {
      x: COMPUTER_BOARD_POSITION.x,
      y: COMPUTER_BOARD_POSITION.y,
    })

    if (!this.playerBoard.ships) {
      return
    }

    if (this.setPlayerShips) {
      this.setPlayerShips(this.playerBoard.ships)
    }

    ships(
      this.ctx,
      {
        x: PLAYER_BOARD_POSITION.x,
        y: PLAYER_BOARD_POSITION.y,
      },
      this.playerBoard.ships
    )

    this.computerBoard.ships = generateShipLocations(BOARD_SIZE, SHIPS)

    // ships(
    //   this.ctx,
    //   {
    //     x: COMPUTER_BOARD_POSITION.x,
    //     y: COMPUTER_BOARD_POSITION.y,
    //   },
    //   this.computerBoard.ships
    // )
  }

  clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const { x, y } = getClickPosition(this.canvas, e)

    this.setGameStep('game')

    if (!this.isComputerBoardClick(x, y)) {
      return
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
    )

    if (
      this.computerBoard.shots[clickCellPosition.x][clickCellPosition.y] ||
      !this.isPlayersTurn
    ) {
      return
    }

    const isHit = hitCheck(clickCellPosition, this.computerBoard.ships)

    this.computerBoard.shots[clickCellPosition.x][clickCellPosition.y] = isHit
      ? 'HIT'
      : 'MISS'

    renderShot(this.ctx, COMPUTER_BOARD_POSITION, clickCellPosition, isHit)

    if (isHit) {
      return
    }

    this.isPlayersTurn = false

    this.computerTurn()

    this.isPlayersTurn = true
  }

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
    )
  }

  computerTurn() {
    let isHit

    do {
      let computerShotPosition
      do {
        computerShotPosition = generateComputerShot()
      } while (
        this.computerBoard.shots[computerShotPosition.x][computerShotPosition.y]
      )

      isHit = hitCheck(computerShotPosition, this.playerBoard.ships)

      renderShot(this.ctx, PLAYER_BOARD_POSITION, computerShotPosition, isHit)
    } while (isHit)
  }
}
