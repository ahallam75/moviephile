const Movie = require('./models').Movie;
const User = require('./models').User;
const Review = require('./models').Review;

module.exports = {
  /*list(req, res) {
    return Movie
      .findAll({
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then((movies) => res.status(200).send(movies))
      .catch((error) => { res.status(400).send(error); });
  }, 

  getById(req, res) {
    return Movie
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then((movie) => {
        if (!movie) {
          return res.status(404).send({
            message: 'Movie Not Found',
          });
        }
        return res.status(200).send(movie);
      })
      .catch((error) => res.status(400).send(error));
  },*/

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
    //return Movie.findById(id) 
    return Movie.findById(id, {
      include: [
        {model: Review, as: "reviews", include: [
          {model: User }
        ]}
      ]
    })
    .then((movie) => {
      //console.log("This is the movie from getMovie in queries.movies: ", movie)

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