import createGrid from '../elements/grid';
import text from '../elements/text';
import board from '../elements/board'

export default function endScreen(ctx: CanvasRenderingContext2D) {
  createGrid(ctx);

  text(ctx, 'Игра окончена', 10, 50);

  board(ctx, 80, 120);

  board(ctx, 560, 120);
}
