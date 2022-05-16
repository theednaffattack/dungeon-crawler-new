import { StateViewer } from "./StateViewer";

interface Entities {
  entities: GridAndRooms;
  playerPosition: [(number | undefined)?, (number | undefined)?];
}

interface DungeonProps {
  entities: Entities;
}

export default function Dungeon({
  entities: { entities, playerPosition },
}: DungeonProps) {
  const [playerX, playerY] = playerPosition;
  // Below is to prevent a typescript error for now
  entities.grid.map((row, i) =>
    row.map((cell, j) => {
      //we create a new property on each cell that measures the distance from the player
      let realPlayerX = 0;
      let realPlayerY = 0;
      if (playerX) {
        realPlayerX = playerX;
      }
      if (playerY) {
        realPlayerY = playerY;
      }
      cell.distanceFromPlayer =
        Math.abs(realPlayerY - i) + Math.abs(realPlayerX - j);

      //then we will check if distance is > 10 then set opacity to 0
      if (cell.distanceFromPlayer > 10) cell.opacity = 0;
      return cell;
    })
  );

  const cells = entities.grid.map((element, rowIndex) => {
    return (
      <div className="row" key={rowIndex}>
        {element.map((cell, cellIndex) => {
          ////////////logs for better understanding the type cells//////////////
          if (cell.type == "enemy") console.log(cell);
          else if (cell.type == "weapon") console.log(cell);
          else if (cell.type == "exit") console.log(cell);
          else if (cell.type == "player") console.log(cell);
          /////////////////////////////////////////////////////////////
          return (
            <div
              className={
                cell.type == "floor" || cell.type == "door"
                  ? "cell " + cell.type
                  : "cell"
              }
              style={{ opacity: cell.opacity }}
              key={cellIndex}
            ></div>
          );
        })}
      </div>
    );
  });
  return (
    <div className="app">
      <StateViewer data={state.playerPosition} />
      <div className="flex-container">{cells}</div>
    </div>
  );
}
