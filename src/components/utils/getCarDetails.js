let carOfTheDay;

const getCarDetails = (carOfTheDay, make, model) =>
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

          // body style partial
          let bodyStylesStyle = "incorrect";
          bodyStyles.forEach((style) => {
            if (carOfTheDay.bodyStyles.includes(style))
              bodyStylesStyle = "partial";
          });

          if (bodyStyles.join() == carOfTheDay.bodyStyles.join())
            bodyStylesStyle = "correct";

          // get date estimate
          // find product date up or down
          let lowestYear = Math.min(...years);
          let highestYear = Math.max(...years);
          let clowestYear = Math.min(...carOfTheDay.years);
          let chighestYear = Math.max(...carOfTheDay.years);
          // years = `${lowestYear} - ${highestYear}`;
          let dateEstimate = "incorrect";
          years.forEach((year) => {
            carOfTheDay.years.forEach((cyear) => {
              if (year == cyear) dateEstimate = "partial";
            });
          });

          let dateElement = "";
          if (lowestYear > chighestYear) dateElement = "↓";
          if (highestYear < clowestYear) dateElement = "↑";

          if (years.join() == carOfTheDay.years.join())
            dateEstimate = "correct";

          // engine styles
          const engineStyle =
            engine.toLowerCase() == carOfTheDay.engine.toLowerCase()
              ? "correct"
              : engineType == carOfTheDay.engineType ||
                engineCyl == carOfTheDay.engineCyl
              ? "partial"
              : "incorrect";

          resolve({
            bodyStyles: {
              value: bodyStyles.join(", "),
              style: bodyStylesStyle,
            },
            years: {
              value: `${lowestYear} - ${highestYear}\n ${dateElement}`,
              style: dateEstimate,
            },
            engine: { value: engine, style: engineStyle },
            engineType,
            engineCyl,
            seats,
            origin,
            make,
            model,
          });
        } else {
          alert(`Can't find car`);
        }
      });
  });

export default getCarDetails;
