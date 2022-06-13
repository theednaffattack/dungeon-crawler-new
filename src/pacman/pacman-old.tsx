import { useEffect, useReducer, useRef } from "react";
import { Nav } from "../components/nav";
import { useEventListener } from "../hooks.use-event-listener";
import { drawMap } from "./draw-map";
import { drawPlayer } from "./draw-player";
import { handleKeydown } from "./handle-keydown";
import { handleKeyup } from "./handle-keyup";
import { pacmanReducer } from "./pacman-reducer";
import { StateViewer } from "./state-viewer";
import "./style.css";
import { tileMap, tileSize } from "./tile-map";
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

export function Pacman() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let secondsPassedRef = useRef<number>(0);
  let oldTimeStampRef = useRef<number>(0);

  const [state, dispatch] = useReducer(pacmanReducer, initialState);

  const lastRenderTimeRef = useRef<number>(Date.now());
  const animationFrameRequestRef = useRef<number | null>(null);

  // BEG - GAME LOOP VARIABLES
  const secondsPassed = useRef<number>(0);
  const oldTimeStamp = useRef<number>(0);
  // END - GAME LOOP VARIABLES

  useEventListener("keydown", (evt) =>
    handleKeydown(evt, dispatch, lastRenderTimeRef.current)
  );
  useEventListener("keyup", (evt) => handleKeyup(evt, dispatch));

  // useEffect(() => {
  //   lastRenderTimeRef.current = Date.now();
  //   animationFrameRequestRef.current = requestAnimationFrame(render);
  //   return () => {
  //     if (animationFrameRequestRef.current != null) {
  //       cancelAnimationFrame(animationFrameRequestRef.current);
  //     }
  //   };
  // }, [state.player.position]);

  // New Render
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    //Our draw came here
    // const render = () => {
    //   frameCount++
    //   draw(context, frameCount)
    //   animationFrameId = window.requestAnimationFrame(render)
    // }
    newRender();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext("2d");

  //     return () => {
  //       window.cancelAnimationFrame(animationFrameId);
  //     };
  //   }
  // }, [drawMap, drawPlayer, state.player.position]);

  //Our draw came here
  function render() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context != null) {
      // Calculate how much time has passed
      const timeNow = Date.now();
      const deltaTime = timeNow - lastRenderTimeRef.current;

      canvas.width = tileSize * 11;
      canvas.height = tileSize * 13;
      clearBackground(context);
      drawMap(context);
      drawPlayer(context, state, deltaTime);
      animationFrameRequestRef.current = window.requestAnimationFrame(render);
    }
  }

  function newRender(delta: number) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context != null) {
      drawMap(context);
      drawPlayer(context, state, delta);
    }
  }

  function gameLoop(timeStamp: number) {
    // Calculate how much time has passed
    secondsPassed.current = (timeStamp - oldTimeStamp.current) / 1000;
    oldTimeStamp.current = timeStamp;

    // Pass the time to the update
    newRender(secondsPassed.current);
    // update(secondsPassed);
    // draw();

    window.requestAnimationFrame(gameLoop);
  }

  function clearBackground(context: CanvasRenderingContext2D) {
    const { width, height } = context.canvas;
    context.rect(0, 0, width, height);
    context.fillStyle = "black";
    context.fill();
  }

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
