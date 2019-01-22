'use strict';
module.exports = (sequelize, DataTypes) => {
  var Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    director: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Users",
        key: "id",
        as: "userId",
      },
    }
  }, {});
  Movie.associate = function(models) {
    Movie.belongsToMany(models.User, {
      through: 'UserMovie',
      as: 'users',
      foreignKey: 'movieId'
    });
  };
  return Movie;
};