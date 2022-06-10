import { HERO_SPEED } from "../logic-grid-constants";

export interface GameStateInter {
  camera: CameraInter;
  // game: GameInter;
  map: MapInter;
  hero: HeroInter;
  /** previous raf callback number minus the current raf callback number */
  rafDelta: number;
  raf: number;
}

export interface MapInter {
  cols: number;
  rows: number;
  tsize: number;
  layers: number[][];
}

interface CameraInter {
  x: number;
  y: number;
  following: { x: number; y: number; screenX: number; screenY: number };
  width: number;
  height: number;
  maxX: number;
  maxY: number;
}

type Coords = [number, number];

interface HeroInter {
  height: number;
  width: number;
  x: number;
  y: number;
  screenX: number;
  screenY: number;
}

export type GameAction =
  | {
      type: "updateRafDelta";
      payload: number;
    }
  | { type: "updateRafElapsed"; payload: number }
  | {
      type: "moveCamera";
      payload: {
        followingScreenX: number;
        followingScreenY: number;
        newFollowingX: number;
        newFollowingY: number;
        newX: number;
        newY: number;
      };
    }
  | {
      type: "movePlayer";
      payload: {
        newScreenX: number;
        newScreenY: number;
        newX: number;
        newY: number;
      };
    }
  | { type: "two"; payload: number };

export function logicGridGameReducer(
  state: GameStateInter,
  { type, payload }: GameAction
): GameStateInter {
  switch (type) {
    case "updateRafDelta":
      return { ...state, rafDelta: payload };
    case "updateRafElapsed":
      return { ...state, raf: payload };
    case "moveCamera": {
      return {
        ...state,
        camera: {
          ...state.camera,
          x: payload.newX,
          y: payload.newY,
          following: {
            ...state.camera.following,
            x: payload.newFollowingX,
            y: payload.newFollowingY,
            screenX: payload.followingScreenX,
            screenY: payload.followingScreenY,
          },
        },
      };
    }
    case "movePlayer": {
      return {
        ...state,
        hero: {
          ...state.hero,
          screenX: payload.newScreenX,
          screenY: payload.newScreenY,
          x: payload.newX,
          y: payload.newY,
        },
      };
    }
    case "two":
      return { ...state };
    default:
      return { ...state };
  }
}
