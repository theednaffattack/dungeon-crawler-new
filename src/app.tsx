import { useState } from "react";
import { createDungeon } from "./create-dungeon.js";
import "./app.css";
import Dungeon from "./components/dungeon.js";

let store = {
  dungeon: createDungeon(),
};

function App() {
  return (
    <div className="App">
      <Dungeon store={store} />
    </div>
  );
}

export default App;
