import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";

function App() {
  const [stats, setStats] = useState();
  console.log(stats);
  return (
    <div className="App">
      <Header stats={stats} />
      <Game setStats={setStats} />
    </div>
  );
}

export default App;
