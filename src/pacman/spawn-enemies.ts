import { tileMap, tileSize } from "./tile-map";
import { Enemy } from "./types";

function getRandomTile() {
  const openTiles = tileMap.map((row) =>
    row.filter((cell) => cell.type !== "enemy" && cell.type !== "barrier")
  );

  const randomRow = Math.floor(Math.random() * openTiles.length);
  const randomCell = Math.floor(Math.random() * openTiles[randomRow].length);
  console.log("RANDOM ROW RANDOM CELL", { randomRow, randomCell, openTiles });
  return openTiles[randomRow][randomCell];
}

export function spawnEnemies({ num }: { num: number }): Enemy | Enemy[] {
  const ghosts: Enemy["color"][] = ["pink", "green", "blue", "orange", "red"];
  // If selecting only one character grab a random color
  const ghostIndex = Math.floor(Math.random() * ghosts.length);
  const { xGrid, yGrid } = getRandomTile();

  if (num === 1) {
    return {
      color: ghosts[ghostIndex],
      position: {
        xGrid: xGrid,
        yGrid: yGrid,
        xPixels: xGrid * tileSize + tileSize / 2,
        yPixels: yGrid * tileSize + tileSize / 2,
      },
      radius: 15,
      speed: 30,
      vector: [0, 0],
    };
  }
  return Array.from({ length: num ? num : ghosts.length }, (_, newIndex) => {
    const { xGrid: xMultiple, yGrid: yMultiple } = getRandomTile();
    return {
      color: ghosts[newIndex],
      position: {
        xGrid: xMultiple,
        yGrid: yMultiple,
        xPixels: xMultiple * tileSize + tileSize / 2,
        yPixels: yMultiple * tileSize + tileSize / 2,
      },
      radius: 15,
      speed: 30,
      vector: [0, 0],
    };
  });
}
