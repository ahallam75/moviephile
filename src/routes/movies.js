const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController")

router.get("/movies", movieController.index);

module.exports = router;