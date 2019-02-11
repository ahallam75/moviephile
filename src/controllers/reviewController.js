const reviewQueries = require("../db/queries.reviews.js");
const movieQueries = require("../db/queries.movies.js");


module.exports = {

  create(req, res, next){
 
      let newReview = {
        body: req.body.body,
        userId: req.user.id,
        movieId: req.params.movieId
      };

      reviewQueries.createReview(newReview, (err, review) => {

        if(err){
          req.flash("error", err);
          res.redirect(req.headers.referer);
        } else {
          res.redirect(req.headers.referer);
        }
      });
  },

  /*
  show(req, res, next){
    reviewQueries.getReview(req.params.id, (err, review) => {
        if(err || review == null){
            res.redirect(404, "/");
        } else {
            res.render("reviews/show", {review});
        }
    });
  }, */

edit(req, res, next){
    reviewQueries.getReview(req.params.id, (err, movie) => {
      console.log("This is the err for edit: ", err);
      console.log("This is the movie for edit: ", movie);
      if(err || movie == null){
        res.redirect(404, "reviews/edit");
      } else {
        res.render("reviews/edit", {movie});
      }
    });
}, 

update(req, res, next) {
  reviewQueries.updateReview(req, req.body, (err, review) => {
      if (err || review == null) {
          res.redirect(404, `/users/${req.params.userId}/movies/${req.params.id}/reviews/${req.params.id}/edit`);
      } else {
          //res.redirect(200, `/users/${req.params.userId}/movies/${req.params.id}`);
          //res.redirect(200, `/users/${user.id}/show`);
          req.flash("notice", "The review has been updated successfully");
          res.redirect(303, `/users/${req.params.userId}/movies/${req.params.movieId}/reviews/${req.params.id}`);
      }
  });
},

destroy(req, res, next){
    reviewQueries.deleteReview(req, (err, review) => {
      if(err){
        res.redirect(err, req.headers.referer);
      } else {
        res.redirect(req.headers.referer);
      }
    });
  }

}
