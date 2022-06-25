import { useEffect, useReducer, useRef, useState } from "react";
import { Nav } from "../components/nav";
import { useEventListener } from "../hooks.use-event-listener";
import { handleKeydown } from "./handle-keydown";
import { handleKeyup } from "./handle-keyup";
import { pacmanReducer } from "./pacman-reducer";
import { StateViewer } from "./state-viewer";
import "./style.css";
import { tileMap, tileSize } from "./tile-map";
import { GameStateInterface } from "./types";

const initialGridPosition = { x: 1, y: 1 };
const radius = 15;

export const initialState: GameStateInterface = {
  map: tileMap,
  player: {
    position: {
      xGrid: initialGridPosition.x,
      yGrid: initialGridPosition.y,
      xPixels: initialGridPosition.x * tileSize + tileSize / 2,
      yPixels: initialGridPosition.y * tileSize + tileSize / 2,
      top: initialGridPosition.y * tileSize + tileSize / 2 - radius,
      bottom: initialGridPosition.y * tileSize + tileSize / 2 + radius,
      left: initialGridPosition.x * tileSize + tileSize / 2 - radius,
      right: initialGridPosition.x * tileSize + tileSize / 2 + radius,
    },
    radius: radius,
    speed: 30,
    vector: [0, 0],
    velocity: { x: 0, y: 0 },
  },
  lastKeyPressed: "ArrowDown",
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
  useEventListener("keyup", (evt) =>
    handleKeyup(evt, dispatch, state, deltaTime)
  );

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

  function drawPlayer(
    context: CanvasRenderingContext2D,
    state: GameStateInterface,
    deltaTime: number
  ) {
    context.beginPath();

    context.arc(
      state.player.position.xPixels, // * tileSize + tileSize / 2,
      state.player.position.yPixels, // * tileSize + tileSize / 2,
      state.player.radius,
      0,
      Math.PI * 2
    );
    context.fillStyle = "yellow";
    context.fill();
    context.closePath();
  }

  function drawMap(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // Step 1: Fill the entire canvas with black BEFORE drawing
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // Step 2: Draw our game map
    for (let rowIndex = 0; rowIndex < tileMap.length; rowIndex++) {
      for (
        let cellIndex = 0;
        cellIndex < tileMap[rowIndex].length;
        cellIndex++
      ) {
        const element = tileMap[rowIndex][cellIndex];
        // If it's a regular pellet draw it here, otherwise...
        if (element.description === "points-pellet") {
          context.beginPath();
          context.arc(
            element.xGrid * tileSize + tileSize / 2,
            element.yGrid * tileSize + tileSize / 2,
            3,
            0,
            Math.PI * 2
          );
          context.fillStyle = "white";
          context.fill();
          context.closePath();
        } else {
          // ...continue drawing the map blocks
          context.drawImage(
            element.image,
            element.xGrid * tileSize,
            element.yGrid * tileSize
          );
        }
      }
    }

    context.fill();
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
  }, [drawMap, drawPlayer]);

  return (
    <div className="pacman-wrap">
      <Nav />
      <h1>PACMAN</h1>

      <div className="pacman-container">
        <canvas
          onBlur={() => {
            if (canvasRef && canvasRef.current) {
              canvasRef.current.style.outline = "10px dashed red";
            }

            setTimeout(function () {
              if (canvasRef && canvasRef.current) {
                canvasRef.current.style.outline = "10px dashed transparent";
                canvasRef.current.focus();
              }
            }, 500);
          }}
          tabIndex={0}
          height={600}
          width={600}
          ref={canvasRef}
          {...props}
        />

        <StateViewer state={state} />
      </div>
    </div>
  );
}

export default Canvas;
