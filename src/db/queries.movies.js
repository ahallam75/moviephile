const Movie = require('./models').Movie;
const User = require('./models').User;

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

  addMovie(newMovie, callback) {  //Posts
    return Movie.create(newMovie)
        .then((movie) => {
            callback(null, movie);
        })
        .catch((err) => {
             callback(err);
        })
  },

  getMovie(id, callback) {  //Posts
    return Movie.findById(id, {
        include: [
          {model: User}
        ]
    })
    .then((post) => {
        callback(null, post);
    })
    .catch((err) => {
        callback(err);
    })
  },

  deleteMovie(req, callback) { //Posts
    return Movie.findById(req.params.id) 
        .then((movie) => {
            if(currentUser) {
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

  updateMovie(req, updatedMovie, callback) { //Posts
    return Movie.findById(req.params.id)
        .then((movie) => {

            if (!movie) {
                return callback("Movie not found");
            }

            if(currentUser) {

                movie.update(updatedMovie, {
                    fields: Object.keys(updatedMovie)
                })
                .then(() => {
                    callback(null, movie);
                })
                .catch((err) => {
                    callback(err);
                });
            } else {
                req.flash("notice", "Update failed.");
                callback("Forbidden");
            }
      });
  }

  
};