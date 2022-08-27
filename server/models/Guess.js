const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guessSchema = new Schema(
  {
    make: String, // Nissan
    model: String, // 350z
    attempt: Number, // 1 - 6
    car: Object,
    correct: Boolean,
  },
  { timestamps: true }
);

const Guess = mongoose.model("Guess", guessSchema);
module.exports = Guess;
