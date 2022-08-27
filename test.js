const cars = require("./server/carData.json");

const origins = new Set();

cars.forEach((car) => {
  origins.add(car.origin.value);
});

console.log(Array.from(origins).join("\n"));
