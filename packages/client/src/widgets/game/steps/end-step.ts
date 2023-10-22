import React from 'react'
import createGrid from '../elements/grid'
import text from '../elements/text'
import board from '../elements/board'

export default class EndStep {
  ctx: CanvasRenderingContext2D

  canvas: HTMLCanvasElement

  setGameStep: React.Dispatch<React.SetStateAction<string>>

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    setGameStep: React.Dispatch<React.SetStateAction<string>>
  ) {
    this.ctx = ctx
    this.canvas = canvas
    this.setGameStep = setGameStep
  }

  render() {
    createGrid(this.ctx)

    text(this.ctx, 'Игра окончена', this.canvas.width / 2 - 100, 50)

    board(this.ctx, 80, 120)

    board(this.ctx, 560, 120)
  }

  clickHandler = () => {
    this.setGameStep('end')
  }
}
