function generateShip(boardSize: number) {
  const direction = Math.floor(Math.random() * 2)
  let row
  let col
  const shipLength = 3

  if (direction === 1) {
    row = Math.floor(Math.random() * boardSize)
    col = Math.floor(Math.random() * (boardSize - shipLength))
  } else {
    row = Math.floor(Math.random() * (boardSize - shipLength))
    col = Math.floor(Math.random() * boardSize)
  }

  const newShipLocations = []

  for (let i = 0; i < shipLength; i++) {
    if (direction === 1) {
      newShipLocations.push(row + '' + (col + i))
    } else {
      newShipLocations.push(row + i + '' + col)
    }
  }

  return newShipLocations
}

// z

export default function randomShips(ships = [4, 3, 2, 1]) {
  console.log(ships)
  generateShip(10)
}
