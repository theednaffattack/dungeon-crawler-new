import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app";
import StaticDungeon from "./components/static-dungeon";
import { createDungeon } from "./create-dungeon";
import { createEntities } from "./create-entities";
import "./index.css";

let dungeon = createDungeon();

let entities = createEntities(dungeon);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="static-dungeon"
          element={<StaticDungeon entities={entities} playerHealth={50} />}
        >
          {/*
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} /> 
          </Route>
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
