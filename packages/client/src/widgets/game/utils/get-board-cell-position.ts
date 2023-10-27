import { CELL_SIZE } from './constants'
import { PositionType } from '../types'

export default function getBoardCellPosition(
  boardPosition: PositionType,
  clickPosition: PositionType
) {
  const differencePosition = {
    x: clickPosition.x - boardPosition.x,
    y: clickPosition.y - boardPosition.y,
  }

  return {
    x: Math.floor(differencePosition.x / CELL_SIZE),
    y: Math.floor(differencePosition.y / CELL_SIZE),
  }
}
