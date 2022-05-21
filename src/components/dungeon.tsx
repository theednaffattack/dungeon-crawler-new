import { useReducer, useState } from "react";
import { GridAndRooms } from "../create-dungeon";
import { Coords } from "../game-action";
import { useEventListener } from "../hooks.use-event-listener";
import { playerInput } from "../player-input";
import { Cell } from "./cell";
import { FogState, gameReducer } from "./game-reducer";
import { PlayerInfo } from "./player-info";

interface Entities {
  entities: GridAndRooms;
  playerPosition: Coords;
}

interface DungeonProps {
  entities: Entities;
  playerHealth: number;
}

export default function Dungeon({
  entities: { entities, playerPosition },
  playerHealth,
}: DungeonProps) {
  const PLAYER_MOVEMENT_KEYS = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ];

  const [state, dispatch] = useReducer(gameReducer, {
    entities: entities.grid,
    equippedWeapon: null,
    playerPosition,
    playerHealth,
    playerInventory: { potions: [], weapons: [] },
    dungeonLevel: 1,
  });

  const [fogState, setFogState] = useState<FogState>("activated");

  function keyHandler({ key }: KeyboardEvent) {
    if (PLAYER_MOVEMENT_KEYS.includes(String(key))) {
      switch (key) {
        case "ArrowUp":
          playerInput({
            state,
            dispatch,
            vector: [0, -1],
          });
          break;

        case "ArrowRight":
          playerInput({ state, dispatch, vector: [1, 0] });
          break;

        case "ArrowLeft":
          playerInput({ state, dispatch, vector: [-1, 0] });
          break;

        case "ArrowDown":
          playerInput({ state, dispatch, vector: [0, 1] });
          break;

        default:
          break;
      }
    }
  }

  useEventListener("keydown", keyHandler);

  const [playerX, playerY] = state.playerPosition;

  const cells = state.entities.map((element, rowIndex) => {
    return (
      <div className="row" key={rowIndex}>
        {element.map((cell, cellIndex) => {
          const calculateClasses =
            cell.type !== 0 ? "cell " + cell.type : "cell";

          cell.distanceFromPlayer =
            Math.abs(playerY - rowIndex) + Math.abs(playerX - cellIndex);

          return (
            <Cell
              key={`R:${rowIndex}-C:${cellIndex}`}
              column={cellIndex}
              distanceFromPlayer={cell.distanceFromPlayer}
              fogState={fogState}
              row={rowIndex}
              type={cell.type}
            />
            // <div
            //   className={calculateClasses}
            //   id={`row-${rowIndex}_col-${cellIndex}`}
            //   style={{ opacity: cell.opacity }}
            //   key={cellIndex}
            // ></div>
          );
        })}
      </div>
    );
  });

  const {
    dungeonLevel,
    entities: stateEntities,
    equippedWeapon,
    playerHealth: hp,
    playerInventory,
    playerPosition: position,
  } = state;

  return (
    <div className="wrapper">
      <div className="app">
        <div className="flex-container">
          <PlayerInfo
            dungeonLevel={dungeonLevel}
            entities={stateEntities}
            equippedWeapon={equippedWeapon}
            playerPosition={position}
            playerHealth={hp}
            playerInventory={playerInventory}
            fogState={fogState}
            setFogState={setFogState}
          />
          {cells}
        </div>
      </div>
    </div>
  );
}
