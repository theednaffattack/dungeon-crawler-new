import { clamp } from "./clamp";
import { circleCollidesWithRectangle } from "./does-circle-collide-with-rectangle";
import { Action } from "./pacman-reducer";
import { tileSize } from "./tile-map";
import { GameStateInterface } from "./types";

const PLAYER_SPEED = 15;
export function playerInput({
  state,
  action,
}: {
  state: GameStateInterface;
  action: Action;
}): GameStateInterface {
  if ("key" in action.payload) {
    if (!action.payload.deltaTime || !action.payload.vector) {
      return { ...state };
    }
    if (action.payload.key === "ArrowUp") {
      const nextYPos = Math.round(clamp(state.player.position.y - 1, 0, 12));

      const destination = state.map[nextYPos][state.player.position.x + 0];
      console.log("VIEW DESTINATION", {
        yCoord: nextYPos,
        xCoord: state.player.position.x + 0,
        destination,
      });
      return {
        ...state,
        keyPressed: {
          ArrowDown: false,
          ArrowLeft: false,
          ArrowRight: false,
          [action.payload.key]:
            action.payload.event === "keydown" ? true : false,
        },
        player: {
          ...state.player,
          position: {
            x: state.player.position.x,
            y: state.player.position.y - PLAYER_SPEED / tileSize,
          },
        },
      };
    }
    if (action.payload.key === "ArrowDown") {
      state.keyPressed[action.payload.key];
      return {
        ...state,
        keyPressed: {
          ArrowUp: false,
          ArrowLeft: false,
          ArrowRight: false,
          [action.payload.key]:
            action.payload.event === "keydown" ? true : false,
        },
        player: {
          ...state.player,
          position: {
            x: state.player.position.x,
            y: state.player.position.y + PLAYER_SPEED / tileSize,
          },
        },
      };
    }
    if (action.payload.key === "ArrowLeft") {
      state.keyPressed[action.payload.key];

      return {
        ...state,
        keyPressed: {
          ArrowUp: false,
          ArrowDown: false,
          ArrowRight: false,
          [action.payload.key]:
            action.payload.event === "keydown" ? true : false,
        },
        player: {
          ...state.player,
          position: {
            x: state.player.position.x - PLAYER_SPEED / tileSize,
            y: state.player.position.y,
          },
        },
      };
    }
    if (action.payload.key === "ArrowRight") {
      state.keyPressed[action.payload.key];

      return {
        ...state,
        keyPressed: {
          ArrowUp: false,
          ArrowDown: false,
          ArrowLeft: false,
          [action.payload.key]:
            action.payload.event === "keydown" ? true : false,
        },
        player: {
          ...state.player,
          position: {
            x: state.player.position.x + PLAYER_SPEED / tileSize,
            y: state.player.position.y,
          },
        },
      };
    }
  }
  return { ...state };
}
