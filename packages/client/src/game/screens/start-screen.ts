import createGrid from '../elements/grid';
import text from '../elements/text';
import board from '../elements/board';

export default function startScreen(ctx: CanvasRenderingContext2D) {
  createGrid(ctx);

  text(ctx, 'Расстановка кораблей', 10, 50);

  board(ctx, 80, 120);
}
