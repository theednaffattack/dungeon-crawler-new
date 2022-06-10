import "./app.css";
import { LogicGrid } from "./components/logic-grid";
import { Nav } from "./components/nav";
import { ScrollingGrid } from "./components/scrolling-grid.js";
import { createDungeon } from "./create-dungeon.js";
import { createEntities } from "./create-entities.js";
import "./full.css";

let dungeon = createDungeon();

let entities = createEntities(dungeon);

const map = {
  cols: 12,
  rows: 12,
  tsize: 64,
  layers: [
    [
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 3, 1, 2,
      2, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1,
      2, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1,
      2, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3,
    ],
    [
      4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4, 4, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 5,
      4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3,
    ],
  ],
};

function App() {
  return (
    <div className="app">
      <div className="logic-grid-app">
        <Nav />
        <LogicGrid height={512} width={512} map={map} />
        {/* <ScrollingGrid entities={entities} playerHealth={50} /> */}
        {/* <StaticDungeon entities={entities} playerHealth={50} /> */}
      </div>
    </div>
  );
}

export default App;
