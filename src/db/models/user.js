'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

    User.associate = function(models) {
      /* User.hasMany(models.Movie, {
        foreignKey: 'userId',
        as: 'movies'
      }); */
      User.belongsToMany(models.Movie, {
        through: "UserMovie",
        as: "movies",
        foreignKey: "userId"
      });
     };
  

  return User;

};