import { useEffect, useRef } from "react";
import { Canvas } from "./canvas";
import { tileMap } from "./tile-map";

export function Pacman() {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <Canvas />
      </div>
      <div
        style={{
          padding: 12,
          backgroundColor: "FloralWhite",
          color: "rgb(31, 45, 61)",
        }}
      >
        <h2>STATE VIEWER</h2>
        <p>TILE SIZE: 40</p>
      </div>
    </div>
  );
}
