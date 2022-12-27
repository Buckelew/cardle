import cars from "../../cars.json";
import "./GuessInput.css";
import { useState, useRef, useEffect } from "react";

function Datalist({ guess }) {
  const [guessInput, setGuessInput] = useState("");

  const inputRef = useRef(null);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setGuessInput(e.target.value);
  };

  // const activeInput = true;
  const makes = Array.from(new Set(cars.map((car) => car.make.display))).filter(
    (make) => make.toLowerCase().startsWith(guessInput.toLowerCase())
  );
  let models;

  if (guessInput.length > 1 && guessInput.includes(" ")) {
    const make = guessInput.split(" ")[0];
    const model = guessInput.split(" ")[1];
    // filter out makes
    models = cars.filter(
      (car) => car.make.display.toLowerCase() == make.toLowerCase()
    );
    models = Array.from(new Set(models.map((car) => car.model.display)));
    // filter models
    if (model) {
      models = models.filter(
        (m) =>
          m.toLowerCase().startsWith(model.toLowerCase()) &&
          m.toLowerCase() !== model.toLowerCase()
      );
    }
  }

  const handleClick = (msg, focus) => {
    setGuessInput(msg);
    if (focus) inputRef.current.focus();
  };

  const handleFocus = () => {
    setShow(true);
  };

  const handleBlur = (e) => {
    if (!hover) setShow(false);
  };

  let hover = false;
  let datalistEl;
  if (!models && makes && makes.length) {
    datalistEl = (
      <ul className={`datalist `}>
        {makes.map((make, i) => {
          return (
            <li
              className={`datalist-element`}
              key={i}
              onMouseOver={() => (hover = true)}
              onMouseLeave={() => (hover = false)}
              onClick={() => handleClick(make + " ")}
            >
              {make}
            </li>
          );
        })}
      </ul>
    );
  } else if (models && models.length) {
    // find make
    const make = Array.from(new Set(cars.map((car) => car.make.display))).find(
      (m) => guessInput.toLowerCase().startsWith(m.toLowerCase())
    );

    datalistEl = (
      <ul className={`datalist`}>
        {models.map((model, i) => {
          return (
            <li
              className={`datalist-element`}
              key={i}
              onMouseOver={() => (hover = true)}
              onMouseLeave={() => (hover = false)}
              onClick={() => handleClick(make + " " + model, true)}
            >
              {make + " " + model}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <form className="GuessInput" onSubmit={(e) => guess(e, guessInput)}>
      <span>Guess today's car</span>
      <div className="wrapper">
        {show ? datalistEl : ""}
        <input
          id="guess"
          list="cars-list"
          className={show ? "show" : ""}
          value={guessInput}
          onChange={handleChange}
          autoComplete={"off"}
          placeholder="Enter a make, and model"
          type="text"
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={inputRef}
        />
      </div>

      <button >GUESS</button>
    </form >
  );
}

export default Datalist;
