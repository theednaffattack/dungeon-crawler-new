import { GameStateInterface } from "./types";

export function drawPlayer(
  context: CanvasRenderingContext2D,
  state: GameStateInterface,
  deltaTime: number
) {
  context.beginPath();
  console.log("DRAW PLAYER FUNC - DELTA TIME", deltaTime);

  context.arc(
    state.player.position.xPixels, // * tileSize + tileSize / 2,
    state.player.position.yPixels, // * tileSize + tileSize / 2,
    state.player.radius,
    0,
    Math.PI * 2
  );
  context.fillStyle = "yellow";
  context.fill();
  context.closePath();
}
