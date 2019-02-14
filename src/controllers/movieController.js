const movieQueries = require("../db/queries.movies.js");
const passport = require("passport");

module.exports = {

new(req, res, next){
  res.render("movies/new", {userId: req.params.userId});
},

create(req, res, next){

      let newMovie = {
          title: req.body.title,
          year: req.body.year,
          director: req.body.director,
          userId: req.user.id
      };
      
      movieQueries.addMovie(newMovie, (err, movie) => {
          if(err){
              req.flash("error", err);
              res.redirect(500, "/movies/new");
          } else {
              req.flash("notice", "You successfully added a new movie!");
              res.redirect(303, `/users/${req.params.userId}`);
          }
      });
},

show(req, res, next){
    let sortedMovies = null;
  movieQueries.getMovie(req.params.id, (err, movie) => {
      if(err || movie == null){
          res.redirect(404, "/");
      } else {
        sortedMovies = movie.sort( (a, b) => {
            a.reviews.rating - b.reviews.rating;
          });
          res.render("users/show", {sortedMovies});
      }
  });
},

showTwo(req, res, next){
    movieQueries.getMovie(req.params.id, (err, movie) => {
        if(err || movie == null){
            res.redirect(404, "/");
        } else {
            res.render("movies/show", {movie});
        }
    });
  },

destroy(req, res, next){
  movieQueries.deleteMovie(req, (err, deletedRecordsCount) => { 
    if(err){ 
      res.redirect(500, `/users/${req.params.userId}/movies/${req.params.id}`) 
    } else { 
      req.flash("notice", "The movie has been deleted");
      res.redirect(303, `/users/${req.params.userId}`);
    } 
  }); 
}, 

edit(req, res, next){
    movieQueries.getMovie(req.params.id, (err, movie) => {
      if(err || movie == null){
        res.redirect(404, "movies/edit");
      } else {
        res.render("movies/edit", {movie});
      }
    });
},

update(req, res, next) {
  movieQueries.updateMovie(req, req.body, (err, movie) => {
      if (err || movie == null) {
          req.flash("error", err);
          res.redirect(404, `/users/${req.params.userId}/movies/${req.params.id}/edit`);
      } else {
          req.flash("notice", "The movie has been updated successfully");
          res.redirect(303, `/users/${req.params.userId}`);
      }
  });
}


};