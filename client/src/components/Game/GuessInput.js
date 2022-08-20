import cars from "../../cars.json";
import { useState, useRef, useEffect } from "react";

function Datalist({ input, setInput }) {
  const inputRef = useRef(null);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // const activeInput = true;
  const makes = Array.from(new Set(cars.map((car) => car.Make))).filter(
    (make) => make.toLowerCase().startsWith(input.toLowerCase())
  );
  let models;

  if (input.length > 1 && input.includes(" ")) {
    const make = input.split(" ")[0];
    const model = input.split(" ")[1];
    // filter out makes
    models = cars.filter((car) => car.Make.toLowerCase() == make.toLowerCase());
    models = Array.from(new Set(models.map((car) => car.Model)));
    // filter models
    if (model) {
      models = models.filter((m) => m.startsWith(model) && m !== model);
    }
  }

  const handleClick = (msg, focus) => {
    setInput(msg);
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
    const make = Array.from(new Set(cars.map((car) => car.Make))).find((m) =>
      input.toLowerCase().startsWith(m.toLowerCase())
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
  // if (!models && makes && makes.length) {
  return (
    <>
      <input
        id="guess"
        list="cars-list"
        value={input}
        onChange={handleChange}
        autoComplete={"off"}
        placeholder="Enter a make, and model"
        type="text"
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={inputRef}
      />

      {show ? datalistEl : ""}
    </>
  );
  // } else if (models && models.length) {
  //   // find make
  //   const make = Array.from(new Set(cars.map((car) => car.Make))).find((m) =>
  //     input.toLowerCase().startsWith(m.toLowerCase())
  //   );

  //   return (
  //     <ul className={`datalist`}>
  //       {models.map((model, i) => {
  //         return show && activeInput.id == "guess" ? (
  //           <li
  //             className={`datalist-element`}
  //             key={i}
  //             onClick={() => handleClick(make + " " + model)}
  //           >
  //             {make + " " + model}
  //           </li>
  //         ) : (
  //           ""
  //         );
  //       })}
  //     </ul>
  //   );
  // }
}

export default Datalist;
