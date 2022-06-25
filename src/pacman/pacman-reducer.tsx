import { GameStateInterface } from "./types";
import { playerInput } from "./player-input";
import { initialState } from "./pacman";

export type Action =
  | { type: "init"; payload: GameStateInterface }
  | {
      type: "movePlayer";
      payload: {
        event: "keydown" | "keyup";
        key: keyof GameStateInterface["keyPressed"];
        vector: [number, number];
        deltaTime: number;
      };
    };

export function pacmanReducer(
  state: GameStateInterface,
  action: Action
): GameStateInterface {
  switch (action.type) {
    case "init":
      return { ...state };
    case "movePlayer": {
      return playerInput({ state, action });
    }
    default:
      return initialState;
  }
}
