const fs = require("fs");
const rp = require("request-promise");

const cars = require("./server/carData.json");

let proxies = `89.117.43.36:30033:uSAtYIqG:LyacO3SY
89.117.43.37:30033:uSAtYIqG:LyacO3SY
89.117.43.38:30033:uSAtYIqG:LyacO3SY
89.117.43.39:30033:uSAtYIqG:LyacO3SY
89.117.43.40:30033:uSAtYIqG:LyacO3SY
89.117.43.41:30033:uSAtYIqG:LyacO3SY
89.117.43.42:30033:uSAtYIqG:LyacO3SY
89.117.43.43:30033:uSAtYIqG:LyacO3SY
89.117.43.44:30033:uSAtYIqG:LyacO3SY
89.117.43.45:30033:uSAtYIqG:LyacO3SY
89.117.43.46:30033:uSAtYIqG:LyacO3SY
89.117.43.47:30033:uSAtYIqG:LyacO3SY
89.117.43.48:30033:uSAtYIqG:LyacO3SY
89.117.43.49:30033:uSAtYIqG:LyacO3SY
89.117.43.50:30033:uSAtYIqG:LyacO3SY
89.117.43.51:30033:uSAtYIqG:LyacO3SY
89.117.43.52:30033:uSAtYIqG:LyacO3SY
89.117.43.53:30033:uSAtYIqG:LyacO3SY
89.117.43.54:30033:uSAtYIqG:LyacO3SY
89.117.43.55:30033:uSAtYIqG:LyacO3SY
89.117.43.56:30033:uSAtYIqG:LyacO3SY
89.117.43.57:30033:uSAtYIqG:LyacO3SY
89.117.43.58:30033:uSAtYIqG:LyacO3SY
89.117.43.59:30033:uSAtYIqG:LyacO3SY
89.117.43.60:30033:uSAtYIqG:LyacO3SY`;

proxies = proxies.split("\n").map((proxy) => {
  proxySplit = proxy.split(":");
  return `http://${proxySplit[2]}:${proxySplit[3]}@${proxySplit[0]}:${proxySplit[1]}`;
});

console.log(proxies);

const newCars = [];

let i = 0;
let bad = [];

setInterval(() => {
  const car = cars[i];
  console.log("req");
  i++;
  rp({
    url: `https://www.carqueryapi.com/api/0.3/?make=${car.make}&model=${car.model}&cmd=getTrims`,
    method: "GET",
    proxy: proxies[Math.floor(proxies.length * Math.random())],
    json: true,
  })
    .then((res) => {
      if (res.Trims && res.Trims.length) {
        const trim = res.Trims[0];
        // get all body styles
        let bodyStyles = new Set();
        let seats = new Set();
        let years = new Set();
        res.Trims.forEach((trim) => {
          bodyStyles.add(trim.model_body);
          if (trim.model_seats) seats.add(trim.model_seats);
          years.add(trim.model_year);
        });
        bodyStyles = Array.from(bodyStyles);
        seats = Array.from(seats);
        years = Array.from(years);
        let engineType = trim.model_engine_type;
        // filter engine types
        if (engineType == "in-line") engineType = "inline";
        const engineCyl = trim.model_engine_cyl;
        const engine = engineType + " " + engineCyl;
        const origin = trim.make_country;
        const make = trim.make_display;
        const model = trim.model_name;

        newCars.push({
          bodyStyles,
          years,
          engine,
          engineCyl,
          engineType,
          seats,
          origin,
          make,
          model,
        });
      }

      if (i % 5 === 0) {
        console.log("Saved", i);
        console.log(bad);
        fs.writeFileSync("./newCars.json", JSON.stringify(newCars));
      }
    })
    .catch((err) => {
      bad.push(car);
      console.log("BAD : ", i);
    });
}, 5000);
