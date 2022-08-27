import Popup from "./Popup";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { faFileZipper } from "@fortawesome/free-solid-svg-icons";
ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default ({ setShowStats, stats }) => {
  const datasets = [0, 0, 0, 0, 0, 0, 0];
  stats = stats ? stats : [];
  stats.map((stat) =>
    stat.found ? datasets[stat.guesses - 1]++ : datasets[6]++
  );

  const played = stats.length;
  const winRate =
    (stats.filter((stat) => stat.found).length / stats.length).toFixed(4) * 100;

  const streaks = stats
    .map((stat) => (stat.found ? 1 : 0))
    .reduce((res, n) => (n ? res[res.length - 1]++ : res.push(0), res), [0]);

  const currentStreak = streaks[streaks.length - 1];
  const maxStreak = Math.max(...streaks);

  return (
    <Popup
      setShow={setShowStats}
      body={
        <>
          <Bar
            options={{
              scales: {
                yAxes: {
                  display: false,
                  suggestedMax: Math.max(...datasets) + 1,
                },
                xAxes: {
                  grid: { display: false },
                  ticks: { color: "#525252" },
                },
              },
              plugins: {
                datalabels: {
                  display: true,
                  color: "#fff",
                  formatter: (value) => {
                    return value ? Math.round(value) : "";
                  },
                  font: {
                    weight: "bold",
                    size: 12,
                  },
                  anchor: "end",
                  // offset: -20,
                  align: "end",
                },
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false,
                },
              },
            }}
            data={{
              labels: ["1", "2", "3", "4", "5", "6", "X"],
              datasets: [
                {
                  data: datasets,
                  backgroundColor: [
                    "#33E356",
                    "#33E356",
                    "#33E356",
                    "#33E356",
                    "#33E356",
                    "#33E356",
                    "#F9694A",
                  ],
                },
              ],
            }}
          />
          <h3
            style={{
              fontWeight: "300",
              fontSize: "2.5vmin",
              lineHeight: "28px",
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "15px",
            }}
          >
            Guess Distributation
          </h3>
        </>
      }
      title="Statistics"
      footer={
        <div style={{ borderTop: "2px solid white" }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <p
              style={{
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: "2.5vmin" }} class="bold">
                {played}
              </span>
              Played
            </p>
            <p
              style={{
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: "2.5vmin" }} class="bold">
                {winRate ? winRate : 0}%
              </span>
              Win Rate
            </p>
            <p
              style={{
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: "2.5vmin" }} class="bold">
                {currentStreak}
              </span>
              Current Streak
            </p>
            <p
              style={{
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: "2.5vmin" }} class="bold">
                {maxStreak}
              </span>
              Max Streak
            </p>
          </div>
        </div>
      }
    />
  );
};
