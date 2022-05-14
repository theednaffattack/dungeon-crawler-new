import React from "react";
import { createDungeon, GridAndRooms } from "../create-dungeon";

interface DungeonProps {
  store: { dungeon: GridAndRooms };
}

export default function Dungeon({ store: { dungeon } }: DungeonProps) {
  const cells = dungeon.grid.map((element, index) => {
    return (
      <div className="row">
        {element.map((cell, i) => {
          return (
            <div
              className={
                cell.type == "floor" || cell.type == "door"
                  ? "cell " + cell.type
                  : "cell"
              }
              style={{ opacity: cell.opacity }}
              key={i}
            ></div>
          );
        })}
      </div>
    );
  });
  return (
    <div className="app">
      <div className="flex-container">{cells}</div>
    </div>
  );
}
