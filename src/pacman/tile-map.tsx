import { createImage } from "./create-image";
import { GameMapEntities, Tile } from "./types";

export const tileMapOG: Tile[][] = [
  [
    {
      x: 0,
      y: 0,
      type: "left-corner",
      image: createImage("./assets/pacman/pipeCorner1.png"),
    },
    {
      x: 1,
      y: 0,
      type: "pipe-horizontal",
      image: createImage("./assets/pacman/pipeHorizontal.png"),
    },
    {
      x: 2,
      y: 0,
      type: "pipe-horizontal",
      image: createImage("./assets/pacman/pipeHorizontal.png"),
    },
    {
      x: 3,
      y: 0,
      type: "pipe-horizontal",
      image: createImage("./assets/pacman/pipeHorizontal.png"),
    },
    {
      x: 4,
      y: 0,
      type: "pipe-horizontal",
      image: createImage("./assets/pacman/pipeHorizontal.png"),
    },
    {
      x: 5,
      y: 0,
      type: "pipe-horizontal",
      image: createImage("./assets/pacman/pipeHorizontal.png"),
    },
    {
      x: 6,
      y: 0,
      type: "pipe-horizontal",
      image: createImage("./assets/pacman/pipeHorizontal.png"),
    },
    {
      x: 7,
      y: 0,
      type: "pipe-horizontal",
      image: createImage("./assets/pacman/pipeHorizontal.png"),
    },
    {
      x: 8,
      y: 0,
      type: "pipe-horizontal",
      image: createImage("./assets/pacman/pipeHorizontal.png"),
    },
    {
      x: 9,
      y: 0,
      type: "pipe-horizontal",
      image: createImage("./assets/pacman/pipeHorizontal.png"),
    },
    {
      x: 10,
      y: 0,
      type: "right-corner",
      image: createImage("./assets/pacman/pipeCorner2.png"),
    },
  ],
  [
    {
      x: 0,
      y: 1,
      type: "left-edge",
      image: createImage("./assets/pacman/pipeVertical.png"),
    },
    {
      x: 1,
      y: 1,
      type: "pellet",
      image: createImage("./assets/pacman/block.png"),
    },
    {
      x: 2,
      y: 1,
      type: "pellet",
      image: createImage("./assets/pacman/block.png"),
    },
    {
      x: 3,
      y: 1,
      type: "pellet",
      image: createImage("./assets/pacman/block.png"),
    },
    {
      x: 4,
      y: 1,
      type: "pellet",
      image: createImage("./assets/pacman/block.png"),
    },
    {
      x: 5,
      y: 1,
      type: "pellet",
      image: createImage("./assets/pacman/block.png"),
    },
    {
      x: 6,
      y: 1,
      type: "pellet",
      image: createImage("./assets/pacman/block.png"),
    },
    {
      x: 7,
      y: 1,
      type: "pellet",
      image: createImage("./assets/pacman/block.png"),
    },
    {
      x: 8,
      y: 1,
      type: "pellet",
      image: createImage("./assets/pacman/block.png"),
    },
    {
      x: 9,
      y: 1,
      type: "pellet",
      image: createImage("./assets/pacman/block.png"),
    },
    {
      x: 10,
      y: 1,
      type: "right-edge",
      image: createImage("./assets/pacman/pipeVertical.png"),
    },
  ],
];
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
        };
      case "-":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/pipeHorizontal.png"),
        };
      case "+":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/pipeCross.png"),
        };

      case "^":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/capTop.png"),
        };

      case "_":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/capBottom.png"),
        };
      case "]":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/capRight.png"),
        };
      case "[":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/capLeft.png"),
        };
      case "b":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "pipe-cross",
          image: createImage("./assets/pacman/block.png"),
        };
      case "4":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "lower-left-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner4.png"),
        };
      case "3":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "lower-right-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner3.png"),
        };
      case "2":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-right-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner2.png"),
        };
      case "1":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-left-pipe-corner",
          image: createImage("./assets/pacman/pipeCorner1.png"),
        };
      case "5":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-left-pipe-corner",
          image: createImage("./assets/pacman/pipeConnectorTop.png"),
        };
      case "6":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-left-pipe-corner",
          image: createImage("./assets/pacman/pipeConnectorRight.png"),
        };
      case "7":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-left-pipe-corner",
          image: createImage("./assets/pacman/pipeConnectorBottom.png"),
        };

      case "8":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "upper-left-pipe-corner",
          image: createImage("./assets/pacman/pipeConnectorLeft.png"),
        };

      case ".":
        return {
          x: cellIndex,
          y: rowIndex,
          type: "points-pellet",
          image: createImage("./assets/pacman/pipeConnectorLeft.png"),
        };

      default:
        break;
    }
    return {
      x: cellIndex,
      y: rowIndex,
      type: "right-edge",
      image: createImage(""),
    };
  });
});
