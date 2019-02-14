const reviewQueries = require("../db/queries.reviews.js");

module.exports = {

  create(req, res, next){
 
      let newReview = {
        body: req.body.body,
        rating: req.body.rating,
        userId: req.user.id,
        movieId: req.params.movieId
      };

      reviewQueries.createReview(newReview, (err, review) => {
        //console.log("This is 'newReview' from reviewController: ", newReview)

        if(err){
          //console.log("This is 'err' from reviewController: ", err)

          req.flash("error", err);
          res.redirect(req.headers.referer);
        } else {
          req.flash("notice", "You have added a review!");
          res.redirect(req.headers.referer);
        }
      });
  },

edit(req, res, next){
    reviewQueries.getReview(req.params.id, (err, review) => {
      if(err || review == null){
        res.redirect(404, "reviews/edit");
      } else {
        res.render("reviews/edit", {review});
      }
    });
}, 

update(req, res, next) {
  reviewQueries.updateReview(req, req.body, (err, review) => {
      if (err || review == null) {
          req.flash("error", err);
          res.redirect(404, `/users/${req.params.userId}/movies/${req.params.id}/reviews/${req.params.id}/edit`);
      } else {
          req.flash("notice", "The review has been updated successfully");
          res.redirect(303, `/users/${req.params.userId}/movies/${req.params.movieId}/show`);
      }
  });
},

destroy(req, res, next){
    reviewQueries.deleteReview(req, (err, review) => {
      if(err){
        req.flash("error", err);
        res.redirect(err, req.headers.referer);
      } else {
        req.flash("notice", "The review has been deleted successfully");
        res.redirect(req.headers.referer);
      }
    });
  }

}
