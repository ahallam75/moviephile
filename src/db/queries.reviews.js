const Review = require("./models").Review;
const Movie = require("./models").Movie;
const User = require("./models").User;

module.exports = {

  createReview(newReview, callback){
    return Review.create(newReview)
    .then((review) => {
      callback(null, review);
    })
    .catch((err) => {
      callback(err);
    });
  },

  deleteReview(req, callback){
    return Review.findById(req.params.id)
    .then((review) => {
      review.destroy();
      callback(null, review)
    .catch((err) => {
      callback(err);
      });
    })
  }

}