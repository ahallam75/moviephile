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
    }
    
  }, {});
  Movie.associate = function(models) {
    /*Movie.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    */
    Movie.belongsToMany(models.User, {
      through: "UserMovie",
      as: "users",
      foreignKey: "movieId"
    });
   };
    
  return Movie;
};