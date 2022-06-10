import {
  GameAction,
  GameStateInter,
} from "./components/logic-grid-game-reducer";
import { Weapon } from "./create-entities";
import { Coords } from "./game-action";
import { HERO_SPEED } from "./logic-grid-constants";
import { potionRegistry as pr } from "./potion-registry";
// import { GameActionEnum as GA } from "./types";

interface PlayerInputProps {
  dispatch: React.Dispatch<GameAction>;
  state: GameStateInter;
  vector: Coords;
}

export function playerInput({ dispatch, state, vector }: PlayerInputProps) {
  // get current location
  const { x, y } = state.hero;
  // const [x, y] = state.playerPosition; // get current location
  const [vectorX, vectorY] = vector; // get direction modifier

  // const newPosition: Coords = [vectorX + x, vectorY + y]; // define where we're moving to
  // state.x * HERO_SPEED * state.raf;
  // const newPlayer = state.entities[y][x];
  // const destination = state.entities[y + vectorY][x + vectorX]; // whats in the cell we're heading to
  // const destination = state.map.layers[screenY / state.hero.height][
  //   screenX / state.hero.width
  // ]

  // clamp values
  const maxX = state.map.cols * state.map.tsize;
  const maxY = state.map.rows * state.map.tsize;

  const movePlayerPayload = {
    newScreenX: state.hero.screenX + vector[0] * HERO_SPEED * state.rafDelta,
    newScreenY: state.hero.screenY + vector[1] * HERO_SPEED * state.rafDelta,
    newX: Math.max(
      0,
      Math.min(
        (state.hero.x + vector[0] * HERO_SPEED * state.rafDelta) /
          state.hero.width,
        maxY
      )
    ),
    newY: Math.max(
      0,
      Math.min(
        (state.hero.y + vector[1] * HERO_SPEED * state.rafDelta) /
          state.hero.height,
        maxX
      )
    ),
  };

  const following = {
    followingScreenX: state.camera.width / 2,
    followingScreenY: state.camera.height / 2,
    newFollowingX:
      movePlayerPayload.newX + vector[0] * HERO_SPEED * state.rafDelta,
    newFollowingY: state.hero.screenY + vector[1] * HERO_SPEED * state.rafDelta,
  };

  const moveCameraPayload = {
    ...following,
    // make the camera follow the sprite
    // clamp the values
    newX: movePlayerPayload.newX,
    // newX: Math.max(
    //   0,
    //   Math.min(
    //     state.camera.x + vector[0] * HERO_SPEED * state.rafDelta,
    //     state.camera.maxX
    //   )
    // ),
    // Math.max(
    //   0,
    //   Math.min(
    //     following.newFollowingX - state.camera.width / 2,
    //     state.camera.maxX
    //   )
    // ),
    newY: movePlayerPayload.newY,
    // Math.max(
    //   0,
    //   Math.min(
    //     movePlayerPayload.newY - state.camera.width / 2,
    //     state.camera.maxY
    //   )
    // ),
    // Math.max(
    //   0,
    //   Math.min(
    //     following.newFollowingY - state.camera.height / 2,
    //     state.camera.maxY
    //   )
    // ),
    // newX: Math.max(
    //   0,
    //   Math.min(
    //     (movePlayerPayload.newScreenX +
    //       vector[0] * HERO_SPEED * state.rafDelta) /
    //       2,
    //     state.camera.maxX
    //   )
    // ),
    //  Math.max(
    //   0,
    //   Math.min(
    //     state.camera.following.x - state.camera.width / 2,
    //     state.camera.maxX
    //   )
    // ),
    // newY: Math.max(
    //   0,
    //   Math.min(
    //     (movePlayerPayload.newScreenY +
    //       vector[1] * HERO_SPEED * state.rafDelta) /
    //       2,
    //     state.camera.maxY
    //   )
    // ),
    // Math.max(
    //   0,
    //   Math.min(
    //     state.camera.following.y - state.camera.height / 2,
    //     state.camera.maxY
    //   )
    // ),
  };

  // const destinationCoords = {
  //   y: movePlayerPayload.newScreenY / state.hero.height,
  //   x: movePlayerPayload.newScreenX / state.hero.width,
  // };
  // const destination =
  //   state.map.layers[0][(destinationCoords.y, destinationCoords.x)];

  _collide(vector[0], vector[1]);
  dispatch({
    type: "movePlayer",
    payload: movePlayerPayload,
  });
  dispatch({
    type: "moveCamera",
    payload: moveCameraPayload,
  });

  // if (destination.type === "exit") {
  //   dispatch({
  //     type: GA.CREATE_LEVEL,
  //   });
  // }

  // if (destination.type === "enemy") {
  //   dispatch({ type: GA.DEDUCT_HP_FROM_PLAYER, payload: enemyDamage });
  // }

  // if (destination.type === "boss") {
  //   dispatch({ type: GA.DEDUCT_HP_FROM_PLAYER, payload: enemyDamage * 2 });
  // }

  // if (destination.type === "weapon") {
  //   const { cost, damage, name, type } = destination as Weapon;
  //   dispatch({
  //     type: GA.PICKUP_ITEM,
  //     payload: { cost, damage, name, type },
  //   });
  // }

  // if (destination.type === "potion") {
  //   const {
  //     elixir: { cost, health, name, type },
  //   } = pr;

  //   dispatch({
  //     type: GA.PICKUP_ITEM,
  //     payload: { cost, health, name, type },
  //   });

  //   dispatch({
  //     type: GA.ADD_HP_TO_PLAYER,
  //     payload: health,
  //   });
  // }

  // if (
  //   destination.type &&
  //   destination.type !== "enemy" &&
  //   destination.type !== "exit" &&
  //   destination.type !== "boss"
  // ) {
  //   dispatch({
  //     type: GA.CHANGE_ENTITY,
  //     payload: { entity: { type: "floor" }, coords: [x, y] },
  //   });

  //   dispatch({
  //     type: GA.CHANGE_ENTITY,
  //     payload: { entity: newPlayer, coords: newPosition },
  //   });

  //   dispatch({
  //     type: GA.CHANGE_PLAYER_POSITION,
  //     payload: newPosition,
  //   });
  // }

  function _collide(dirx: number, diry: number) {
    // const row, col;
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    const left = state.hero.x - state.camera.width / 2;
    const right = state.hero.x + state.camera.width / 2 - 1;
    const top = state.hero.y - state.camera.height / 2;
    const bottom = state.hero.y + state.camera.height / 2 - 1;

    // check for collisions on sprite sides
    const collision =
      isSolidTileAtXY(left, top) ||
      isSolidTileAtXY(right, top) ||
      isSolidTileAtXY(right, bottom) ||
      isSolidTileAtXY(left, bottom);

    if (!collision) {
      return;
    }

    let col: number;
    let row: number;

    if (diry > 0) {
      row = getRow(bottom);
      dispatch({
        type: "movePlayer",
        payload: {
          newX: state.hero.x,
          newY: -state.camera.height / 2 + getY(row),
          newScreenX: state.hero.screenX,
          newScreenY: state.hero.screenY * 64,
        },
      });
      state.hero.y = -state.camera.height / 2 + getY(row);
    } else if (diry < 0) {
      row = getRow(top);
      state.hero.y = state.camera.height / 2 + getY(row + 1);
    } else if (dirx > 0) {
      col = getCol(right);
      state.hero.x = -state.camera.width / 2 + getX(col);
    } else if (dirx < 0) {
      col = getCol(left);
      state.hero.x = state.camera.width / 2 + getX(col + 1);
    }
  }

  function isSolidTileAtXY(x: number, y: number) {
    const col = Math.floor(x / state.map.tsize);
    const row = Math.floor(y / state.map.tsize);

    const fuckIsThis = state.map.layers.reduce(function (res, layer, index) {
      const tile = getTile(index, col, row);
      const isSolid = tile === 3 || tile === 5;

      return res || isSolid;
    });

    // console.log("WHAT IS THIS REDUCE FUNCTION?", fuckIsThis);
    // tiles 3 and 5 are solid -- the rest are walkable
    // loop through all layers and return TRUE if any tile is solid
    return state.map.layers.reduce(function (res, layer, index) {
      const tile = getTile(index, col, row);
      const isSolid = tile === 3 || tile === 5;
      return res || isSolid;
    });
  }

  function getCol(x: number) {
    return Math.floor(x / state.map.tsize);
  }
  function getRow(y: number) {
    return Math.floor(y / state.map.tsize);
  }
  function getX(col: number) {
    return col * state.map.tsize;
  }
  function getY(row: number) {
    return row * state.map.tsize;
  }

  function getTile(layer: number, col: number, row: number) {
    return state.map.layers[layer][row * state.map.cols + col];
  }
}

// function moveHero(delta: number, dirx: number, diry: number) {
//   // move hero
//    state.hero.x += dirx * HERO_SPEED * delta;
//   state.hero.y += diry * HERO_SPEED * delta;

//   // check if we walked into a non-walkable tile
//   _collide(dirx, diry);

//   // clamp values
//   const maxX = state.map.cols * state.map.tsize;
//   const maxY = state.map.rows * state.map.tsize;
//   state.hero.x = Math.max(0, Math.min(state.hero.x, maxX));
//   state.hero.y = Math.max(0, Math.min(state.hero.y, maxY));
// }
