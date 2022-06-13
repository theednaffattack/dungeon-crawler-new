import { GameStateInterface } from "./types";

interface StateViewerProps {
  state: GameStateInterface;
}

export function StateViewer({ state }: StateViewerProps) {
  return (
    <div className="state-viewer">
      <h1>STATE VIEWER</h1>
      <p className="state">
        ArrowDown: <span>{state.keyPressed.ArrowDown.toString()}</span>
      </p>
      <p className="state">
        ArrowUp: <span>{state.keyPressed.ArrowUp.toString()}</span>
      </p>
      <p className="state">
        ArrowLeft: <span>{state.keyPressed.ArrowLeft.toString()}</span>
      </p>
      <p className="state">
        ArrowRight: <span> {state.keyPressed.ArrowRight.toString()}</span>
      </p>
      <p className="state">
        Player X: <span>{state.player.position.x}</span>
      </p>
      <p className="state">
        Player Y: <span>{state.player.position.y}</span>
      </p>
      <p className="state">
        Player Velocity X: <span>{state.player.velocity.x}</span>
      </p>
      <p className="state">
        Player Velocity Y: <span>{state.player.velocity.y}</span>
      </p>
    </div>
  );
}
