import { useEffect, useReducer, useRef } from "react";
import { drawMap } from "./draw-map";
import { drawPlayer } from "./draw-player";
import { tileMap } from "./tile-map";
import { GameStateInterface } from "./types";
import "./style.css";
import { StateViewer } from "./state-viewer";
import { Nav } from "../components/nav";

type Action = { type: "init"; payload: GameStateInterface };

const initialState: GameStateInterface = {
  map: tileMap,
  player: { position: { x: 0, y: 0 }, radius: 15 },
  keyPressed: {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  },
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
    <div className="pacman-wrap">
      <Nav />
      <h1>PACMAN</h1>
      <div className="pacman-container">
        <canvas ref={canvasRef}></canvas>
        <StateViewer state={state} />
      </div>
    </div>
  );
}
