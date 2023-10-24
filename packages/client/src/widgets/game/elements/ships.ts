import ship from '../elements/ship'
import { ShipsType } from '../types'

const ships = function renderShips(
  ctx: CanvasRenderingContext2D,
  boardPosition: {
    x: number
    y: number
  },
  ships: ShipsType
) {
  for (let i = 0; i < ships.length; i += 1) {
    const currentShip = ships[i]
    const isHorizontal =
      currentShip.locations.length === 1
        ? true
        : currentShip.locations[0][0] !== currentShip.locations[1][0]
    const x = Number(currentShip.locations[0][0])
    const y = Number(currentShip.locations[0][1])

    ship(
      ctx,
      boardPosition.x,
      boardPosition.y,
      x,
      y,
      currentShip.locations.length,
      isHorizontal
    )
  }
}

export default ships
