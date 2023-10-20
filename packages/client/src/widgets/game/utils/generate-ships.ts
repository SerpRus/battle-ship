// import randomFromArray from './random-from-array'
//
// function generateShipLocations(numShips, ships) {
//   let locations
//
//   for (let i = 0; i < numShips; i++) {
//     do {
//       locations = generateShip()
//     } while (collision(locations))
//     ships[i].locations = locations
//   }
// }
//
// function generateShip(boardSize: number, shipLength: number) {
//   const direction = Math.floor(Math.random() * 2)
//   let row
//   let col
//   // const shipLength = 3
//
//   if (direction === 1) {
//     row = Math.floor(Math.random() * boardSize)
//     col = Math.floor(Math.random() * (boardSize - shipLength))
//   } else {
//     row = Math.floor(Math.random() * (boardSize - shipLength))
//     col = Math.floor(Math.random() * boardSize)
//   }
//
//   const newShipLocations = []
//
//   for (let i = 0; i < shipLength; i++) {
//     if (direction === 1) {
//       newShipLocations.push(row + '' + (col + i))
//     } else {
//       newShipLocations.push(row + i + '' + col)
//     }
//   }
//
//   return newShipLocations
// }
// function collision(locations) {
//   for (var i = 0; i < this.numShips; i++) {
//     var ship = model.ships[i]
//     for (var j = 0; j < locations.length; j++) {
//       if (ship.locations.indexOf(locations[j]) >= 0) {
//         return true
//       }
//     }
//   }
//   return false
// }

export default function generateShips(boardSize: number, ships: number[]) {
  const emptyCells = new Array(boardSize).fill(new Array(boardSize).fill(null))
  console.log(emptyCells)

  // randomFromArray

  console.log(ships)
  console.log(boardSize)

  // generateShip(10)
}
