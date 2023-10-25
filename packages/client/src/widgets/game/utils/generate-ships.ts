export type ShipsType = {
  locations: string[];
  hits: string[];
}[];

function collision(ships: ShipsType, locations: string[]) {
  for (let i = 0; i < ships.length; i += 1) {
    const shipLocations = ships[i].locations;
    const allLocation = [...shipLocations];

    for (let z = 0; z < shipLocations.length; z += 1) {
      const shipLocationX = Number(shipLocations[z][0]);
      const shipLocationY = Number(shipLocations[z][1]);
      for (let x = -1; x < 2; x += 1) {
        for (let y = -1; y < 2; y += 1) {
          const currentX = shipLocationX + x;
          const currentY = shipLocationY + y;
          const newPosition = `${currentX}${currentY}`;

          if (
            currentX >= 0 &&
            currentX <= 9 &&
            currentY >= 0 &&
            currentY <= 9 &&
            allLocation.indexOf(newPosition) === -1
          ) {
            allLocation.push(newPosition);
          }
        }
      }
    }

    for (let j = 0; j < locations.length; j += 1) {
      if (allLocation.indexOf(locations[j]) >= 0) {
        return true;
      }
    }
  }

  return false;
}

function generateShip(boardSize: number, shipLength: number) {
  const direction = Math.floor(Math.random() * 2);
  let row;
  let col;

  if (direction === 1) {
    row = Math.floor(Math.random() * boardSize);
    col = Math.floor(Math.random() * (boardSize - shipLength));
  } else {
    row = Math.floor(Math.random() * (boardSize - shipLength));
    col = Math.floor(Math.random() * boardSize);
  }

  const newShipLocations = [];

  for (let i = 0; i < shipLength; i += 1) {
    if (direction === 1) {
      newShipLocations.push(`${row}${col + i}`);
    } else {
      newShipLocations.push(`${row + i}${col}`);
    }
  }

  return newShipLocations;
}

export default function generateShipLocations(
  boardSize: number,
  shipsLength: number[]
) {
  const ships: ShipsType = [];
  let locations;

  for (let i = 0; i < shipsLength.length; i += 1) {
    for (let y = 1; y <= i + 1; y += 1) {
      const shipLength = shipsLength[i];

      do {
        locations = generateShip(boardSize, shipLength);
      } while (collision(ships, locations));

      ships.push({
        locations,
        hits: new Array(shipLength).fill(''),
      });
    }
  }

  return ships;
}
