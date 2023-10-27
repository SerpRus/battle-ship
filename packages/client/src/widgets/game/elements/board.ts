import { INC_COLOR, CELL_SIZE, BOARD_SIZE } from '../utils/constants';
import { PositionType } from '../types';
import text from './text';

const board = function boardRender(
  ctx: CanvasRenderingContext2D,
  position: PositionType,
  size: number = BOARD_SIZE
) {
  ctx.strokeStyle = INC_COLOR;

  ctx.strokeRect(position.x, position.y, CELL_SIZE * size, CELL_SIZE * size);

  const LETTER_START_CODE = 1040;

  for (let i = 0; i < size; i += 1) {
    text(
      ctx,
      String(i + 1),
      position.x + i * CELL_SIZE + BOARD_SIZE,
      position.y - 10
    );

    text(
      ctx,
      String.fromCharCode(LETTER_START_CODE + i),
      position.x - 30,
      position.y + i * CELL_SIZE + 30
    );
  }
};

export default board;
