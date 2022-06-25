import { GameStateInterface } from "./types";

interface StateViewerProps {
  state: GameStateInterface;
}

export function StateViewer({ state }: StateViewerProps) {
  const roundedNewX = Math.round(state.player.position.xGrid * 1000) / 1000;
  const roundedNewY = Math.round(state.player.position.yGrid * 1000) / 1000;

  const roundedNewXPixels =
    Math.round(state.player.position.xPixels * 1000) / 1000;
  const roundedNewYPixels =
    Math.round(state.player.position.yPixels * 1000) / 1000;

  const showTop = Number.isNaN(
    Math.round(state.player.position.top * 100) / 100
  )
    ? 0
    : Math.round(state.player.position.right * 100) / 100;

  const showRight = Number.isNaN(
    Math.round(state.player.position.right * 100) / 100
  )
    ? 0
    : Math.round(state.player.position.right * 100) / 100;

  const showBottom = Number.isNaN(
    Math.round(state.player.position.bottom * 100) / 100
  )
    ? 0
    : Math.round(state.player.position.bottom * 100) / 100;

  const showLeft = Number.isNaN(
    Math.round(state.player.position.left * 100) / 100
  )
    ? 0
    : Math.round(state.player.position.left * 100) / 100;

  return (
    <div className="state-viewer">
      <h1>STATE VIEWER</h1>
      <p className="state">Vector X: {state.player.vector[0]}</p>
      <p className="state">Vector Y: {state.player.vector[1]}</p>
      <p>&#8595;:{state.keyPressed.ArrowDown.toString()}</p>
      <p>&#8593;:{state.keyPressed.ArrowUp.toString()}</p>
      <p>&#8594;:{state.keyPressed.ArrowRight.toString()}</p>
      <p>&#8592;:{state.keyPressed.ArrowLeft.toString()}</p>
      <p>LAST KEY:{state.lastKeyPressed}</p>
      <p className="state">
        Player Radius: <span>{state.player.radius}</span>
      </p>{" "}
      <p className="state">
        Player X: <span>{roundedNewX}</span>
      </p>
      <p className="state">
        Player Y: <span>{roundedNewY}</span>
      </p>
      <p className="state">
        Player X Pixel: <span>{roundedNewXPixels}</span>
      </p>
      <p className="state">
        Player Y Pixel: <span>{roundedNewYPixels}</span>
      </p>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed limegreen",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          <p className="state">T</p>
          <p className="state">{showTop}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed limegreen",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          <p className="state">R</p>
          <p className="state">{showRight}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed limegreen",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          <p className="state">B</p>
          <p className="state">{showBottom}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed limegreen",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          <p className="state">L</p>
          <p className="state">{showLeft}</p>
        </div>
      </div>
    </div>
  );
}
