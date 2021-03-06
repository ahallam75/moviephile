const express = require("express");
const router = express.Router();
const validation = require("./validation");
const movieController = require("../controllers/movieController");
const userController = require("../controllers/userController");

module.exports = router;

router.get("/users/:userId/movies/new", movieController.new);
router.post("/users/:userId/movies/create",
   validation.validateMovies,
   movieController.create); 
router.get("/users/:userId/movies/:id/show", movieController.showTwo);  
router.get("/users/:userId/movies/:id", userController.show);  
router.post("/users/:userId/movies/:id/destroy", movieController.destroy);
router.get("/users/:userId/movies/:id/edit", movieController.edit);
router.post("/users/:userId/movies/:id/update", 
   validation.validateMovies, 
   movieController.update); 


