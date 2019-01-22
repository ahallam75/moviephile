'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserMovie = sequelize.define('UserMovie', {
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  }, {});
  UserMovie.associate = function(models) {
    // associations can be defined here
  };
  return UserMovie;
};