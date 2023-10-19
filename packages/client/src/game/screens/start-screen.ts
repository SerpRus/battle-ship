import createGrid from '../elements/grid'
import text from '../elements/text'
import button from '../elements/button'
import board from '../elements/board'
import React from 'react'

export default class StartScreen {
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

    text(this.ctx, 'Расстановка кораблей', 10, 50)
    button(
      this.ctx,
      'Играть',
      120,
      this.canvas.width / 2,
      this.canvas.height - 40
    )

    board(this.ctx, 80, 120)
  }

  clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
    const rect = this.canvas.getBoundingClientRect()

    if (!rect) {
      return
    }

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    console.log(e.target)
    console.log(rect)
    console.log(x, y)
    // console.log(gameStep)
    this.setGameStep('game')

    //     checkClick();
  }
}
