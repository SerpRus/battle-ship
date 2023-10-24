import { CELL_SIZE, HIT_COLOR, INC_COLOR } from '../utils/constants'
import { PositionType } from '../types'

export default function renderShot(
  ctx: CanvasRenderingContext2D,
  boardPosition: PositionType,
  cellCoords: PositionType,
  isHit: boolean
) {
  const cellPosition = {
    x: boardPosition.x + CELL_SIZE * cellCoords.x,
    y: boardPosition.y + CELL_SIZE * cellCoords.y,
  }

  const lineX = {
    start: cellPosition.x,
    end: cellPosition.x + CELL_SIZE,
  }

  const movePath = {
    start: {
      x: lineX.start,
      y: cellPosition.y,
    },
    end: {
      x: lineX.end,
      y: cellPosition.y + CELL_SIZE,
    },
  }

  ctx.strokeStyle = isHit ? HIT_COLOR : INC_COLOR
  ctx.beginPath()

  if (isHit) {
    ctx.moveTo(movePath.start.x, movePath.start.y)
    ctx.lineTo(movePath.end.x, movePath.end.y)
    ctx.moveTo(movePath.start.x, movePath.start.y + CELL_SIZE)
    ctx.lineTo(movePath.end.x, movePath.end.y - CELL_SIZE)
  } else {
    ctx.beginPath()
    ctx.arc(
      cellPosition.x + CELL_SIZE / 2,
      cellPosition.y + CELL_SIZE / 2,
      CELL_SIZE / 2,
      0,
      2 * Math.PI,
      false
    )
  }

  ctx.stroke()
}
