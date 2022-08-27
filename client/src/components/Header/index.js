import "./Header.css";
import { useState } from "react";
import Popup from "./Popup";
import Stats from "./Stats";
import Settings from "./Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faCircleInfo,
  faChartSimple,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

function Header({ stats }) {
  const [showInfo, setShowInfo] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  let popup;
  if (showInfo)
    popup = (
      <Popup
        setShow={setShowInfo}
        body={
          <p>
            Each day Cardle features a different car from a major car
            manufacturer. Your job is to guess the make and model in as few
            tries as possible. Be sure to come back to come back everyday for a
            new car!
          </p>
        }
        title="About"
        footer={<p style={{ color: "#525252" }}>Developed by Caden Buckelew</p>}
      />
    );

  if (showHelp)
    popup = (
      <Popup
        setShow={setShowHelp}
        body={
          <ul style={{ margin: "0 20px", padding: 0 }}>
            <li>Guess a car’s make and model to get started</li>
            <li>As you guess, you’ll get hints towards the car of the day</li>
            <li>
              Try to guess in as few tries as possible, and share your score!
            </li>
          </ul>
        }
        title="how to play"
        footer=""
      />
    );

  if (showStats) popup = <Stats stats={stats} setShowStats={setShowStats} />;

  if (showSettings) popup = <Settings setShowSettings={setShowSettings} />;
  return (
    <div className="Header">
      <div class="Header-container">
        <div className="Header-left">
          <FontAwesomeIcon
            icon={faCircleInfo}
            onClick={() => setShowInfo(true)}
          />
          <FontAwesomeIcon
            icon={faCircleQuestion}
            onClick={() => setShowHelp(true)}
          />
        </div>
        <h2>Cardle</h2>
        <div className="Header-right">
          <FontAwesomeIcon
            icon={faChartSimple}
            onClick={() => setShowStats(true)}
          />
          <FontAwesomeIcon
            icon={faGear}
            onClick={() => setShowSettings(true)}
          />
        </div>
      </div>

      {popup}
    </div>
  );
}

export default Header;
