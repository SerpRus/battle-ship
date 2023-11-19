import { SHIPS } from './constants';

export default function getHitsToWin() {
  let hitsToWin = 0;

  for (let i = 0; i < SHIPS.length; i += 1) {
    hitsToWin += SHIPS[i] * (i + 1);
  }

  return hitsToWin;
}
