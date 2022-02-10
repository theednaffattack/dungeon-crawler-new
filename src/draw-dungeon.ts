import { createDungeon } from "./main.js";

let store = {
  dungeon: createDungeon(),
};

const rows = store.dungeon.map((item, index) => {
  const row = document.createElement("div");
  row.className = `row`;
  row.id = `row-${index}`;

  const newCell = item.map(({ opacity, type }) => {
    const cell = document.createElement("div");

    cell.className = "cell";
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
