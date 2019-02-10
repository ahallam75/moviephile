const Review = require("./models").Review;

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
 /*
  getReview(id, callback) { 
    //return Review.findById(id) 
    return Review.findById(id, {
      include: [
        {model: Movie, as: "movies", include: [
          {model: User}
        ]}
      ]
    })
    .then((review) => {
        callback(null, review);
    })
    .catch((err) => {
        callback(err);
    })
  }, */

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