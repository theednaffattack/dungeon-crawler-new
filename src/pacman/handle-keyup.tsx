import { Action } from "./pacman-reducer";

export function handleKeyup(
  { key }: KeyboardEvent,
  dispatch: React.Dispatch<Action>
) {
  dispatch({ type: "movePlayer", payload: { key, event: "keyup" } });
}
