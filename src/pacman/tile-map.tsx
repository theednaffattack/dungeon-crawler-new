import { createImage } from "./create-image";
import { GameMapEntities, Tile } from "./types";

export const tileSize = 40;
export const gameMap: GameMapEntities[] = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];

export const tileMap: Tile[][] = gameMap.map((row, rowIndex) => {
  return row.map((tile, cellIndex) => {
    switch (tile) {
      case "|":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "pipe-vertical",
          image: createImage("./assets/pacman/pipeVertical.png"),
          height: tileSize,
          width: tileSize,
        };
      case "-":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "pipe-horizontal",
          image: createImage("./assets/pacman/pipeHorizontal.png"),
          height: tileSize,
          width: tileSize,
        };
      case "+":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "pipe-cross",
          image: createImage("./assets/pacman/pipeCross.png"),
          height: tileSize,
          width: tileSize,
        };

      case "^":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "cap-top",
          image: createImage("./assets/pacman/capTop.png"),
          height: tileSize,
          width: tileSize,
        };

      case "_":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "cap-bottom",
          image: createImage("./assets/pacman/capBottom.png"),
          height: tileSize,
          width: tileSize,
        };
      case "]":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "cap-right",
          image: createImage("./assets/pacman/capRight.png"),
          height: tileSize,
          width: tileSize,
        };
      case "[":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "cap-left",
          image: createImage("./assets/pacman/capLeft.png"),
          height: tileSize,
          width: tileSize,
        };
      case "b":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "block",
          image: createImage("./assets/pacman/block.png"),
          height: tileSize,
          width: tileSize,
        };
      case "4":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "lower-left-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner4.png"),
          height: tileSize,
          width: tileSize,
        };
      case "3":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "lower-right-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner3.png"),
          height: tileSize,
          width: tileSize,
        };
      case "2":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "upper-right-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner2.png"),
          height: tileSize,
          width: tileSize,
        };
      case "1":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "upper-left-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner1.png"),
          height: tileSize,
          width: tileSize,
        };
      case "5":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "pipe-connector-top",
          image: createImage("./assets/pacman/pipeConnectorTop.png"),
          height: tileSize,
          width: tileSize,
        };
      case "6":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "pipe-connector-right",
          image: createImage("./assets/pacman/pipeConnectorRight.png"),
          height: tileSize,
          width: tileSize,
        };
      case "7":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "pipe-connector-bottom",
          image: createImage("./assets/pacman/pipeConnectorBottom.png"),
          height: tileSize,
          width: tileSize,
        };

      case "8":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "barrier",
          description: "pipe-connector-left",
          image: createImage("./assets/pacman/pipeConnectorLeft.png"),
          height: tileSize,
          width: tileSize,
        };

      case ".":
        return {
          xGrid: cellIndex,
          yGrid: rowIndex,
          xPixels: cellIndex * tileSize,
          yPixels: rowIndex * tileSize,
          type: "pickup",
          description: "points-pellet",
          image: createImage("./assets/pacman/pipeConnectorLeft.png"),
          height: tileSize,
          width: tileSize,
        };

      default:
        break;
    }
    return {
      xGrid: cellIndex,
      yGrid: rowIndex,
      xPixels: cellIndex * tileSize,
      yPixels: rowIndex * tileSize,
      type: "barrier",
      description: "right-edge",
      image: createImage(""),
      height: tileSize,
      width: tileSize,
    };
  });
});
