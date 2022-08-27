const express = require("express");
const router = express.Router();

const v1Controller = require("../controllers/v1.controller");

router.get("/car-details", v1Controller.carDetails);

router.get("/guess", v1Controller.guess);

router.get("/get-user", v1Controller.getUser);

module.exports = router;
