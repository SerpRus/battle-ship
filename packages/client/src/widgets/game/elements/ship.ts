import { INC_COLOR, CELL_SIZE } from '../utils/constants';

const ship = function renderShip(
  ctx: CanvasRenderingContext2D,
  boardX: number,
  boardY: number,
  x: number,
  y: number,
  size: number,
  isHorizontal?: boolean
) {
  ctx.strokeStyle = INC_COLOR;

  if (isHorizontal) {
    ctx.strokeRect(
      boardX + CELL_SIZE * x,
      boardY + CELL_SIZE * y,
      CELL_SIZE * size,
      CELL_SIZE
    );
  } else {
    ctx.strokeRect(
      boardX + CELL_SIZE * x,
      boardY + CELL_SIZE * y,
      CELL_SIZE,
      CELL_SIZE * size
    );
  }

  ctx.stroke();
};

export default ship;
