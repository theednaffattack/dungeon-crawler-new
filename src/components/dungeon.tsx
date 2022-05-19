import React, { useReducer } from "react";
import { GridAndRooms } from "../create-dungeon";
import { Weapon } from "../create-entities";
import { Coords } from "../game-action";
import { useEventListener } from "../hooks.use-event-listener";
import Accordion from "./accordion";
import { gameReducer, GameActionEnum as GA } from "./game-reducer";
import { PlayerInfo } from "./player-info";
import { potionRegistry as pr } from "../../src/potion-registry";

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
    playerPosition,
    playerHealth,
    playerInventory: { potions: [], weapons: [] },
    dungeonLevel: 1,
  });

  function playerInput(vector: Coords) {
    const [x, y] = state.playerPosition; // get current location
    const [vectorX, vectorY] = vector; // get direction modifier

    const newPosition: Coords = [vectorX + x, vectorY + y]; // define where we're moving to

    const newPlayer = state.entities[y][x];
    const destination = state.entities[y + vectorY][x + vectorX]; // whats in the cell we're heading to

    if (destination.type === "exit") {
      dispatch({
        type: GA.CREATE_LEVEL,
      });
    }

    if (destination.type === "weapon") {
      const { cost, damage, name, type } = destination as Weapon;
      dispatch({
        type: GA.PICKUP_ITEM,
        payload: { cost, damage, name, type },
      });
    }

    if (destination.type === "potion") {
      const {
        elixir: { cost, health, name, type },
      } = pr;

      dispatch({
        type: GA.PICKUP_ITEM,
        payload: { cost, health, name, type },
      });
    }

    if (
      destination.type &&
      destination.type !== "enemy" &&
      destination.type !== "exit" &&
      destination.type !== "boss"
    ) {
      dispatch({
        type: GA.CHANGE_ENTITY,
        payload: { entity: { type: "floor" }, coords: [x, y] },
      });

      dispatch({
        type: GA.CHANGE_ENTITY,
        payload: { entity: newPlayer, coords: newPosition },
      });

      dispatch({
        type: GA.CHANGE_PLAYER_POSITION,
        payload: newPosition,
      });
    }
  }

  function keyHandler({ key }: KeyboardEvent) {
    if (PLAYER_MOVEMENT_KEYS.includes(String(key))) {
      switch (key) {
        case "ArrowUp":
          playerInput([0, -1]);
          break;

        case "ArrowRight":
          playerInput([1, 0]);
          break;

        case "ArrowLeft":
          playerInput([-1, 0]);
          break;

        case "ArrowDown":
          playerInput([0, 1]);
          break;

        default:
          break;
      }
    }
  }

  useEventListener("keydown", keyHandler);

  const [playerX, playerY] = state.playerPosition;

  const entitiesWithFog = state.entities.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      //we create a new property on each cell that measures the distance from the player

      cell.distanceFromPlayer =
        Math.abs(playerY - rowIndex) + Math.abs(playerX - cellIndex);

      const visible = 1;
      const opaque = 0;

      //then we will check if distance is > 10 then set opacity to 0
      cell.opacity = visible;
      if (cell.distanceFromPlayer > 10) {
        cell.opacity = opaque;
      }
      return cell;
    })
  );

  const cells = entitiesWithFog.map((element, rowIndex) => {
    return (
      <div className="row" key={rowIndex}>
        {element.map((cell, cellIndex) => {
          const calculateClasses =
            cell.type !== 0 ? "cell " + cell.type : "cell";
          return (
            <div
              className={calculateClasses}
              id={`row-${rowIndex}_col-${cellIndex}`}
              style={{ opacity: cell.opacity }}
              key={cellIndex}
            ></div>
          );
        })}
      </div>
    );
  });
  const {
    dungeonLevel,
    entities: stateEntities,
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
            playerPosition={position}
            playerHealth={hp}
            playerInventory={playerInventory}
          />
          {cells}
        </div>
      </div>
    </div>
  );
}
