const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const validation = require("./validation");

router.get("/users/:userId/movies/:id/reviews/:id", reviewController.show); 
router.post("/users/:userId/movies/:movieId/reviews/create",
  validation.validateReviews,
  reviewController.create);

router.post("/users/:userId/movies/:movieId/reviews/:id/destroy",
  reviewController.destroy);

module.exports = router;