'use strict';
module.exports = (sequelize, DataTypes) => {
  var Movie = sequelize.define('Movie', {

    title: {
       type: DataTypes.STRING,
       allowNull: false
     },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE" //,
      /*references: {
        model: "Users",
        key: "id",
        as: "userId",
      },*/
    }
  }, {});
  Movie.associate = function(models) {
    Movie.belongsTo(models.User, {
      foreignKey: "userId"
    });

    Movie.hasOne(models.Review, {
      foreignKey: "movieId",
      as: "reviews"
    });
  };
    
  return Movie;
};