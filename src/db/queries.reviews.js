const Review = require("./models").Review;
const Movie = require("./models").Movie; 
const User = require("./models").User; 

module.exports = {

  createReview(newReview, callback){
    return Review.create(newReview)
    .then((review) => {
      console.log("This is 'review' from queries.reviews: ", review)
      callback(null, review);
    })
    .catch((err) => {
      console.log("This is the 'err' from queries.reviews: ", err)
      callback(err);
    });
  },

  deleteReview(req, callback){
    return Review.findById(req.params.id)
    .then((review) => {
      if(review){
        review.destroy();
        callback(null, review)
      } else {
        req.flash("notice", "Delete Failed")
        callback(404)
      }
    })
  },

  getReview(id, callback) { 
    return Review.findById(id, {
      include: [
        {model: Movie, include: [
          {model: User }
        ]}
      ]
    })
    .then((review) => {
        callback(null, review);
    })
    .catch((err) => {
        callback(err);
    })
  },

  updateReview(req, updatedReview, callback) { 
    return Review.findById(req.params.id)
        .then((review) => {
            review.update(updatedReview, {
                fields: Object.keys(updatedReview)
              })
              .then(() => {
                callback(null, review);
              })
              .catch((err) => {
                callback(err);
              });
            });
          } 

}