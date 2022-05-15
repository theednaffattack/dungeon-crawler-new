import { createDungeon } from "./create-dungeon.js";
import { createEntities } from "./create-entities.js";

let dungeon = createDungeon();

let firstStore = {
  dungeon: createEntities(dungeon),
};

let { entities, playerPosition } = createEntities(dungeon);

// Take the dungeon 2d array and create a grid made
// of divs.
const rows = firstStore.dungeon.entities.grid.map((item, index) => {
  const row = document.createElement("div");
  row.className = `row`;
  row.id = `row-${index}`;

  const newCell = item.map(({ opacity, type }) => {
    const cell = document.createElement("div");

    cell.className = type ? `cell ${type}` : "cell";
    cell.style.opacity = `${opacity}`;
    return cell;
  });
  row.append(...newCell);

  return row;
});

const element = document.getElementById("dungeon");

if (!element) {
  throw new Error("Cannot find DOM element 'dungeon'");
}

element.append(...rows);
