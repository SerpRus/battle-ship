import { PositionType, ShipsType } from '../types'

export default function hitCheck(cellPosition: PositionType, ships: ShipsType) {
  let isHit = false

  for (let i = 0; i < ships.length; i += 1) {
    const { locations } = ships[i]
    for (let j = 0; j < locations.length; j += 1) {
      if (locations[j] === `${cellPosition.x}${cellPosition.y}`) {
        isHit = true
      }
    }
  }

  return isHit
}
