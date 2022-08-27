const Date = require("../models/Date");
const Guess = require("../models/Guess");

const getCarImage = require("../utils/getCarImage");
const getCar = require("../utils/getCar");

const carDetails = async (req, res, next) => {
  try {
    const car = req.date.car;
    if (req.session[req.date.date].found) {
      if (!req.date.image) {
        console.log(req.date);
        const image = await getCarImage(car.make.value, car.model.value);
        car.image = image;
        await Date.findOneAndUpdate(
          { date: req.date.date },
          { car: { ...req.date.car, image } }
        );
        res.json({ image });
      } else {
        res.json({ image: req.date.image });
      }
    } else res.status(400).json({ error: "Guess the correct answer first!" });
  } catch (e) {
    next(e);
  }
};

const guess = async (req, res, next) => {
  try {
    const guess = req.query;

    // count guesses
    let guessCookie;
    if (!req.session[req.date.date]) {
      req.session[req.date.date] = { guess: 0, guesses: [] };
      guessCookie = req.session[req.date.date];
    } else {
      guessCookie = req.session[req.date.date];
      if (!guessCookie.guess) guessCookie.guess = 0;
    }

    // check for too many guesses
    if (guessCookie.guess >= 6) {
      res.status(403).json({ error: "Too many guesses" });
      return;
    }

    // check if user got correct already
    if (!req.session[req.date.date].guesses.every((g) => !g.correct)) {
      res.status(403).json({ error: "Correct answer already found" });
      return;
    }

    // check if guess is valid
    if (!guess && !Object.keys(guess).length) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    // filter object to reduce false requests
    const everyKey = ["make", "model"];
    const keys = Object.keys(guess).map((key) => key);
    keys.every((key) => everyKey.includes(key));

    if (!everyKey.every((key) => keys.includes(key))) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    // get car from with compare values
    const car = getCar(guess.make, guess.model, req.date.car);
    if (!car) {
      res.status(400).json({ error: "Car not found" });
      return;
    }

    // is guess correct
    const correct =
      req.date.car.model.value.toLowerCase() == guess.model.toLowerCase() &&
      req.date.car.make.value.toLowerCase() == guess.make.toLowerCase();

    // add found to session
    if (correct) req.session[req.date.date].found = true;

    // create guess in db
    const guessRes = await Guess.create({
      ...guess,
      correct,
      car,
      attempt: guessCookie.guess,
    });
    // add guess to session
    guessCookie.guesses
      ? guessCookie.guesses.push(guessRes)
      : (guessCookie.guesses = [guessRes]);

    // add one to guess count
    guessCookie.guess++;

    // resolve
    res.json({ correct, car });
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    if (!req.session || !req.session[req.date.date]) {
      return res.json({ guesses: [] });
    }

    // get stats

    const user = req.session[req.date.date];
    const stats = [];
    Object.values(req.session).forEach((game) => {
      if (game.guess) {
        stats.push({ guesses: game.guess, found: game.found });
      }
    });

    res.json({ guesses: user.guesses, stats });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  carDetails,
  guess,
  getUser,
};
