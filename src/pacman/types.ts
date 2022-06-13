export interface Player {
  position: { x: number; y: number };
  radius: number;
  velocity: { x: number; y: number };
}

export interface GameStateInterface {
  keyPressed: {
    ArrowUp: boolean;
    ArrowDown: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
  };
  map: Tile[][];
  player: Player;
}

export interface Tile {
  x: number;
  y: number;
  type: TileType;
  image: HTMLImageElement;
  height: number;
  width: number;
}

type TileType =
  | "left-corner"
  | "pipe-horizontal"
  | "right-corner"
  | "left-edge"
  | "right-edge"
  | "pipe-cross"
  | "points-pellet"
  | "lower-left-pipe-corner"
  | "lower-right-pipe-corner"
  | "upper-left-pipe-corner"
  | "upper-right-pipe-corner"
  | "pellet";

export type GameMapEntities = (
  | "-"
  | "|"
  | "."
  | "1"
  | "2"
  | "3"
  | "4"
  | "b"
  | "5"
  | "6"
  | "7"
  | "8"
  | "+"
  | "]"
  | "["
  | "p"
  | "_"
  | "^"
)[];
