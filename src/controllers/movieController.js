const movieQueries = require("../db/queries.movies.js");
//const Movie = require('../models').Movie;
//const User = require('../models').User;

module.exports = {
  list(req, res) {
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
  },

  add(req, res) {
    return Movie
      .create({
        movie_name: req.body.movie_name,
      })
      .then((movie) => res.status(201).send(movie))
      .catch((error) => res.status(400).send(error));
  },

  addUser(req, res) {
    return Movie
      .findById(req.body.movie_id, {
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
        User.findById(req.body.movie_id).then((course) => {
          if (!course) {
            return res.status(404).send({
              message: 'User Not Found',
            });
          }
          movie.addUser(course);
          return res.status(200).send(movie);
        })
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Movie
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then(movie => {
        if (!movie) {
          return res.status(404).send({
            message: 'Movie Not Found',
          });
        }
        return movie
          .update({
            movie_name: req.body.movie_name || classroom.movie_name,
          })
          .then(() => res.status(200).send(movie))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Movie
      .findById(req.params.id)
      .then(movie => {
        if (!movie) {
          return res.status(400).send({
            message: 'Movie Not Found',
          });
        }
        return movie
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};