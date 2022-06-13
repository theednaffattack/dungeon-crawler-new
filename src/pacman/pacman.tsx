import { useEffect, useReducer, useRef, useState } from "react";
import { Nav } from "../components/nav";
import { useEventListener } from "../hooks.use-event-listener";
import { drawMap } from "./draw-map";
import { drawPlayer } from "./draw-player";
import { handleKeydown } from "./handle-keydown";
import { handleKeyup } from "./handle-keyup";
import { pacmanReducer } from "./pacman-reducer";
import { StateViewer } from "./state-viewer";
import "./style.css";
import { tileMap } from "./tile-map";
import { GameStateInterface } from "./types";

export const initialState: GameStateInterface = {
  map: tileMap,
  player: { position: { x: 1, y: 1 }, radius: 15, velocity: { x: 0, y: 0 } },
  keyPressed: {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  },
};

export function Canvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousTimeRef = useRef<number>(0);

  const [deltaTime, setDeltaTime] = useState<number>(0);

  const [state, dispatch] = useReducer(pacmanReducer, initialState);

  useEventListener("keydown", (evt) => handleKeydown(evt, dispatch, deltaTime));
  useEventListener("keyup", (evt) => handleKeyup(evt, dispatch));

  function draw(ctx: CanvasRenderingContext2D, frameDeltaInSeconds: number) {
    const speed = 4;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(
      50,
      100,
      20 * Math.sin(frameDeltaInSeconds * speed) ** 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    let frameCount = 0;
    let animationFrameId: number;

    //Our draw came here
    function render(time?: number) {
      if (context != null && time) {
        const calcDeltaTime = time && time - previousTimeRef.current;
        setDeltaTime(calcDeltaTime);
        // frameCount++;
        previousTimeRef.current = time;
        drawMap(context);
        drawPlayer(context, state, calcDeltaTime);
        // draw(context, deltaTime / 1000);
      }
      animationFrameId = window.requestAnimationFrame(render);
    }

    // Call our render function
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <div className="pacman-wrap">
      <Nav />
      <h1>PACMAN</h1>

      <div className="pacman-container">
        <canvas height={600} width={600} ref={canvasRef} {...props} />

        <StateViewer state={state} />
      </div>
    </div>
  );
}

export default Canvas;
