import Square from "./Square";

import makes from "../../assets/makes";

import usa from "../../assets/origins/usa.webp";
import germany from "../../assets/origins/germany.jpg";
import japan from "../../assets/origins/japan.png";
import south_korea from "../../assets/origins/south_korea.webp";
import uk from "../../assets/origins/uk.png";
import sweden from "../../assets/origins/sweden.png";
import italy from "../../assets/origins/italy.png";
import black from "../../assets/black.jpg";
import engine from "../../assets/engine.png";

import convertible from "../../assets/body_styles/convertible.png";
import coupe from "../../assets/body_styles/coupe.png";
import hatchback from "../../assets/body_styles/hatchback.png";
import mini_style from "../../assets/body_styles/mini.png";
import minivan from "../../assets/body_styles/minivan.png";
import pickup from "../../assets/body_styles/pickup.png";
import sedan from "../../assets/body_styles/sedan.png";
import suv from "../../assets/body_styles/suv.png";
import van from "../../assets/body_styles/van.png";
import wagon from "../../assets/body_styles/wagon.png";

function Guess({ guess }) {
  // GUESS :
  // { bodyStyles: {value: 'Compact Cars, Sport Utility Vehicles, SUV', style: 'incorrect'}
  // engine: {value: 'Inline 4', style: 'correct'}
  // engineCyl: "4"
  // engineType: "Inline"
  // make: "Audi"
  // model: "Q3"
  // origin: "Germany"
  // seats: ['5']
  // years: {value: '2012 - 2022\n ', style: 'partial'} }

  let originImg = "";
  switch (guess.origin.value) {
    case "germany":
      originImg = germany;
      break;
    case "japan":
      originImg = japan;
      break;
    case "usa":
      originImg = usa;
      break;
    case "south korea":
      originImg = south_korea;
      break;
    case "uk":
      originImg = uk;
      break;
    case "sweden":
      originImg = sweden;
      break;
    case "italy":
      originImg = italy;
      break;
    default:
      originImg = black;
      break;
  }

  let makeImg = makes[guess.make.value];

  let bodyStyleImgs = [];
  guess.bodyStyles.value.forEach((style) => {
    if (style == "convertible") bodyStyleImgs.push(convertible);
    if (style == "coupe") bodyStyleImgs.push(coupe);
    if (style == "hatchback") bodyStyleImgs.push(hatchback);
    if (style == "mini") bodyStyleImgs.push(mini_style);
    if (style == "minivan") bodyStyleImgs.push(minivan);
    if (style == "pickup") bodyStyleImgs.push(pickup);
    if (style == "sedan") bodyStyleImgs.push(sedan);
    if (style == "suv") bodyStyleImgs.push(suv);
    if (style == "van") bodyStyleImgs.push(van);
    if (style == "wagon") bodyStyleImgs.push(wagon);
  });

  return (
    <>
      <Square title="Make" image={makeImg} style={guess.make.style} />
      <Square
        title="Model"
        text={guess.model.display}
        style={guess.model.style}
      />
      <Square
        title="Origin"
        image={originImg}
        style={guess.origin.style + " origin"}
      />
      <Square
        title="Production Dates"
        text={guess.years.display}
        style={guess.years.style}
      />
      <Square
        title="Body Style(s)"
        text={guess.bodyStyles.display}
        style={guess.bodyStyles.style + " bodyStyles"}
        images={bodyStyleImgs}
      />
      <Square
        title="Engine Type"
        text={guess.engine.display}
        style={guess.engine.style + " engine"}
        image={engine}
      />
    </>
  );
}

export default Guess;
