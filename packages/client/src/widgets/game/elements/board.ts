import { INC_COLOR, CELL_SIZE } from '../utils/constants'
import text from './text'

type BoardType = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size?: number
) => void

const board: BoardType = function (ctx, x, y, size = 10) {
  ctx.strokeStyle = INC_COLOR

  ctx.strokeRect(x, y, CELL_SIZE * size, CELL_SIZE * size)

  const LETTER_START_CODE = 1040

  for (let i = 0; i < size; i++) {
    text(ctx, String(i + 1), x + i * CELL_SIZE + 10, y - 10)
    text(
      ctx,
      String.fromCharCode(LETTER_START_CODE + i),
      x - 30,
      y + i * CELL_SIZE + 30
    )
  }
}

export default board
