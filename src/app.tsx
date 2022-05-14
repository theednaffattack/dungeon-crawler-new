import { useState } from "react";
import { createDungeon } from "./create-dungeon.js";
import "./app.css";
import Dungeon from "./components/dungeon.js";

let store = {
  dungeon: createDungeon(),
};

function App() {
  const [count, setCount] = useState(0);
  console.log("VIEW THE STORE", store);
  return (
    <div className="App">
      <Dungeon store={store} />
    </div>
  );
}

export default App;
