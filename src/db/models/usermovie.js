'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserMovie = sequelize.define('UserMovie', {

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    review: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  UserMovie.associate = function(models) {
    // associations can be defined here
  };
  return UserMovie;
};