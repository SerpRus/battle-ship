import { INC_COLOR, CELL_SIZE, BOARD_SIZE } from '../utils/constants';
import text from './text';

const board = function boardRender(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number = BOARD_SIZE
) {
  ctx.strokeStyle = INC_COLOR;

  ctx.strokeRect(x, y, CELL_SIZE * size, CELL_SIZE * size);

  const LETTER_START_CODE = 1040;

  for (let i = 0; i < size; i += 1) {
    text(ctx, String(i + 1), x + i * CELL_SIZE + BOARD_SIZE, y - 10);
    text(
      ctx,
      String.fromCharCode(LETTER_START_CODE + i),
      x - 30,
      y + i * CELL_SIZE + 30
    );
  }
};

export default board;
