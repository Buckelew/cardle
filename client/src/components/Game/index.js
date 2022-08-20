import "./Game.css";
import { useState, useEffect, useRef } from "react";
import Won from "../Won";
import Guess from "./GuessInput";
import Guesses from './Guesses'
import Table from "../hooks/Table";
import getCarDetails from "../utils/getCarDetails";

function Game() {
  const [guesses, setGuesses] = useState([]);
  const [carOfTheDay, setCarOfTheDay] = useState();
  const [hasWon, setHasWon] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [guessInput, setGuessInput] = useState("");

  useEffect(() => {
    fetch("/caroftheday")
      .then((res) => res.json())
      .then((res) => {
        setCarOfTheDay(res);
      });
  }, []);

  const guess = async () => {
    const split = guessInput.split(/[, ]+/);
    const make = split.shift();
    const model = split.join("+");
    if (make && model) {
      // find car from json file
      const guessedCar = await getCarDetails(carOfTheDay, make, model);
      if (guessedCar) {
        console.log(guesses);
        const modelGuesses = guesses.map((trim) => trim.model.value.toLowerCase());
        const makeGuesses = guesses.map((trim) => trim.make.value.toLowerCase());
        if (
          !modelGuesses.includes(model.toLowerCase()) ||
          !makeGuesses.includes(make.toLowerCase())
        ) {
          if (
            guessedCar.make == carOfTheDay.make &&
            guessedCar.model == carOfTheDay.model
          ) {
            // alert("WOOO! You got it!");
            setHasWon(guessedCar);
          }
          setGuesses([...guesses, guessedCar]);
        } else {
          alert("Car already guessed!");
        }
      } else {
        alert("Car not found");
      }
    } else {
      alert("Enter make, and model. Seperated by a space or comma");
    }
  };

  return (
    <div className="Game">

      < Guesses guesses={guesses} />

      <div className="guess">
        <span>Guess today's car</span>
        <Guess input={guessInput} setInput={setGuessInput} />
        <button onClick={guess}>GUESS</button>
      </div>

      {hasWon ? <Won car={hasWon} /> : ""}
    </div>
  );
}

export default Game;
