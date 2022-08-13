import "./Game.css";
import { useState, useEffect, useRef } from "react";
import Won from "../Won";
import Datalist from "./Datalist";
import Table from "../hooks/Table";
import getCarDetails from "../utils/getCarDetails";

function Game() {
  const [guesses, setGuesses] = useState([]);
  const [carOfTheDay, setCarOfTheDay] = useState();
  const [hasWon, setHasWon] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [guessInput, setGuessInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:5125/caroftheday")
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
        const modelGuesses = guesses.map((trim) => trim.model.toLowerCase());
        const makeGuesses = guesses.map((trim) => trim.make.toLowerCase());
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
      <div className="guess">
        <Datalist input={guessInput} setInput={setGuessInput} />
        <button onClick={guess}>Guess</button>
      </div>
      <div class="table">
        <Table
          data={guesses}
          visibleColumns={2}
          columns={[
            {
              Header: "Make",
              accessor: "make",
              Cell: ({ value }) => (
                <div
                  className={
                    value == carOfTheDay.make ? "correct" : "incorrect"
                  }
                >
                  {value}
                </div>
              ),
            },
            {
              Header: "Model",
              accessor: "model",
              Cell: ({ value }) => (
                <div
                  className={
                    value == carOfTheDay.model ? "correct" : "incorrect"
                  }
                >
                  {value}
                </div>
              ),
            },
            {
              Header: "Origin",
              accessor: "origin",
              Cell: ({ value }) => (
                <div
                  className={
                    value == carOfTheDay.origin ? "correct" : "incorrect"
                  }
                >
                  {value}
                </div>
              ),
            },
            {
              Header: "Production Dates",
              accessor: "years",
              Cell: ({ value }) => (
                <div className={value.style}>{value.value}</div>
              ),
            },
            {
              Header: "Body Styles",
              accessor: "bodyStyles",
              Cell: ({ value }) => (
                <div className={value.style}>{value.value}</div>
              ),
            },
            {
              Header: "Engine",
              accessor: "engine",
              Cell: ({ value }) => {
                return <div className={value.style}>{value.value}</div>;
              },
            },
          ]}
        />
      </div>

      {hasWon ? <Won car={hasWon} /> : ""}
    </div>
  );
}

export default Game;
