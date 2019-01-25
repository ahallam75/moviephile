const Movie = require("./models").Movie;

module.exports = {
  getAllMovies(callback){
    return Movie.all()
    .then((movies) => {
      callback(null, movies);
    })
    .catch((err) => {
      callback(err);
    })
  }
}