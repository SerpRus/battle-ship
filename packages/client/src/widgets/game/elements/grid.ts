import { CELL_SIZE, GRID_CELL_COLOR } from '../utils/constants';

function setupCell(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = GRID_CELL_COLOR;
}

const createCell = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
};

export default function grid(ctx: CanvasRenderingContext2D) {
  setupCell(ctx);

  for (let i = 0; i < 26; i += 1) {
    for (let y = 0; y < 15; y += 1) {
      createCell(ctx, i * CELL_SIZE + 1, y * CELL_SIZE + 1);
    }
  }
}
