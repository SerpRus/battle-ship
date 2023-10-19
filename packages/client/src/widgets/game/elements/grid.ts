import { CELL_SIZE } from '../utils/constants'

type CreateCellType = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => void

function setupCell(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = 1
  ctx.strokeStyle = '#D0DFE3'
}

const createCell: CreateCellType = (ctx, x, y) => {
  ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE)
}

export default function grid(ctx: CanvasRenderingContext2D) {
  setupCell(ctx)

  for (let i = 0; i < 26; i++) {
    for (let y = 0; y < 15; y++) {
      createCell(ctx, i * CELL_SIZE + 1, y * CELL_SIZE + 1)
    }
  }
}
