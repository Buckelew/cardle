const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dateSchema = new Schema(
  {
    date: String, //  7:11:2022
    car: Object, // car object
  },
  { timestamps: true }
);

const Date = mongoose.model("Date", dateSchema);
module.exports = Date;
