import { GameStateInterface } from "./types";

interface StateViewerProps {
  state: GameStateInterface;
}

export function StateViewer({ state }: StateViewerProps) {
  return (
    <div className="state-viewer">
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
  );
}
