import { useReducer, useRef } from "react";
import { createDungeon } from "../create-dungeon";
import { createEntities } from "../create-entities";
import { useEventListener } from "../hooks.use-event-listener";
import { playerInput } from "../player-input";
import { DungeonProps } from "./static-dungeon";
import { GameState } from "./game-reducer";
import tileAtlas from "../assets/tiles.png";

const PLAYER_MOVEMENT_KEYS = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];

interface ScrollingGameState {
  camera: {
    x: number;
    y: number;
    width: number;
    height: number;
    maxX: number;
    maxY: number;
    SPEED: number;
  };
  map: {};
  game: GameState;
}

interface Map {
  cols: number;
  rows: number;
  tsize: number;
  layers: number[][];
}

function reducer(state: ScrollingGameState) {
  return {
    ...state,
  };
}

// Adapted from: https://koenvangilst.nl/blog/react-hooks-with-canvas
export function ScrollingGrid({ entities, playerHealth }: DungeonProps) {
  useEventListener("keydown", keyHandler);
  const map = {
    cols: 12,
    rows: 12,
    tsize: 64,
    layers: [
      [
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
        3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3,
      ],
      [
        4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3,
      ],
    ],
  };

  /**
   * initialState
   * x and y: The current position of the camera.
   * In this implementation, we are assuming that (x,y)
   * points to the top left corner of visible portion
   * of the map.
   *
   * width and height: The size of the camera's viewport.
   *
   * maxX and maxY: The limit for the camera's position —
   * The lower limit will nearly always be (0,0), and in
   * this case the upper limit is equal to the size of the
   * world minus the size of the camera's viewport.
   */
  const initialState: ScrollingGameState = {
    camera: {
      x: 0,
      y: 0,
      width: 600,
      height: 600,
      maxX: 10,
      maxY: 10,
      SPEED: 256,
    },
    map: {},
    game: {
      entities: entities.entities.grid,
      equippedWeapon: null,
      playerPosition: entities.playerPosition,
      playerHealth,
      playerInventory: { potions: [], weapons: [] },
      dungeonLevel: 1,
    },
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const what = canvasRef.current;
  const [gameState, gameDispatch] = useReducer(reducer, initialState);

  function keyHandler({ key }: KeyboardEvent) {
    if (PLAYER_MOVEMENT_KEYS.includes(String(key))) {
      switch (key) {
        case "ArrowUp":
          playerInput({
            state: gameState.game,
            dispatch: gameDispatch,
            vector: [0, -1],
          });
          break;

        case "ArrowRight":
          playerInput({
            state: gameState.game,
            dispatch: gameDispatch,
            vector: [1, 0],
          });
          break;

        case "ArrowLeft":
          playerInput({
            state: gameState.game,
            dispatch: gameDispatch,
            vector: [-1, 0],
          });
          break;

        case "ArrowDown":
          playerInput({
            state: gameState.game,
            dispatch: gameDispatch,
            vector: [0, 1],
          });
          break;

        default:
          break;
      }
    }
  }
  function getTile(layer: number, col: number, row: number) {
    return map.layers[layer][row * map.cols + col];
  }

  function move(
    state: ScrollingGameState,
    delta: number,
    dirx: number,
    diry: number
  ) {
    // move camera
    state.camera.x += dirx * Camera.SPEED * delta;
    state.camera.y += diry * Camera.SPEED * delta;
    // clamp values
    state.camera.x = Math.max(0, Math.min(state.camera.x, state.camera.maxX));
    state.camera.y = Math.max(0, Math.min(state.camera.y, state.camera.maxY));
  }

  function _drawLayer(layer: number) {
    const startCol = Math.floor(gameState.camera.x / map.tsize);
    const endCol = startCol + gameState.camera.width / map.tsize;
    const startRow = Math.floor(gameState.camera.y / map.tsize);
    const endRow = startRow + gameState.camera.height / map.tsize;
    const offsetX = -gameState.camera.x + startCol * map.tsize;
    const offsetY = -gameState.camera.y + startRow * map.tsize;

    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext("2d");
    const image = new Image();
    image.src = tileAtlas;

    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        const tile = getTile(layer, c, r);
        const x = (c - startCol) * map.tsize + offsetX;
        const y = (r - startRow) * map.tsize + offsetY;
        if (ctx && tile !== 0) {
          // 0 => empty tile
          ctx.drawImage(
            image, // image
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

  _drawLayer(1);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={(cvsClickEvent) => {
        const { clientX, clientY } = cvsClickEvent;
        cvsClickEvent.preventDefault();

        const canvas = canvasRef.current;
        const ctx = canvas && canvas.getContext("2d");
        if (ctx) {
          draw(ctx, { x: clientX, y: clientY });
        }
      }}
    />
  );
}

interface LocationProps {
  x: number;
  y: number;
}

// A quick draw function copied from: https://koenvangilst.nl/blog/react-hooks-with-canvas#2nd-hook-usestate
function draw(ctx: CanvasRenderingContext2D, location: LocationProps) {
  const HOOK_SVG =
    "m129.03125 63.3125c0-34.914062-28.941406-63.3125-64.519531-63.3125-35.574219 0-64.511719 28.398438-64.511719 63.3125 0 29.488281 20.671875 54.246094 48.511719 61.261719v162.898437c0 53.222656 44.222656 96.527344 98.585937 96.527344h10.316406c54.363282 0 98.585938-43.304688 98.585938-96.527344v-95.640625c0-7.070312-4.640625-13.304687-11.414062-15.328125-6.769532-2.015625-14.082032.625-17.960938 6.535156l-42.328125 64.425782c-4.847656 7.390625-2.800781 17.3125 4.582031 22.167968 7.386719 4.832032 17.304688 2.792969 22.160156-4.585937l12.960938-19.71875v42.144531c0 35.582032-29.863281 64.527344-66.585938 64.527344h-10.316406c-36.714844 0-66.585937-28.945312-66.585937-64.527344v-162.898437c27.847656-7.015625 48.519531-31.773438 48.519531-61.261719zm-97.03125 0c0-17.265625 14.585938-31.3125 32.511719-31.3125 17.929687 0 32.511719 14.046875 32.511719 31.3125 0 17.261719-14.582032 31.3125-32.511719 31.3125-17.925781 0-32.511719-14.050781-32.511719-31.3125zm0 0";
  const HOOK_PATH = new Path2D(HOOK_SVG);
  const SCALE = 0.3;
  const OFFSET = 80;

  ctx.fillStyle = "deepskyblue";
  ctx.shadowColor = "dodgerblue";
  ctx.shadowBlur = 20;
  ctx.save();
  ctx.scale(SCALE, SCALE);
  ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  ctx.fill(HOOK_PATH);
  ctx.restore();
}
