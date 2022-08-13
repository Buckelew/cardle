const rp = require("request-promise");
const fs = require("fs");

const proxies = `89.117.43.36:30033:uSAtYIqG:LyacO3SY
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
89.117.43.60:30033:uSAtYIqG:LyacO3SY`.split("\n");

const cars = require("../../cars.json");
(async () => {
  let i = 0;
  setInterval(() => {
    let proxy = proxies[Math.floor(Math.random() * proxies.length)];
    const proxySplit = proxy.split(":");
    proxy = `http://${proxySplit[2]}:${proxySplit[3]}@${proxySplit[0]}:${proxySplit[1]}`;
    i++;
    let car = cars[i];
    rp({
      url: `https://www.carqueryapi.com/api/0.3/?make=${car.Make}&model=${car.Model}&cmd=getTrims`,
      proxy,
      method: "GET",
      json: true,
    })
      .then((res) => {
        if (res.Trims && res.Trims.length) {
          const trim = res.Trims[0];
          let old = JSON.parse(fs.readFileSync("./src/newCars.json", "utf-8"));
          old.push({
            trim: trim.model_make_display,
            model: trim.model_name,
          });
          fs.writeFileSync("./src/newCars.json", JSON.stringify(old));
          console.log({
            trim: trim.model_make_display,
            model: trim.model_name,
          });
          setTimeout(() => {
            return;
          }, 10000);
        } else {
          console.log(res);
        }
      })
      .catch(() => {});
  }, 20000);
})();
