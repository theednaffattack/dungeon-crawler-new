import { doesCircleCollidesWithRectangle } from "./does-circle-collide-with-rectangle";
import { Action } from "./pacman-reducer";
import { tileSize } from "./tile-map";
import { GameStateInterface } from "./types";

export function playerInput({
  state,
  action,
}: {
  state: GameStateInterface;
  action: Action;
}): GameStateInterface {
  if ("event" in action.payload) {
    const [vectorX, vectorY] = action.payload.vector;

    const { key } = action.payload;

    const frameTransform = 0.01;
    if (action.payload.event === "keyup") {
      state.keyPressed[key];
      return {
        ...state,
        keyPressed: { ...state.keyPressed, [key]: false },
        player: {
          ...state.player,
          vector: [action.payload.vector[0], action.payload.vector[1]],
        },
      };
    }

    const barriers = state.map.map((row) => {
      return row.filter((cell) => cell.type === "barrier");
    });

    const velocity =
      state.player.speed * frameTransform * action.payload.deltaTime;

    const newXPixels = state.player.position.xPixels + 1 * velocity * vectorX;

    const newYPixels = state.player.position.yPixels + 1 * velocity * vectorY;

    const newYGrid = Math.floor(
      (state.player.position.yPixels + 1 * vectorY * velocity) / tileSize
    );

    const newXGrid = Math.floor(
      (state.player.position.xPixels + 1 * vectorX * velocity) / tileSize
    );

    // Collision detection - barriers
    for (const row of barriers) {
      for (const cell of row) {
        if (
          doesCircleCollidesWithRectangle({
            rectangle: cell,
            circle: {
              ...state.player,
              position: {
                ...state.player.position,
                xPixels: newXPixels,
                yPixels: newYPixels,
              },
            },
            vector: [vectorX, vectorY],
          })
        ) {
          return {
            ...state,
            lastKeyPressed: key as keyof GameStateInterface["keyPressed"],
            keyPressed: { ...state.keyPressed, [key]: true },
            player: {
              ...state.player,
              position: { ...state.player.position },
              vector: [vectorX, vectorY],
            },
          };
        }
      }
    }

    const pelletRadius = 3;

    const destination = state.map[newYGrid][newXGrid];

    const clonedMap = [...state.map];
    let addToScore = 0;

    if (destination.type === "pickup") {
      if (
        Math.hypot(
          destination.xPixels - state.player.position.xPixels,
          destination.yPixels - state.player.position.yPixels
        ) <
        pelletRadius + state.player.radius
      ) {
        // increment score on pickup
        addToScore = ++state.player.score;
        clonedMap[destination.yGrid][destination.xGrid] = {
          ...destination,
          type: "blank",
          description: "",
        };
      }
    }

    // Key Handling
    if (key === "ArrowUp") {
      return {
        ...state,
        map: [...clonedMap],
        keyPressed: { ...state.keyPressed, [key]: true },
        lastKeyPressed: key,
        player: {
          ...state.player,
          position: {
            ...state.player.position,
            yGrid: newYGrid,
            yPixels: newYPixels,
          },
          score: state.player.score + addToScore,
          vector: [vectorX, vectorY],
        },
      };
    }
    if (key === "ArrowDown") {
      return {
        ...state,
        keyPressed: { ...state.keyPressed, [key]: true },
        lastKeyPressed: key,
        map: [...clonedMap],
        player: {
          ...state.player,
          position: {
            top: newYPixels - state.player.radius,
            bottom: newYPixels + state.player.radius,
            left: newXGrid - state.player.radius,
            right: newXGrid + state.player.radius,
            xGrid: state.player.position.xGrid,
            yGrid: newYGrid,
            xPixels: state.player.position.xPixels,
            yPixels: newYPixels,
          },
          score: state.player.score + addToScore,
          vector: [vectorX, vectorY],
        },
      };
    }
    if (key === "ArrowLeft") {
      return {
        ...state,
        keyPressed: { ...state.keyPressed, [key]: true },
        lastKeyPressed: key,
        map: [...clonedMap],
        player: {
          ...state.player,
          position: {
            top: newXGrid - state.player.radius,
            bottom: newXGrid + state.player.radius,
            left: newXGrid - state.player.radius,
            right: newXGrid + state.player.radius,
            xGrid: newXGrid,
            yGrid: state.player.position.yGrid,
            xPixels: newXPixels,
            yPixels: state.player.position.yPixels,
          },
          score: state.player.score + addToScore,
          vector: [vectorX, vectorY],
        },
      };
    }
    if (key === "ArrowRight") {
      return {
        ...state,
        keyPressed: { ...state.keyPressed, [key]: true },
        lastKeyPressed: key,
        map: [...clonedMap],
        player: {
          ...state.player,
          position: {
            top: newXGrid - state.player.radius,
            bottom: newXGrid + state.player.radius,
            left: newXGrid - state.player.radius,
            right: newXGrid + state.player.radius,
            xGrid: newXGrid, // clamp(newXGrid, 1, state.map[0].length - 1),
            yGrid: state.player.position.yGrid,
            xPixels: newXPixels,
            yPixels: state.player.position.yPixels, // state.player.position.yGrid * tileSize + tileSize / 2,
          },
          score: state.player.score + addToScore,
          vector: [vectorX, vectorY],
        },
      };
    }
  }

  return { ...state };
}
