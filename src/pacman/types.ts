export interface GameStateInterface {
  map: Tile[][];
  player: { position: { x: number; y: number }; radius: number };
}

export interface Tile {
  x: number;
  y: number;
  type: TileType;
  image: HTMLImageElement;
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
