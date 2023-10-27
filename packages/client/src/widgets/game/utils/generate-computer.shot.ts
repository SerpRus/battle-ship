import getRandomFromRange from '../utils/get-randomFrom-range'

export default function generateComputerShot() {
  const x = getRandomFromRange(0, 10)
  const y = getRandomFromRange(0, 10)

  return {
    x,
    y,
  }
}
