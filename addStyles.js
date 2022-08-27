const fs = require("fs");
const { model } = require("mongoose");

const cars = require("./server/carData.json");

let newCars = [];

cars.forEach(
  ({ bodyStyles, years, engineType, engineCyl, origin, make, model }) => {
    // body style partial
    // let bodyStylesStyle = "incorrect";
    // bodyStyles.forEach((style) => {
    //   if (carOfTheDay.bodyStyles.includes(style)) bodyStylesStyle = "partial";
    // });

    // if (bodyStyles.join() == carOfTheDay.bodyStyles.join())
    //   bodyStylesStyle = "correct";

    // get date estimate
    // find product date up or down
    let lowestYear = Math.min(...years);
    let highestYear = Math.max(...years);
    // let clowestYear = Math.min(...carOfTheDay.years);
    // let chighestYear = Math.max(...carOfTheDay.years);
    // let dateEstimate = "incorrect";
    // years.forEach((year) => {
    //   carOfTheDay.years.forEach((cyear) => {
    //     if (year == cyear) dateEstimate = "partial";
    //   });
    // });

    // let dateElement = "";
    // if (lowestYear > chighestYear) dateElement = "↓";
    // if (highestYear < clowestYear) dateElement = "↑";

    // if (years.join() == carOfTheDay.years.join()) dateEstimate = "correct";

    // engine styles
    // const engineStyle =
    //   engine.toLowerCase() == carOfTheDay.engine.toLowerCase()
    //     ? "correct"
    //     : engineType == carOfTheDay.engineType ||
    //       engineCyl == carOfTheDay.engineCyl
    //     ? "partial"
    //     : "incorrect";

    const newCar = {
      bodyStyles: {
        value: bodyStyles,
        display: bodyStyles.join(", "),
        // style: bodyStylesStyle,
      },
      years: {
        value: years,
        display: `${lowestYear}\n-\n${highestYear}`,
        // style: dateEstimate,
      },
      engine: {
        value: `${engineType} ${engineCyl}`,
        display: `${engineType} ${engineCyl}`,
      },
      origin: {
        value: origin.toLowerCase(),
        display: origin,
        // style: origin == carOfTheDay.origin ? "correct" : "incorrect",
      },
      make: {
        value: make.toLowerCase(),
        display: make,
        // style: make == carOfTheDay.make ? "correct" : "incorrect",
      },
      model: {
        value: model.toLowerCase(),
        display: model,
        // style: model == carOfTheDay.model ? "correct" : "incorrect",
      },
    };
    newCars.push(newCar);
  }
);

fs.writeFileSync("./newCars.json", JSON.stringify(newCars));
