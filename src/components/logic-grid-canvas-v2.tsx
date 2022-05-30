import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { GameAction, GameStateInter } from "./logic-grid-game-reducer";

interface LogicGridCanvasProps {
  drawLayer: (
    gameState: GameStateInter,
    ctx: CanvasRenderingContext2D | null,
    layer: number
  ) => void;
  drawHero(state: GameStateInter, ctx: CanvasRenderingContext2D | null): void;
  gameDispatch: React.Dispatch<GameAction>;
  gameState: GameStateInter;
}

export function LogicGridCanvas({
  drawHero,
  drawLayer,
  gameDispatch,
  gameState,
}: LogicGridCanvasProps) {
  // get canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // set frame counter
  const [counter, setCounter] = useState(0);
  const [shouldStop, setShouldStop] = useState(true);

  // box position and speed
  const [positionX, setPositionX] = useState(165);
  const [positionY, setPositionY] = useState(165);

  const [dx, setDx] = useState(2);
  const [dy, setDy] = useState(1.5);

  const [motionType, setMotionType] = useState("Circle");

  // update the counter
  useLayoutEffect(() => {
    if (shouldStop) {
      let timerId: number;

      const animate = (elapsed: number) => {
        setCounter((prevState) => prevState + 1);

        // compute delta time in seconds -- also cap it
        const timeDiffInSeconds = (elapsed - gameState.raf) / 1000.0;
        const cappedDelta = Math.min(timeDiffInSeconds, 0.25); // maximum delta of 250 ms

        gameDispatch({ type: "updateRafDelta", payload: cappedDelta });
        gameDispatch({ type: "updateRafElapsed", payload: elapsed });
        timerId = requestAnimationFrame(animate);
      };
      timerId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(timerId);
    }
  }, [shouldStop]);

  // output graphics
  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas && canvas.getContext("2d");
    if (context) {
      context && context.clearRect(0, 0, 350, 350);

      // draw map background layer
      drawLayer(gameState, context, 0);

      // draw main character
      drawHero(gameState, context);

      // draw map top layer
      drawLayer(gameState, context, 1);

      // collision
      if (positionX > 300) {
        setDx((dxPrev) => dxPrev * -1);
        setPositionX((x) => x - 10);
      }
      if (positionX < 30) {
        setDx((dxPrev) => dxPrev * -1);
        setPositionX((x) => x + 10);
      }
      if (positionY > 300) {
        setDy((dyPrev) => dyPrev * -1);
        setPositionY((y) => y - 10);
      }
      if (positionY < 30) {
        setDy((dyPrev) => dyPrev * -1);
        setPositionY((y) => y + 10);
      }

      // context.fillStyle = "#555555";
      // context.fillRect(positionX, positionY, 20, 20);
    }
  }, [counter]);

  const changeMotionType = () => {
    if (motionType === "Circle") {
      setMotionType("Bounce");
    } else {
      setMotionType("Circle");
    }
  };

  return (
    <div className="container">
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        onClick={changeMotionType}
      />
      <h3>Frame count: {counter}</h3>

      <button onClick={() => setShouldStop(!shouldStop)}>
        {shouldStop ? "Stop" : "Start"}
      </button>
    </div>
  );
}
