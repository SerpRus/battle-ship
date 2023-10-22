import { CELL_SIZE, INC_COLOR } from '../utils/constants'
import text from './text'

const button = async function buttonRender(
  ctx: CanvasRenderingContext2D,
  textButton: string,
  size: number,
  x: number,
  y: number,
  font = '24px Segoeprint'
) {
  ctx.strokeStyle = INC_COLOR

  ctx.strokeRect(x, y - CELL_SIZE, size, CELL_SIZE)
  await text(ctx, textButton, x + 10, y - 12, font)
}

export default button
