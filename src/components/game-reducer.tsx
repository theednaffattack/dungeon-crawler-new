import { GameState, GameAction } from "./dungeon";

export function gameReducer(
  state: GameState,
  { type, payload }: GameAction
): GameState {
  switch (type) {
    case "CHANGE_ENTITY": {
      // here we use the update function from 'react-addons-update' library
      //basicaly we are just creating an new object(updating) from  the entities array
      //and changing only the entities[y][x]
      const [x, y] = payload.coords;
      const entitiesCopy = [...state.entities];

      entitiesCopy[y][x] = payload.entity;
      return { ...state, entities: entitiesCopy };
    }
    case "CHANGE_PLAYER_POSITION": {
      // when the user will press the 'up' key it will send an action to the Redux store
      // this action will have it's current coords, and starting from that we will
      //generate a new grid with the newly created player position
      return { ...state, playerPosition: payload };
    }
    case "CREATE_LEVEL":
      return {
        ...state,
        playerPosition: payload.playerPosition,
        entities: payload.entities,
      };

    case "SET_DUNGEON_LEVEL":
      return { ...state, dungeonLevel: payload };

    default:
      return state;
  }
}
