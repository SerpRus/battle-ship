import { PositionType } from '../types';
import renderShot from './render-shot';

export default function renderBoardShots(
  ctx: CanvasRenderingContext2D,
  boardPosition: PositionType,
  shots: string[][]
) {
  for (let i = 0; i < shots.length; i += 1) {
    const shotsRow = shots[i];

    for (let j = 0; j < shotsRow.length; j += 1) {
      if (shotsRow[j]) {
        const isHit = shotsRow[j] === 'HIT';

        renderShot(ctx, boardPosition, { x: i, y: j }, isHit);
      }
    }
  }
}
