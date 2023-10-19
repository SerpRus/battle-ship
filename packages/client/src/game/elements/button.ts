import { CELL_SIZE, INC_COLOR } from '../utils/constants'
import text from './text'

type ButtonType = (
  ctx: CanvasRenderingContext2D,
  text: string,
  size: number,
  x: number,
  y: number,
  font?: string
) => void

const button: ButtonType = async function (
  ctx,
  textButton,
  size,
  x,
  y,
  font = '24px Segoeprint'
) {
  ctx.strokeStyle = INC_COLOR

  ctx.strokeRect(x, y - CELL_SIZE, size, CELL_SIZE)
  text(ctx, textButton, x + 10, y - 12, font)
}

export default button
