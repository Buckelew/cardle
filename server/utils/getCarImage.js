const rp = require("request-promise");

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

module.exports = getCarImage;
