import { tileMap, tileSize } from "./tile-map";

export function drawMap(context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  // Step 1: Fill the entire canvas with black BEFORE drawing
  context.fillStyle = "black";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  // Step 2: Draw our game map
  for (let rowIndex = 0; rowIndex < tileMap.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < tileMap[rowIndex].length; cellIndex++) {
      const element = tileMap[rowIndex][cellIndex];
      // If it's a regular pellet draw it here, otherwise...
      if (element.type === "points-pellet") {
        context.beginPath();
        context.arc(
          element.x * tileSize + tileSize / 2,
          element.y * tileSize + tileSize / 2,
          3,
          0,
          Math.PI * 2
        );
        context.fillStyle = "white";
        context.fill();
        context.closePath();
      } else {
        // ...continue drawing the map blocks
        context.drawImage(
          element.image,
          element.x * tileSize,
          element.y * tileSize
        );
      }
    }
  }

  context.fill();
}
