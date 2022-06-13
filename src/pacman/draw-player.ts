import { tileSize } from "./tile-map";
import { GameStateInterface } from "./types";

export function drawPlayer(
  context: CanvasRenderingContext2D,
  state: GameStateInterface,
  deltaTime: number
) {
  let vectorX = 0;
  let vectorY = 0;
  if (state.keyPressed.ArrowLeft) {
    vectorX = -1;
  }
  if (state.keyPressed.ArrowRight) {
    vectorX = 1;
  }
  if (state.keyPressed.ArrowUp) {
    vectorY = -1;
  }
  if (state.keyPressed.ArrowDown) {
    vectorY = 1;
  }

  context.beginPath();

  context.arc(
    state.player.position.x * tileSize + tileSize / 2,
    state.player.position.y * tileSize + tileSize / 2,
    state.player.radius,
    0,
    Math.PI * 2
  );
  context.fillStyle = "yellow";
  context.fill();
  context.closePath();
}
