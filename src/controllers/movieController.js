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
              res.redirect(500, "/movies/new");
          } else {
              //res.redirect(303, `/users/${newMovie.userId}/movies/${movie.id}`);
              req.flash("notice", "You successfully added a new movie!");
              res.redirect(303, `/users/${req.params.userId}`);
          }
      });
},

show(req, res, next){
  movieQueries.getMovie(req.params.id, (err, movie) => {
      if(err || movie == null){
          res.redirect(404, "/");
      } else {
          res.render("users/show", {movie});
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
    //console.log("This is err from movieController: ", err);
    //console.log("This is deletedRecordsCount from movieController: ", deletedRecordsCount);
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
      //console.log("This is the err for edit: ", err);
      //console.log("This is the movie for edit: ", movie);
      if(err || movie == null){
        res.redirect(404, "movies/edit");
      } else {
        res.render("movies/edit", {movie});
      }
    });
},

/*update(req, res, next) {
  movieQueries.updateMovie(req, req.body, (err, movie) => {
      if (err || movie == null) {
          res.redirect(404, `/users/${req.params.userId}/movies/${req.params.id}/edit`);
      } else {
          res.redirect(`/movies/${req.params.movieId}/movies/${req.params.id}`);
      }
  });
} */

update(req, res, next) {
  movieQueries.updateMovie(req, req.body, (err, movie) => {
      if (err || movie == null) {
          res.redirect(404, `/users/${req.params.userId}/movies/${req.params.id}/edit`);
      } else {
          //res.redirect(200, `/users/${req.params.userId}/movies/${req.params.id}`);
          //res.redirect(200, `/users/${user.id}/show`);
          req.flash("notice", "The movie has been updated successfully");
          res.redirect(303, `/users/${req.params.userId}`);
      }
  });
}


};