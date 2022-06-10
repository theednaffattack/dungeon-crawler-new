import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Adapted from: https://github.com/ptifur/react-request-animation-frame/blob/main/src/components/CanvasPractice.js
// also from: https://dev.to/ptifur/animation-with-canvas-and-requestanimationframe-in-react-5ccj
export function CanvasDemo() {
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
    if (!shouldStop) {
      let timerId: number;

      const animate = () => {
        setCounter((prevState) => prevState + 1);
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

      // motion
      if (motionType === "Circle") {
        setPositionX((x) => Math.sin(counter * 0.025) * 130 + 165);
        setPositionY((y) => -Math.cos(counter * 0.025) * 130 + 165);
      }
      if (motionType === "Bounce") {
        setPositionX((x) => x + dx);
        setPositionY((y) => y + dy);
      }

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

      context.fillStyle = "#555555";
      context.fillRect(positionX, positionY, 20, 20);
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
        width="350px"
        height="350px"
        onClick={changeMotionType}
      />
      <h3>Frame count: {counter}</h3>
      <p>Motion type is {motionType}</p>
      <button onClick={() => setShouldStop(!shouldStop)}>
        {shouldStop ? "Start" : "Stop"}
      </button>
    </div>
  );
}
