import React from "react";
import { GameState } from "./game-reducer";
import health from "../assets/health.svg";
import weapon from "../assets/weapon.svg";
import potion2 from "../assets/potion-2.svg";

export function PlayerInfo({
  playerHealth,
  dungeonLevel,
  entities,
  playerInventory,
  playerPosition,
}: GameState) {
  const [xCoord, yCoord] = playerPosition;
  return (
    <div className="state-viewer">
      <div className="player-info">
        {/* player health */}
        <div className="info-icon-wrapper push-right">
          <div className="icon-box">
            <img src={health} width="30px" />
            <p style={{ fontSize: "12px", margin: 0, marginTop: "2px" }}>HP</p>
          </div>
          <div className="info-data">{playerHealth}</div>
        </div>
        {/* potion inventory */}
        <div className="info-icon-wrapper">
          <div className="icon-box">
            <img src={potion2} width="30px" />
            <p style={{ fontSize: "12px", margin: 0, marginTop: "2px" }}>
              Potions
            </p>
          </div>
          <div className="info-data">{playerInventory.potions.length}</div>
        </div>

        <div className="info-icon-wrapper">
          <div className="icon-box">
            <img src={weapon} width="30px" />
            <p style={{ fontSize: "12px", margin: 0, marginTop: "2px" }}>
              Weapons
            </p>
          </div>
          <div className="info-data">{playerInventory.weapons.length}</div>
        </div>
      </div>
      <div className="game-info">
        <p style={{ margin: 0 }}>Level: {dungeonLevel}</p>
      </div>
    </div>
  );
}
