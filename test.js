const cars = require("./server/carData.json");

const makes = new Set();

cars.forEach((car) => {
  makes.add(car.make.value);
});

console.log(Array.from(makes).join("\n"));
