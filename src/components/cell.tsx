import { PropsWithChildren } from "react";
import { GridSquare } from "../create-dungeon";
import { FogState } from "./game-reducer";

interface CellProps extends GridSquare {
  row: number;
  column: number;
  fogState?: FogState;
}

export function Cell({
  children,
  column,
  distanceFromPlayer,
  fogState,
  row,
  type,
}: PropsWithChildren<CellProps>) {
  const calculateVisibility =
    fogState &&
    fogState === "activated" &&
    distanceFromPlayer &&
    distanceFromPlayer > 10
      ? "visible"
      : "opaque";
  const calculateOtherClasses = type !== 0 ? "cell " + type : "cell";
  return (
    <div
      className={`${calculateVisibility} ${calculateOtherClasses}`}
      id={`R:${row}-C:${column}`}
    >
      {children}
    </div>
  );
}
