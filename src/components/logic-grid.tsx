// Adapted from: https://github.com/mozdevs/gamedev-js-tiles/blob/gh-pages/square/logic-grid.js
import { useReducer, useRef } from "react";
import { useEventListener } from "../hooks.use-event-listener";
import { playerInput } from "../logic-grid-player-input";
import AccordionSections from "./accordion-section";
import { LogicGridCanvas as LogicGridCanvasToo } from "./logic-grid-canvas-v2";
import {
  GameStateInter,
  logicGridGameReducer,
  MapInter,
} from "./logic-grid-game-reducer";
import "./logic-grid.css";
interface LogicGridProps {
  height: number;
  width: number;
  map: MapInter;
  // game: GameInter;
}

const PLAYER_MOVEMENT_KEYS = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];

export function LogicGrid({ height, map, width }: LogicGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initialState: GameStateInter = {
    map: map,
    camera: {
      x: 0,
      y: 0,
      following: { screenX: 0, screenY: 0, x: width / 2, y: height / 2 },
      width: width,
      height: height,
      maxX: map.cols * map.tsize - 512,
      maxY: map.rows * map.tsize - 512,
    },
    hero: {
      x: 0,
      y: 0,
      screenX: 0,
      screenY: 0,
      height: map.tsize,
      width: map.tsize,
    },
    raf: 0,
    rafDelta: 0,
  };

  const [gameState, gameDispatch] = useReducer(
    logicGridGameReducer,
    initialState
  );

  useEventListener("keydown", keyHandler);
  // Beg - Map functions
  const { cols, layers, rows, tsize } = map;

  // End - Map Functions

  // Beg - Hero Functions

  // End - Hero Functions

  function keyHandler({ key }: KeyboardEvent) {
    if (PLAYER_MOVEMENT_KEYS.includes(String(key))) {
      switch (key) {
        case "ArrowUp": {
          playerInput({
            state: { ...gameState },
            dispatch: gameDispatch,
            vector: [0, -1],
          });
          break;
        }

        case "ArrowRight":
          playerInput({
            state: { ...gameState },
            dispatch: gameDispatch,
            vector: [1, 0],
          });
          break;

        case "ArrowLeft":
          playerInput({
            state: { ...gameState },
            dispatch: gameDispatch,
            vector: [-1, 0],
          });
          break;

        case "ArrowDown":
          playerInput({
            state: { ...gameState },
            dispatch: gameDispatch,
            vector: [0, 1],
          });
          break;

        default:
          break;
      }
    }
  }

  function drawLayer(
    state: GameStateInter,
    ctx: CanvasRenderingContext2D | null,
    layer: number
  ) {
    const startCol = Math.floor(state.camera.x / map.tsize);
    const endCol = startCol + state.camera.width / map.tsize;
    const startRow = Math.floor(state.camera.y / map.tsize);
    const endRow = startRow + state.camera.height / map.tsize;
    const offsetX = -state.camera.x + startCol * map.tsize;
    const offsetY = -state.camera.y + startRow * map.tsize;

    // const canvas = canvasRef.current;
    // const ctx = canvas && canvas.getContext("2d");
    const tileImage = new Image();
    tileImage.src = "/assets/tiles.png";

    if (ctx) {
      for (let c = startCol; c <= endCol; c++) {
        for (let r = startRow; r <= endRow; r++) {
          // const tile = getTile(layer, c, r);
          const tile = layers[layer][r * cols + c];

          const x = (c - startCol) * map.tsize + offsetX;
          const y = (r - startRow) * map.tsize + offsetY;

          if (tile !== 0) {
            // 0 => empty tile
            ctx.drawImage(
              tileImage, // image
              (tile - 1) * map.tsize, // source x
              0, // source y
              map.tsize, // source width
              map.tsize, // source height
              Math.round(x), // target x
              Math.round(y), // target y
              map.tsize, // target width
              map.tsize // target height
            );
          }
        }
      }
    }
  }

  function drawHero(
    state: GameStateInter,
    ctx: CanvasRenderingContext2D | null
  ) {
    const heroImage = new Image();
    heroImage.src = "/assets/character.png";
    // const positionX = gameState.hero.x * HERO_SPEED * state.rafDelta;
    // const positionY = gameState.hero.y * state.rafDelta;

    // draw main character
    if (ctx) {
      ctx.drawImage(
        heroImage,
        // gameState.hero.width + gameState.hero.screenX,
        // gameState.hero.height + gameState.hero.screenY
        gameState.hero.screenX - gameState.hero.width / 2,
        gameState.hero.screenY - gameState.hero.height / 2
      );
    }
  }

  return (
    <div className="game-container">
      <LogicGridCanvasToo
        drawLayer={drawLayer}
        drawHero={drawHero}
        gameState={gameState}
        gameDispatch={gameDispatch}
      />
      <AccordionSections
        accordionData={[
          { title: "HERO", content: gameState.hero },
          { title: "CAMERA", content: gameState.camera },
        ]}
      />
    </div>
  );
}
