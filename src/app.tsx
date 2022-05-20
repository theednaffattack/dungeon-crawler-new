import Dungeon from "./components/dungeon.js";
import { createDungeon } from "./create-dungeon.js";
import { createEntities } from "./create-entities.js";
import "./app.css";
// import "./full.css";

let dungeon = createDungeon();

let entities = createEntities(dungeon);

function App() {
  return (
    <div className="app">
      <Dungeon entities={entities} playerHealth={50} />
    </div>
  );
}

export default App;
