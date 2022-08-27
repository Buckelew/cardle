import "./Guesses.css";
import Guess from "./Guess";

function Guesses({ guesses }) {
  // const unfor =
  //   '[{"bodyStyles":{"value":"Two Seaters, Coupe, Convertible","style":"incorrect"},"years":{"value":"1999-2022 ","style":"partial"},"engine":{"value":"V 10","style":"incorrect"},"engineType":"V","engineCyl":"10","seats":["2","1"],"origin":{"value":"Germany","style":"incorrect"},"make":{"value":"Audi","style":"incorrect"},"model":{"value":"R8","style":"incorrect"}},{"bodyStyles":{"value":"Sport Utility Vehicles, SUV","style":"incorrect"},"years":{"value":"2007-2022 ↓","style":"incorrect"},"engine":{"value":"V 6","style":"incorrect"},"engineType":"V","engineCyl":"6","seats":["5"],"origin":{"value":"USA","style":"correct"},"make":{"value":"Acura","style":"incorrect"},"model":{"value":"RDX","style":"incorrect"}},{"bodyStyles":{"value":"Midsize Cars","style":"incorrect"},"years":{"value":"2014-2022 ↓","style":"incorrect"},"engine":{"value":"V 6","style":"incorrect"},"engineType":"V","engineCyl":"6","seats":[],"origin":{"value":"USA","style":"correct"},"make":{"value":"Acura","style":"incorrect"},"model":{"value":"RLX","style":"incorrect"}},{"bodyStyles":{"value":"Compact Cars, Sedan","style":"partial"},"years":{"value":"2013-2022 ↓","style":"incorrect"},"engine":{"value":"Inline 4","style":"correct"},"engineType":"Inline","engineCyl":"4","seats":["5"],"origin":{"value":"USA","style":"correct"},"make":{"value":"Acura","style":"incorrect"},"model":{"value":"ILX","style":"incorrect"}},{"bodyStyles":{"value":"Compact Cars, Sedan, Station Wagon","style":"partial"},"years":{"value":"2004-2014 ↓","style":"incorrect"},"engine":{"value":"Inline 4","style":"correct"},"engineType":"Inline","engineCyl":"4","seats":["5"],"origin":{"value":"USA","style":"correct"},"make":{"value":"Acura","style":"incorrect"},"model":{"value":"TSX","style":"incorrect"}},{"bodyStyles":{"value":"Sedan","style":"correct"},"years":{"value":"1996-2012 ","style":"partial"},"engine":{"value":"V 6","style":"incorrect"},"engineType":"V","engineCyl":"6","seats":["5"],"origin":{"value":"USA","style":"correct"},"make":{"value":"Acura","style":"incorrect"},"model":{"value":"RL","style":"incorrect"}}]';
  // const newGuesses = JSON.parse(unfor);
  // newGuesses.pop();
  // newGuesses.pop();
  // newGuesses.pop();
  // newGuesses.pop();
  // newGuesses.pop();
  return (
    <div className="Guesses">
      {guesses.map((guess, i) => (
        <Guess key={i} guess={guess} />
      ))}
    </div>
  );
}

export default Guesses;
