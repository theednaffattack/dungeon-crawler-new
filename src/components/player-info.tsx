import potion2 from "../assets/potion-2.svg";
import { FogCheckbox, FogCheckboxProps } from "./fog-checkbox";
import { GameControls } from "./game-controls";
import { GameState } from "./game-reducer";

type PlayerInfoState = GameState & FogCheckboxProps;

export function PlayerInfo({
  dungeonLevel,
  equippedWeapon,
  fogState,
  playerHealth,
  playerInventory,
  setFogState,
}: PlayerInfoState) {
  return (
    <div className="state-viewer">
      <div className="player-info">
        {/* player health */}
        <div className="info-icon-wrapper">
          <div className="icon-box">
            <div
              className="heart-fill"
              style={{ height: "30px", width: "30px" }}
            ></div>
            <p style={{ fontSize: "12px", margin: 0, marginTop: "2px" }}>HP</p>
          </div>
          <div className="info-data">{playerHealth}</div>
        </div>
        {/* potion inventory */}
        <div className="inventory">
          <div className="info-icon-wrapper">
            <div className="icon-box">
              <img src={potion2} width="30px" />
            </div>
            <div className="info-data">{playerInventory.potions.length}</div>
          </div>

          <p
            style={{
              fontSize: "12px",
              margin: 0,
              marginTop: "2px",
              textAlign: "center",
            }}
          >
            Potions
          </p>
        </div>

        <div className="info-icon-wrapper">
          <div className="icon-box">
            <div
              className="weapon-fill"
              style={{ width: "30px", height: "30px" }}
            ></div>
            <p style={{ fontSize: "12px", margin: 0, marginTop: "2px" }}>
              Weapons
            </p>
          </div>
          <div className="info-data">{playerInventory.weapons.length}</div>
        </div>
      </div>

      <GameControls>
        <div
          style={{
            display: "flex",
          }}
        >
          <FogCheckbox fogState={fogState} setFogState={setFogState} />
          <div>{equippedWeapon?.name}</div>
        </div>
      </GameControls>
      <div className="game-info">
        <p style={{ margin: 0 }}>Level: {dungeonLevel}</p>
      </div>
    </div>
  );
}
