import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Cardle</h1>
        <p>Guess today's car!</p>
      </div>
      <Game />
    </div>
  );
}

export default App;
