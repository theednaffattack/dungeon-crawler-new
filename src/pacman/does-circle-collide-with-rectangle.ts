import { Player, Tile } from "./types";

type XCoord = number;
type YCoord = number;

type VectorType = [XCoord, YCoord];
interface CircleCollidesWithRectangleProps {
  circle: Player;
  rectangle: Tile;
  vector: VectorType;
}

export function doesCircleCollidesWithRectangle({
  circle,
  rectangle,
  vector,
}: CircleCollidesWithRectangleProps) {
  const [vectorX, vectorY] = vector;

  const circRight = circle.position.xPixels + circle.radius + 1 * vectorX;
  const circLeft = circle.position.xPixels - circle.radius + 1 * vectorX;
  const circTop = circle.position.yPixels - circle.radius + 1 * vectorY;
  const circBottom = circle.position.yPixels + circle.radius + 1 * vectorY;

  const rectTop = rectangle.yPixels;
  const rectBottom = rectangle.yPixels + rectangle.height;
  const rectLeft = rectangle.xPixels;
  const rectRight = rectangle.xPixels + rectangle.width;

  const collidingTop = circTop <= rectBottom;
  const collidingRight = circRight >= rectLeft;
  const collidingBottom = circBottom >= rectTop;
  const collidingLeft = circLeft <= rectRight;

  const collision =
    collidingTop && collidingRight && collidingBottom && collidingLeft;

  return collision;
  // BEG NEWER
  // circle.position.yPixels - circle.radius <=
  //   rectangle.yPixels + rectangle.height &&
  // circle.position.xPixels + circle.radius >= rectangle.xPixels &&
  // circle.position.yPixels + circle.radius >= rectangle.yPixels &&
  // circle.position.xPixels - circle.radius <=
  //   rectangle.xPixels + rectangle.width
  // END NEWER

  // circle.position.yPixels - circle.radius + circle.velocity.y <=
  //   rectangle.yGrid + rectangle.height &&
  // circle.position.xGrid + circle.radius + circle.velocity.x >=
  //   rectangle.xGrid &&
  // circle.position.yGrid + circle.radius + circle.velocity.y >=
  //   rectangle.yGrid &&
  // circle.position.xGrid - circle.radius + circle.velocity.x <=
  //   rectangle.xGrid + rectangle.width
}
