interface GridSettings {
  GRID_HEIGHT: number;
  GRID_WIDTH: number;
  MAX_ROOMS: number;
  ROOM_SIZE_RANGE: [number, number];
}

interface GridSquare {
  type: number;
  opacity: number;
}

// Add settings for our grid
const GRID_HEIGHT = 40;
const GRID_WIDTH = 40;
const MAX_ROOMS = 15;
const ROOM_SIZE_RANGE: [number, number] = [7, 12];

// Add our settings to an object for ease-of-reference
const gridSettings: GridSettings = {
  GRID_HEIGHT,
  GRID_WIDTH,
  MAX_ROOMS,
  ROOM_SIZE_RANGE,
};

export function createDungeon() {
  // let's store our grid squares in an array
  let grid: GridSquare[][] = [];
  for (
    let heightIndex = 0;
    heightIndex < gridSettings.GRID_HEIGHT;
    heightIndex++
  ) {
    // walk through our grid height and push an empty array into
    // the existing grid array
    grid.push([]);
    for (
      let widthIndex = 0;
      widthIndex < gridSettings.GRID_WIDTH;
      widthIndex++
    ) {
      grid[heightIndex].push({ type: 0, opacity: randomInteger(3, 8) / 10 });
    }
  }

  return grid;
}

// Adapted from: https://stackoverflow.com/a/7228322/9448010
function randomInteger(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
