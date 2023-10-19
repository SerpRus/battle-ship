import createGrid from '../elements/grid'
import text from '../elements/text'
import board from '../elements/board'

export default class EndScreen {
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx
    this.canvas = canvas
  }

  render() {
    createGrid(this.ctx)

    text(this.ctx, 'Игра окончена', 10, 50)

    board(this.ctx, 80, 120)

    board(this.ctx, 560, 120)
  }

  clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
    console.log('EndScreen')
  }
}
