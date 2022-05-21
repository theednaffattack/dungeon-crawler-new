import { PropsWithChildren } from "react";
import { FogCheckbox } from "./fog-checkbox";

interface GameControlsProps {}

export function GameControls({
  children,
}: PropsWithChildren<GameControlsProps>) {
  return <div className="game-controls">{children}</div>;
}
