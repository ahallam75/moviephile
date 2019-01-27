const express = require("express");
const router = express.Router();
const validation = require("./validation");
const movieController = require("../controllers/movieController");

module.exports = router;

/*router.get("/users/:userId/movies/new", movieController.new);
router.post("/users/:userId/movies/create",
   validation.validateMovies,
   movieController.create); 
router.get("/users/:userId/movies/:id", movieController.show);
router.post("/users/:userId/movies/:id/destroy", movieController.destroy);
router.get("/users/:userId/movies/:id/edit", movieController.edit);
router.post("/users/:userId/movies/:id/update", validation.validateMovies, movieController.update); */

router.get("/movies/:userId/movies/new", movieController.new);
router.post("/movies/:userId/movies/create",
   validation.validateMovies,
   movieController.create); 
router.get("/movies/:movieId/movies/:id", movieController.show);
router.post("/movies/:movieId/movies/:id/destroy", movieController.destroy);
router.get("/movies/:movieId/movies/:id/edit", movieController.edit);
router.post("/movies/:movieId/movies/:id/update", validation.validateMovies, movieController.update); 