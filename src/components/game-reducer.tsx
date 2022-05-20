import { GridSquare, GridAndRooms, createDungeon } from "../create-dungeon";
import { createEntities, HealthPotion, Weapon } from "../create-entities";
import { GameActionEnum as GA } from "../types";

export interface Entities {
  entities: GridAndRooms;
  playerPosition: Coords;
}

interface CreateLevelPayload {
  entities: GridAndRooms["grid"];
  playerPosition: Coords;
}

export type XCoord = number;
export type YCoord = number;
export type Coords = [XCoord, YCoord];

export type FogState = "off" | "activated";

export interface GameState {
  dungeonLevel: number;
  entities: Entities["entities"]["grid"];
  playerPosition: Coords;
  playerHealth: number;
  playerInventory: {
    potions: HealthPotion[];
    weapons: Weapon[];
  };
}

export type GameAction =
  | {
      type: GA.CHANGE_ENTITY;
      payload: { entity: GridSquare; coords: Coords };
    }
  | { type: GA.CHANGE_PLAYER_POSITION; payload: Coords }
  | { type: GA.CREATE_LEVEL; payload?: CreateLevelPayload }
  | { type: GA.SET_DUNGEON_LEVEL; payload: number }
  | { type: GA.PICKUP_WEAPON; payload: Weapon }
  | { type: GA.PICKUP_HEALTH_POTION; payload: HealthPotion }
  | { type: GA.PICKUP_ITEM; payload: HealthPotion | Weapon };

export function gameReducer(
  state: GameState,
  { type, payload }: GameAction
): GameState {
  switch (type) {
    case GA.CHANGE_ENTITY: {
      // here we use the update function from 'react-addons-update' library
      //basicaly we are just creating an new object(updating) from  the entities array
      //and changing only the entities[y][x]
      const [x, y] = payload.coords;
      const entitiesCopy = [...state.entities];

      entitiesCopy[y][x] = payload.entity;
      return { ...state, entities: entitiesCopy };
    }
    case GA.CHANGE_PLAYER_POSITION: {
      // when the user will press the 'up' key it will send an action to the Redux store
      // this action will have it's current coords, and starting from that we will
      //generate a new grid with the newly created player position
      return { ...state, playerPosition: payload };
    }
    case GA.CREATE_LEVEL: {
      let dungeon = createDungeon();
      let entities = createEntities(dungeon, state.dungeonLevel + 1);
      console.log(GA.CREATE_LEVEL, {
        pos: entities.playerPosition,
      });
      return {
        ...state,
        playerPosition: entities.playerPosition,
        entities: entities.entities.grid,
        dungeonLevel: state.dungeonLevel + 1,
      };
    }

    case GA.PICKUP_ITEM: {
      // If it's a weapon there should be properties
      // for "cost" and "damage"
      if ("cost" in payload && "damage" in payload) {
        const { cost, damage, type, name } = payload;
        return {
          ...state,
          playerInventory: {
            ...state.playerInventory,
            weapons: [
              ...state.playerInventory.weapons,
              {
                cost,
                damage,
                type,
                name,
              },
            ],
          },
        };
      }
      if ("health" in payload) {
        const { cost, health, name, type } = payload;
        return {
          ...state,
          playerInventory: {
            ...state.playerInventory,
            potions: [
              ...state.playerInventory.potions,
              { cost, health, name, type },
            ],
          },
        };
      }
      // othewise...
      console.error("PICKUP_ITEM:: This state should be impossible!");
      return state;
    }

    case GA.SET_DUNGEON_LEVEL:
      return { ...state, dungeonLevel: payload };

    default:
      return state;
  }
}
