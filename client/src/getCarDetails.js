const getCarDetails = (fetch, make, model) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://www.carqueryapi.com/api/0.3/?make=${make}&model=${model}&cmd=getTrims`,
      {
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        const trim = res.Trims[0];
        if (trim) {
          // get all body styles
          let bodyStyles = new Set();
          let seats = new Set();
          let years = new Set();
          res.Trims.forEach((trim) => {
            bodyStyles.add(trim.model_body);
            if (trim.model_seats) seats.add(trim.model_seats);
            years.add(trim.model_year);
          });
          bodyStyles = Array.from(bodyStyles).join(", ");
          seats = Array.from(seats).join(", ");
          years = Array.from(years);
          let lowestYear = Math.min(...years);
          let highestYear = Math.max(...years);
          years = `${lowestYear} - ${highestYear}`;
          const engineType = trim.model_engine_type;
          const engineCyl = trim.model_engine_cyl;
          const origin = trim.make_country;
          const make = trim.make_display;
          const model = trim.model_name;

          resolve({
            bodyStyles,
            years,
            engineType,
            engineCyl,
            seats,
            origin,
            make,
            model,
          });
        } else {
          reject(`Can't find car`);
        }
      });
  });

export default getCarDetails;
