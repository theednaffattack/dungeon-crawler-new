import { useEffect, useRef } from "react";
import { drawMap } from "./draw-map";
import { drawPlayer } from "./draw-player";
import { tileMap } from "./tile-map";
import { GameStateInterface } from "./types";
import "./style.css";

type Action = { type: "init"; payload: GameStateInterface };

const initialState: GameStateInterface = {
  map: tileMap,
  player: { position: { x: 0, y: 0 }, radius: 15 },
};

function reducer(
  state: GameStateInterface,
  action: Action
): GameStateInterface {
  switch (action.type) {
    case "init":
      return { ...state };

    default:
      return initialState;
  }
}

export const tileSize = 40;
export function Pacman() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      let frameCount = 0;
      let animationFrameId: number;

      //Our draw came here
      function render() {
        if (context) {
          canvas.width = tileSize * 11;
          canvas.height = tileSize * 13;
          frameCount++;
          drawMap(context, frameCount);
          drawPlayer(context);
          animationFrameId = window.requestAnimationFrame(render);
        }
      }

      if (context) {
        render();
      }

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [drawMap]);

  return (
    <div className="pacman-container">
      <canvas ref={canvasRef}></canvas>
      <div>
        <h1>STATE VIEWER</h1>
        <p className="state">
          ArrowDown: {state.keyPressed.ArrowDown.toString()}
        </p>
        <p className="state">ArrowUp: {state.keyPressed.ArrowUp.toString()}</p>
        <p className="state">
          ArrowLeft: {state.keyPressed.ArrowLeft.toString()}
        </p>
        <p className="state">
          ArrowRight: {state.keyPressed.ArrowRight.toString()}
        </p>
        <p className="state">Player X: {state.player.position.x}</p>
        <p className="state">Player Y: {state.player.position.y}</p>
      </div>
    </div>
  );
}
