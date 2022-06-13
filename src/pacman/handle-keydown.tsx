import { Action } from "./pacman-reducer";

export function handleKeydown(
  { key }: KeyboardEvent,
  dispatch: React.Dispatch<Action>,
  deltaTime: number
) {
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
    payload: { key, event: "keydown", vector: [vectorX, vectorY], deltaTime },
  });
}
