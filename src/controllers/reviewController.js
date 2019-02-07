const reviewQueries = require("../db/queries.reviews.js");

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

  show(req, res, next){
    movieQueries.getReview(req.params.id, (err, review) => {
        if(err || review == null){
            res.redirect(404, "/");
        } else {
            res.render("reviews/show", {review});
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
