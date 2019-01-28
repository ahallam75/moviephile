const movieQueries = require("../db/queries.movies.js");

module.exports = {

new(req, res, next){
  if(currentUser) {
    res.render("movies/new", {userId: req.params.userId});
  } else {
    res.redirect("/users/");
  }
},

create(req, res, next){

  if(currentUser){
      let newMovie = {
          title: req.body.title,
          year: req.body.year,
          director: req.body.director,
          userId: req.user.id
      };
      movieQueries.addMovie(newMovie, (err, movie) => {
          if(err){
              res.redirect(500, "/movies/new");
          } else {
              res.redirect(303, `/users/${newMovie.userId}/movies/${movie.id}`);
          }
      });
    }
},

show(req, res, next){
  movieQueries.getMovie(req.params.id, (err, movie) => {
      if(err || movie == null){
          res.redirect(404, "/");
      } else {
          res.render("users/show", {movie}); //The movies should display in the user's "My Movie" page.
      }
  });
},

destroy(req, res, next){
  movieQueries.deleteMovie(req, (err, deletedRecordsCount) => { 
    if(err){ 
      res.redirect(500, `/users/${req.params.userId}/movies/${req.params.id}`) 
    } else { 
      res.redirect(303, `/users/${req.params.userId}`) 
    } 
  }); 
}, 

edit(req, res, next){
  movieQueries.getMovie(req.params.id, (err, movie) => {
      if(err || movie == null){
          res.redirect(404, "/");
      } else {

          if(currentUser){
              res.render("movies/edit", {movie});
          } else {
              req.flash("Attempt to edit failed.");
              res.redirect(`/movies/${req.params.id}`);
          }        
      }
  });
},

update(req, res, next) {
  movieQueries.updateMovie(req, req.body, (err, movie) => {
      if (err || movie == null) {
          res.redirect(404, `/users/${req.params.userId}/movies/${req.params.id}/edit`);
      } else {
          res.redirect(`/movies/${req.params.movieId}/movies/${req.params.id}`);
      }
  });
},



};