import { useState } from "react";
import { FogState } from "./game-reducer";

export interface FogCheckboxProps {
  fogState: FogState;
  setFogState: React.Dispatch<React.SetStateAction<FogState>>;
}

export function FogCheckbox({ fogState, setFogState }: FogCheckboxProps) {
  function handleChange() {
    const newFogState = fogState === "off" ? "activated" : "off";
    setFogState(newFogState);
  }

  return (
    <label>
      <input
        checked={fogState === "activated" ? true : false}
        onChange={handleChange}
        type="checkbox"
      />
      {fogState === "off" ? "fog is off" : "fog is on"}
    </label>
  );
}
