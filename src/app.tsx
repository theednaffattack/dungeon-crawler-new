import { useState } from "react";
import { createDungeon } from "./create-dungeon.js";
import "./app.css";
import Dungeon from "./components/dungeon.js";
import { createEntities } from "./create-entities.js";

let dungeon = createDungeon();

let entities = createEntities(dungeon);

function App() {
  return (
    <div className="App">
      <Dungeon entities={entities} playerHealth={50} />
    </div>
  );
}

export default App;
