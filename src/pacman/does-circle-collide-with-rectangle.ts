import { Player, Tile } from "./types";

interface CircleCollidesWithRectangleProps {
  circle: Player;
  rectangle: Tile;
}

export function circleCollidesWithRectangle({
  circle,
  rectangle,
}: CircleCollidesWithRectangleProps) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >= rectangle.x &&
    circle.position.y + circle.radius + circle.velocity.y >= rectangle.y &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.x + rectangle.width
  );
}
