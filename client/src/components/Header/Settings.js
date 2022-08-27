import Popup from "./Popup";
import "./Settings.css";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default ({ setShowSettings }) => {
  const [toggleCheckbox, setToggleCheckbox] = useState(true);
  return (
    <Popup
      setShow={setShowSettings}
      body={
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "18px" }}>Dark Mode</span>
            <div
              className={`checkbox ${toggleCheckbox ? "checked" : ""}`}
              // onClick={() => setToggleCheckbox(!toggleCheckbox)}
            >
              <div className={toggleCheckbox ? "checked" : ""} />
            </div>
          </div>
        </div>
      }
      title="Settings"
      footer=""
    />
  );
};
