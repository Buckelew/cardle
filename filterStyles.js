const fs = require("fs");

const cars = require("./server/carData.json");

const styles = new Set();

/*

*/

const newCars = cars.map((car) => {
  newStyles = new Set();
  car.bodyStyles.value.map((style) => {
    style = style ? style.replaceAll(" ", "") : "";
    if (style == "StandardSportUtilityVehicles") style = "SUV";
    if (style == "SmallSportUtilityVehicles") style = "SUV";
    if (style == "SportUtilityVehicles") style = "SUV";
    if (style == "LargeCars") style = "Sedan";
    if (style == "MidsizeCars") style = "Sedan";
    if (style == "Crossover") style = "SUV";
    else if (style == "TwoSeaters") style = "Coupe";
    else if (style == "CompactCars") style = "Mini";
    else if (style == "MiniCompactCars") style = "Mini";
    else if (style == "SubcompactCars") style = "Mini";
    else if (style == "StationWagon") style = "Wagon";
    else if (style == "MidsizeStationWagons") style = "Wagon";
    else if (style == "SmallStationWagons") style = "Wagon";
    else if (style == "Roadster") style = "Convertible";
    else if (style == "StandardPickupTrucks") style = "Pickup";
    else if (style == "CargoVans") style = "Van";

    style ? newStyles.add(style) : "";
  });

  car.bodyStyles.value = Array.from(newStyles);
  car.bodyStyles.display = car.bodyStyles.value.join(", ");
  car.bodyStyles.value = car.bodyStyles.value.map((s) => s.toLowerCase());
  return car;
});

fs.writeFileSync("./newCars.json", JSON.stringify(newCars));
