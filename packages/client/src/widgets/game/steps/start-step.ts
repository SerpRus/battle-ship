import React from 'react'
import checkClickElement from '../utils/check-click-element'
import {
  BOARD_SIZE,
  CELL_SIZE,
  PLAYER_BOARD_POSITION,
  SHIPS,
} from '../utils/constants'
import generateShipLocations, { ShipsType } from '../utils/generate-ships'
import createGrid from '../elements/grid'
import text from '../elements/text'
import button from '../elements/button'
import board from '../elements/board'

type ButtonInfoType = {
  width: number
  height: number
  x: number
  y: number
}

export default class StartStep {
  ctx: CanvasRenderingContext2D

  canvas: HTMLCanvasElement

  setGameStep: React.Dispatch<React.SetStateAction<string>>

  setPlayerShips?: React.Dispatch<React.SetStateAction<ShipsType>>

  playerShips: ShipsType

  startGameButtonInfo: ButtonInfoType

  isStartGameButtonVisible = false

  randomGenerateShipsButtonInfo: ButtonInfoType

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
      x: canvas.width / 2,
      y: CELL_SIZE * 4,
    }

    this.startGameButtonInfo = {
      width: 120,
      height: canvas.height / 2,
      x: canvas.width / 2,
      y: this.canvas.height - CELL_SIZE,
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
      this.randomGenerateShipsButtonInfo.x,
      this.randomGenerateShipsButtonInfo.y
    )

    board(this.ctx, PLAYER_BOARD_POSITION.x, PLAYER_BOARD_POSITION.y)
  }

  clickHandler = async (e: React.MouseEvent<HTMLElement>) => {
    const rect = this.canvas.getBoundingClientRect()

    if (!rect) {
      return
    }

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (this.isRandomGenerateShipsButtonClick(x, y)) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      await this.render()

      const playerShips = generateShipLocations(BOARD_SIZE, SHIPS)

      if (this.setPlayerShips) {
        this.setPlayerShips(playerShips)
      }

      await button(
        this.ctx,
        'Играть',
        this.startGameButtonInfo.width,
        this.startGameButtonInfo.x,
        this.startGameButtonInfo.y
      )

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
        x: this.startGameButtonInfo.x,
        y: this.startGameButtonInfo.y - CELL_SIZE,
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
        x: this.randomGenerateShipsButtonInfo.x,
        y: this.randomGenerateShipsButtonInfo.y - CELL_SIZE,
      },
      {
        x,
        y,
      }
    )
  }
}
