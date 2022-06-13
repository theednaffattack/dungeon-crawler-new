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
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/pipeVertical.png"),
          height: tileSize,
          width: tileSize,
        };
      case "-":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/pipeHorizontal.png"),
          height: tileSize,
          width: tileSize,
        };
      case "+":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/pipeCross.png"),
          height: tileSize,
          width: tileSize,
        };

      case "^":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/capTop.png"),
          height: tileSize,
          width: tileSize,
        };

      case "_":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/capBottom.png"),
          height: tileSize,
          width: tileSize,
        };
      case "]":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/capRight.png"),
          height: tileSize,
          width: tileSize,
        };
      case "[":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/capLeft.png"),
          height: tileSize,
          width: tileSize,
        };
      case "b":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/block.png"),
          height: tileSize,
          width: tileSize,
        };
      case "4":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "lower-left-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner4.png"),
          height: tileSize,
          width: tileSize,
        };
      case "3":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "lower-right-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner3.png"),
          height: tileSize,
          width: tileSize,
        };
      case "2":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-right-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner2.png"),
          height: tileSize,
          width: tileSize,
        };
      case "1":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-left-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner1.png"),
          height: tileSize,
          width: tileSize,
        };
      case "5":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-left-pipe-corner",
          image: createImage("./assets/pacman/pipeConnectorTop.png"),
          height: tileSize,
          width: tileSize,
        };
      case "6":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-left-pipe-corner",
          image: createImage("./assets/pacman/pipeConnectorRight.png"),
          height: tileSize,
          width: tileSize,
        };
      case "7":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-left-pipe-corner",
          image: createImage("./assets/pacman/pipeConnectorBottom.png"),
          height: tileSize,
          width: tileSize,
        };

      case "8":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-left-pipe-corner",
          image: createImage("./assets/pacman/pipeConnectorLeft.png"),
          height: tileSize,
          width: tileSize,
        };

      case ".":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "points-pellet",
          image: createImage("./assets/pacman/pipeConnectorLeft.png"),
          height: tileSize,
          width: tileSize,
        };

      default:
        break;
    }
    return {
      x: cellIndex,
      y: rowIndex,
      type: "right-edge",
      image: createImage(""),
      height: tileSize,
      width: tileSize,
    };
  });
});
