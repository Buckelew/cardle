const express = require("express");
const rp = require("request-promise");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 5125;

const cars = require("../cars.json");
const dates = require("./dates.json");

app.use(express.static(path.resolve(__dirname, "../client/build")));

const getCar = () =>
  new Promise((resolve, reject) => {
    const car = cars[Math.floor(Math.random() * cars.length)];
    rp({
      url: `https://www.carqueryapi.com/api/0.3/?make=${car.Make}&model=${car.Model}&cmd=getTrims`,
      method: "GET",
      proxy: "http://uSAtYIqG:LyacO3SY@89.117.43.60:30033",
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

          resolve({
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
        } else if (res.error) {
          console.log(res.error);
        } else {
          console.log(res);
          return getCar();
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });

app.get("/caroftheday", async (req, res) => {
  const date = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    })
  );

  const formatted = `${date.getMonth()}:${date.getDate()}:${date.getFullYear()}`;
  if (dates[formatted]) {
    res.json(dates[formatted]);
  } else {
    // get new car
    dates[formatted] = await getCar();
    // save dates.json
    fs.writeFileSync("./server/dates.json", JSON.stringify(dates));

    // resolve
    res.json(dates[date]);
  }
});

const getCarImage = (make, model) =>
  new Promise((resolve, reject) => {
    rp({
      url: `https://serpapi.com/search.json?q=${make
        .split(" ")
        .join("+")}+${model
        .split(" ")
        .join(
          "+"
        )}&tbm=isch&ijn=0&api_key=9c1dde02ed13f0213e6db1a802a7d9e8897ebfa95af220ff7468c6591c1996bd`,
      json: true,
    })
      .then((r) => {
        const image = r.images_results[0];

        resolve(image);
      })
      .catch((err) => {
        reject(err);
      });
  });

app.get("/cardetails", async (req, res) => {
  try {
    const { make, model } = req.query;
    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      })
    );

    const formatted = `${date.getMonth()}:${date.getDate()}:${date.getFullYear()}`;

    if (dates[formatted]) {
      if (!dates[formatted].image) {
        const image = await getCarImage(make, model);
        dates[formatted].image = image;
        res.json({ image });
      } else {
        res.json({ image: dates[formatted].image });
      }
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    console.log("server error", e);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
