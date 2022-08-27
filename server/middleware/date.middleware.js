const Date = require("../models/Date");
const getFormattedDate = require("../utils/getFormattedDate");
const getCar = require("../utils/getCar");

// add date to req
module.exports = async (req, res, next) => {
  try {
    const formatted = getFormattedDate();

    const date = await Date.findOne({ date: formatted }).exec();

    if (date) {
      req.date = date;
      next();
    } else {
      // get new car
      const car = getCar();
      // save date to db
      const date = await Date.create({ car, date: formatted });

      req.date = date;
      next();
    }
  } catch (e) {
    console.log(e, "error during date middleware");
    next(e);
  }
};
