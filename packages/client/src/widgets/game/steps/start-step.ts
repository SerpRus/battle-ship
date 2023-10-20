import createGrid from '../elements/grid'
import text from '../elements/text'
import button from '../elements/button'
import board from '../elements/board'
import React from 'react'
import checkClickElement from '../utils/check-click-element'
import { CELL_SIZE, BOARD_SIZE, SHIPS } from '../utils/constants'
import generateShips from '../utils/generate-ships'

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

  startGameButtonInfo: ButtonInfoType
  isStartGameButtonVisible = false
  randomGenerateShipsButtonInfo: ButtonInfoType

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    setGameStep: React.Dispatch<React.SetStateAction<string>>
  ) {
    this.ctx = ctx
    this.canvas = canvas
    this.setGameStep = setGameStep

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

  render() {
    createGrid(this.ctx)

    text(this.ctx, 'Расстановка кораблей', this.canvas.width / 2 - 100, 50)

    button(
      this.ctx,
      '1. Случайным образом',
      this.randomGenerateShipsButtonInfo.width,
      this.randomGenerateShipsButtonInfo.x,
      this.randomGenerateShipsButtonInfo.y
    )

    board(this.ctx, 80, 120)
  }

  clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const rect = this.canvas.getBoundingClientRect()

    if (!rect) {
      return
    }

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (this.isGameStartButtonClick(x, y) && this.isStartGameButtonVisible) {
      this.setGameStep('game')
    }

    if (this.isRandomGenerateShipsButtonClick(x, y)) {
      console.log('Рандомная генерация')

      generateShips(BOARD_SIZE, SHIPS)

      console.log()

      // button(
      //   this.ctx,
      //   'Играть',
      //   this.startGameButtonInfo.width,
      //   this.startGameButtonInfo.x,
      //   this.startGameButtonInfo.y
      // );
      //
      // this.isStartGameButtonVisible = true;
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
