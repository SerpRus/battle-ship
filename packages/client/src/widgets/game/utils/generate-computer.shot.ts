import getRandomFromRange from '../utils/get-randomFrom-range'

export default function generateComputerShot() {
  const x = getRandomFromRange(0, 9)
  const y = getRandomFromRange(0, 9)

  return {
    x,
    y,
  }
}
