const cars = require("../carData.json");

const getCar = (make, model, compare) => {
  if (!make && !model) {
    return cars[Math.floor(Math.random() * cars.length)];
  }

  let car = cars.find(
    (c) =>
      c.make.value == make.toLowerCase() && model.toLowerCase() == c.model.value
  );

  if (!car) return;

  if (!compare) return car;

  // body style partial
  let bodyStylesStyle = "incorrect";
  car.bodyStyles.value.forEach((style) => {
    if (compare.bodyStyles.value.includes(style)) bodyStylesStyle = "partial";
  });

  if (car.bodyStyles.value.join() == compare.bodyStyles.value.join())
    bodyStylesStyle = "correct";

  // get date estimate
  // find product date up or down
  let lowestYear = Math.min(...car.years.value);
  let highestYear = Math.max(...car.years.value);
  let clowestYear = Math.min(...compare.years.value);
  let chighestYear = Math.max(...compare.years.value);
  // years = `${lowestYear} - ${highestYear}`;
  let dateEstimate = "incorrect";
  car.years.value.forEach((year) => {
    compare.years.value.forEach((cyear) => {
      if (year == cyear) dateEstimate = "partial";
    });
  });

  let dateElement = "";
  if (lowestYear > chighestYear) dateElement = "↓";
  if (highestYear < clowestYear) dateElement = "↑";

  if (car.years.value.join() == compare.years.value.join())
    dateEstimate = "correct";

  // engine styles
  let engineStyle = "incorrect";
  car.engine.value.split(" ").forEach((e) => {
    compare.engine.value.split(" ").forEach((e2) => {
      if (e === e2) engineStyle = "partial";
    });
  });
  if (car.engine.value == compare.engine.value) engineStyle = "correct";

  const originStyle =
    car.origin.value == compare.origin.value ? "correct" : "incorrect";
  const modelStyle =
    car.model.value == compare.model.value ? "correct" : "incorrect";
  const makeStyle =
    car.make.value == compare.make.value ? "correct" : "incorrect";

  return {
    bodyStyles: {
      ...car.bodyStyles,
      style: bodyStylesStyle,
    },
    years: {
      ...car.years,
      style: dateEstimate,
      element: dateElement,
    },
    engine: { ...car.engine, style: engineStyle },
    origin: {
      ...car.origin,
      style: originStyle,
    },
    make: {
      ...car.make,
      style: makeStyle,
    },
    model: {
      ...car.model,
      style: modelStyle,
    },
  };
};

module.exports = getCar;
