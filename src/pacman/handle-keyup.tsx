import { Action } from "./pacman-reducer";
import { GameStateInterface } from "./types";

export function handleKeyup(
  { key }: KeyboardEvent,
  dispatch: React.Dispatch<Action>,
  state: GameStateInterface,
  deltaTime: number
) {
  const watchedKeys: GameStateInterface["lastKeyPressed"][] = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ];

  // If we see a keyup event from anything other than our
  // special keys above we return.
  if (!watchedKeys.some((specialKey) => specialKey === key)) {
    return;
  }

  // Set directionality
  let vectorX = state.player?.vector[0] ?? 0;
  let vectorY = state.player?.vector[1] ?? 0;
  if (key === "ArrowUp") {
    vectorY = 0;
  }
  if (key === "ArrowDown") {
    vectorY = 0;
  }
  if (key === "ArrowLeft") {
    vectorX = 0;
  }
  if (key === "ArrowRight") {
    vectorX = 0;
  }

  dispatch({
    type: "movePlayer",
    payload: {
      key: key as GameStateInterface["lastKeyPressed"],
      event: "keyup",
      vector: [vectorX, vectorY],
      deltaTime,
    },
  });
}
