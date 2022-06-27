type VectorXType = number;
type VectorYType = number;

interface FullPositionDescription {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface PlayerPosition extends FullPositionDescription {
  xGrid: number;
  yGrid: number;
  xPixels: number;
  yPixels: number;
}
export interface Player {
  position: PlayerPosition;
  radius: number;
  score: number;
  speed: number;
  vector: [VectorXType, VectorYType];
}

export interface GameStateInterface {
  keyPressed: {
    ArrowUp: boolean;
    ArrowDown: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
  };
  lastKeyPressed: keyof GameStateInterface["keyPressed"];
  map: Tile[][];
  player: Player;
}

export interface Tile {
  xGrid: number;
  yGrid: number;
  xPixels: number;
  yPixels: number;
  type: TileType;
  description: TileDescription;
  radius?: number;
  image: HTMLImageElement;
  height: number;
  width: number;
}

type TileType = "barrier" | "pickup" | "portal" | "enemy" | "blank";

type TileDescription =
  | "block"
  | "left-corner"
  | "pipe-connector-top"
  | "pipe-connector-right"
  | "pipe-connector-bottom"
  | "pipe-connector-left"
  | "pipe-horizontal"
  | "pipe-vertical"
  | "pipe-cross"
  | "lower-left-pipe-corner"
  | "lower-right-pipe-corner"
  | "upper-left-pipe-corner"
  | "upper-right-pipe-corner"
  | "right-corner"
  | "left-edge"
  | "right-edge"
  | "cap-top"
  | "cap-bottom"
  | "cap-right"
  | "cap-left"
  | "points-pellet"
  | "pellet"
  | "";

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
  | ""
)[];
