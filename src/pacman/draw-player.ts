import { tileSize } from "./pacman";

export function drawPlayer(context: CanvasRenderingContext2D) {
  const playerInfo = { position: { x: 1, y: 1 }, radius: 15 };
  context.beginPath();
  context.arc(
    playerInfo.position.x * tileSize + tileSize / 2,
    playerInfo.position.y * tileSize + tileSize / 2,
    playerInfo.radius,
    0,
    Math.PI * 2
  );
  context.fillStyle = "yellow";
  context.fill();
  context.closePath();
}
