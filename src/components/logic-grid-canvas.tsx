import React, { useEffect, useRef } from "react";
import { useAnimationFrame } from "../hooks.use-request-animation-frame";
import { GameAction } from "./logic-grid-game-reducer";

type CanvasProps = {
  draw: (ctx: CanvasRenderingContext2D | null, layer: number) => void;
  drawHero(ctx: CanvasRenderingContext2D | null): void;
};

function LogicGridCanvas({ draw, drawHero }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvas = canvasRef.current;
  if (canvas == null) {
    console.error("Canvas is null!");
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) {
      console.error("Canvas is null!");
    }
    const context = canvas && canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId: number;

    function render() {
      frameCount++;

      // draw map background layer
      draw(context, 0);

      // draw main character
      drawHero(context);

      // draw map top layer
      draw(context, 1);
      animationFrameId = window.requestAnimationFrame(render);
    }

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, drawHero]);

  return <canvas width={768} height={768} ref={canvasRef} />;
}

export default LogicGridCanvas;
