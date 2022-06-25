import { Action } from "./pacman-reducer";
import { GameStateInterface } from "./types";

export function handleKeydown(
  { key }: KeyboardEvent,
  dispatch: React.Dispatch<Action>,
  deltaTime: number
) {
  const watchedKeys: GameStateInterface["lastKeyPressed"][] = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ];

  // If we see a keydown event from anything other than our
  // special keys above we return.
  if (!watchedKeys.some((specialKey) => specialKey === key)) {
    return;
  }

  let vectorX = 0;
  let vectorY = 0;
  if (key === "ArrowDown") {
    vectorY = 1;
  }
  if (key === "ArrowUp") {
    vectorY = -1;
  }
  if (key === "ArrowLeft") {
    vectorX = -1;
  }
  if (key === "ArrowRight") {
    vectorX = 1;
  }

  dispatch({
    type: "movePlayer",
    payload: {
      key: key as GameStateInterface["lastKeyPressed"],
      event: "keydown",
      vector: [vectorX, vectorY],
      deltaTime,
    },
  });
}
