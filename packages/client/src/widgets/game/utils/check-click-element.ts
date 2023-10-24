import { PositionType, SizeWithPositionType } from '../types'

export default function checkClickElement(
  target: SizeWithPositionType,
  clickPosition: PositionType
) {
  return (
    clickPosition.x >= target.position.x &&
    clickPosition.y >= target.position.y &&
    clickPosition.x <= target.position.x + target.width &&
    clickPosition.y <= target.position.y + target.height
  )
}
