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
  },

  /*
  getReview(id, callback) { 
    //return Movie.findById(id) 
    return Movie.findById(id, {
      include: [
        {model: Review, as: "reviews", include: [
          {model: User }
        ]}
      ]
    })
    .then((movie) => {
      console.log("This is the movie from getMovie in queries.movies: ", movie)

        callback(null, movie);
    })
    .catch((err) => {
        callback(err);
    })
  },
  
  */

  getReview(id, callback) { 
    //return Review.findById(id) 
    return Review.findById(id, {
      include: [
        {model: Movie, include: [
          {model: User }
        ]}
      ]
    })
    .then((review) => {
      //console.log("This is the review from getReview in queries.reviews: ", review)

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