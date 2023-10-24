import React from 'react'
import {
  BOARD_SIZE,
  CELL_SIZE,
  PLAYER_BOARD_POSITION,
  SHIPS,
} from '../utils/constants'
import { ShipsType } from '../types'
import checkClickElement from '../utils/check-click-element'
import generateShipLocations from '../utils/generate-ships'
import createGrid from '../elements/grid'
import text from '../elements/text'
import button from '../elements/button'
import board from '../elements/board'
import getClickPosition from '../utils/get-click-position'

export default class StartStep {
  ctx

  canvas

  setGameStep

  setPlayerShips

  playerShips

  startGameButtonInfo

  isStartGameButtonVisible = false

  randomGenerateShipsButtonInfo

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
    this.playerShips = playerShips

    this.randomGenerateShipsButtonInfo = {
      width: 300,
      height: CELL_SIZE,
      position: {
        x: canvas.width / 2,
        y: CELL_SIZE * 4,
      },
    }

    this.startGameButtonInfo = {
      width: 120,
      height: canvas.height / 2,
      position: {
        x: canvas.width / 2,
        y: this.canvas.height - CELL_SIZE,
      },
    }
  }

  render = async () => {
    createGrid(this.ctx)

    await text(
      this.ctx,
      'Расстановка кораблей',
      this.canvas.width / 2 - 100,
      50
    )

    await button(
      this.ctx,
      '1. Случайным образом',
      this.randomGenerateShipsButtonInfo.width,
      {
        x: this.randomGenerateShipsButtonInfo.position.x,
        y: this.randomGenerateShipsButtonInfo.position.y,
      }
    )

    board(this.ctx, {
      x: PLAYER_BOARD_POSITION.x,
      y: PLAYER_BOARD_POSITION.y,
    })
  }

  clickHandler = async (e: React.MouseEvent<HTMLElement>) => {
    const { x, y } = getClickPosition(this.canvas, e)

    if (this.isRandomGenerateShipsButtonClick(x, y)) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      await this.render()

      const playerShips = generateShipLocations(BOARD_SIZE, SHIPS)

      if (this.setPlayerShips) {
        this.setPlayerShips(playerShips)
      }

      await button(this.ctx, 'Играть', this.startGameButtonInfo.width, {
        x: this.startGameButtonInfo.position.x,
        y: this.startGameButtonInfo.position.y,
      })

      this.isStartGameButtonVisible = true
    }

    if (this.isGameStartButtonClick(x, y) && this.playerShips) {
      this.setGameStep('game')
    }
  }

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
    )
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
    )
  }
}
