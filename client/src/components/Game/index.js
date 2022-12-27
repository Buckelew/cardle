import "./Game.css";
import { useState, useEffect, useRef } from "react";
import Won from "../Won";
import Guess from "./GuessInput";
import Guesses from "./Guesses";
import Table from "../hooks/Table";
import getCarDetails from "../utils/getCarDetails";

function Game({ setStats }) {
  const [guesses, setGuesses] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [getUser, setGetUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // get guesses from session
  useEffect(() => {
    fetch("/v1/get-user")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          return alert(res.error);
        }
        const filteredGuesses = res.guesses.map((g) => g.car);
        const correct = res.guesses.find((g) => g.correct);
        if (res.guesses) {
          setGuesses(filteredGuesses);
        }

        if (res.stats) {
          setStats(res.stats);
        }

        if (correct) {
          setHasWon(correct.car);
        }
      });
  }, [getUser]);

  const guess = async (e, guessInput) => {
    e.preventDefault();
    const split = guessInput.split(/[, ]+/);
    const make = split.shift();
    const model = split.join("+");

    if (!make || !model) {
      alert("Enter make, and model. Seperated by a space or comma");
      return;
    }

    fetch(`/v1/guess?make=${make}&model=${model}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          return alert(res.error);
        }
        if (res.correct) {
          setGetUser(!getUser);
          setHasWon(res.car);
        }
        setGuesses([...guesses, res.car]);
      });
  };

  return (
    <div className="Game">
      <Guesses guesses={guesses} />

      <Guess guess={guess} />

      {hasWon ? <Won car={hasWon} setHasWon={setHasWon} /> : ""}
    </div>
  );
}

export default Game;
