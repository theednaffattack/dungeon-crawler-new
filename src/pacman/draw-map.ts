import { tileSize } from "./tile-map";
import { GameStateInterface } from "./types";
interface DrawMapProps {
  context: CanvasRenderingContext2D;
  state: GameStateInterface;
}

export function drawMap({ context, state }: DrawMapProps) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  // Step 1: Fill the entire canvas with black BEFORE drawing
  context.fillStyle = "black";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  // Step 2: Draw our game map
  for (let rowIndex = 0; rowIndex < state.map.length; rowIndex++) {
    for (
      let cellIndex = 0;
      cellIndex < state.map[rowIndex].length;
      cellIndex++
    ) {
      const element = state.map[rowIndex][cellIndex];
      //
      if (element.description === "") {
        break;
      }
      // If it's a regular pellet draw it here, otherwise...
      if (element.description === "points-pellet") {
        context.beginPath();
        context.arc(
          element.xGrid * tileSize + tileSize / 2,
          element.yGrid * tileSize + tileSize / 2,
          3,
          0,
          Math.PI * 2
        );
        context.fillStyle = "white";
        context.fill();
        context.closePath();
      }
      // ...continue drawing the map blocks
      context.drawImage(
        element.image,
        element.xGrid * tileSize,
        element.yGrid * tileSize
      );
    }
  }

  context.fill();
}
