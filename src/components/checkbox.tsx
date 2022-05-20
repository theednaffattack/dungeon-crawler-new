import { useState } from "react";
import { FogState } from "./game-reducer";

export interface FogCheckboxProps {
  fogState: FogState;
  setFogState: React.Dispatch<React.SetStateAction<FogState>>;
}

export function FogCheckbox({ fogState, setFogState }: FogCheckboxProps) {
  // const [checked, setChecked] = useState(true);

  function handleChange() {
    // setChecked(!checked);
    const newFogState = fogState === "off" ? "activated" : "off";
    setFogState(newFogState);
    console.log("CHECKBOX ON CHANGE HANDLER", {
      // checked,
      fogState,
      newFogState,
    });
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
