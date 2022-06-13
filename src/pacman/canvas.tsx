import { useEffect, useRef, useState } from "react";

export function Canvas() {
  const [deltaTimeState, setDeltaTimeState] = useState(0);

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function animate(time: number) {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      // // Pass on a function to the setter of the state
      // // to make sure we always have the latest state
      // setCount((prevCount) => (prevCount + deltaTime * 0.01) % 100);
      setDeltaTimeState((prevDelta) => {
        return (prevDelta + deltaTime * 0.01) % 100;
      });
      if (context != null) {
        drawCircle(context, deltaTimeState);
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  function drawCircle(
    context: CanvasRenderingContext2D,
    deltaRafTime: number
  ): void {
    // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    console.log("INSIDE ANIMATE FUNC", { deltaRafTime });
    context.beginPath();
    context.arc(50, 50, 30, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.fill();
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  return (
    <div>
      <canvas ref={canvasRef}>
        Whoops! You're browser does not support the Canvas Element!
      </canvas>
    </div>
  );
}
