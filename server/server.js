const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
require("dotenv").config();

const dbConfig = require("./config/db.config");
const v1 = require("./routes/v1");

const port = 5125;

// json middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session middleware
// connect DB
const clientP = mongoose
  .connect(dbConfig.url, dbConfig.options)
  .then((m) => m.connection.getClient());

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      clientPromise: clientP,
      dbName: "cardle",
      stringify: false,
      autoRemove: "interval",
      autoRemoveInterval: 1,
    }),
  })
);

// react stuff
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.listen(process.env.PORT || 5125, () => {
  console.log(`Example app listening on port ${port}`);
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

// date middleware
app.use(require("./middleware/date.middleware"));

app.use("/v1", v1);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
