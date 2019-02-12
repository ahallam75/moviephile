const Movie = require('./models').Movie;
const User = require('./models').User;
const Review = require('./models').Review;

module.exports = {

  addMovie(newMovie, callback) {  
    return Movie.create(newMovie)
        .then((movie) => {
            callback(null, movie);
        })
        .catch((err) => {
             callback(err);
        })
  },

  getMovie(id, callback) { 
    return Movie.findById(id, {
      include: [
        {model: Review, as: "reviews", include: [
          {model: User }
        ]}
      ]
    })
    .then((movie) => {
        callback(null, movie);
    })
    .catch((err) => {
        callback(err);
    })
  },

  deleteMovie(req, callback) { 
    return Movie.findById(req.params.id) 
        .then((movie) => {
            if(movie) {
                movie.destroy()
                    .then((res) => {
                        callback(null, movie);
                    });
            } else {
                req.flash("notice", "Delete failed.");
            }
        })
        .catch((err) => {
            callback(err);
        });
  }, 

  updateMovie(req, updatedMovie, callback) { 
    return Movie.findById(req.params.id)
        .then((movie) => {
            movie.update(updatedMovie, {
                fields: Object.keys(updatedMovie)
              })
              .then(() => {
                callback(null, movie);
              })
              .catch((err) => {
                callback(err);
              });
            });
          }

  
};