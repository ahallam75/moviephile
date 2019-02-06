const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const validation = require("./validation");

router.post("/users/:userId/movies/:movieId/reviews/create",
  validation.validateReviews,
  reviewController.create);

router.post("/users/:userId/movies/:movieId/reviews/:id/destroy",
  reviewController.destroy);

module.exports = router;