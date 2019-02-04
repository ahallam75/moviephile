const User = require("./models").User;
const Movie = require("./models").Movie;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

  createUser(newUser, callback){

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      const msg = {
        to: 'test@example.com',
        from: 'test@example.com',
        subject: 'Thanks for joining Moviephile!',
        text: 'You are going to have a blast!',
        html: '<strong>Enjoy your movie sharing experience!!</strong>',
      };
      sgMail.send(msg);
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getUser(id, callback) {  
    return User.findById(id, {
        include: [
          {model: Movie,
          as: "movies"
        }]
    }) 
    .then((user) => {
        console.log("This is the console.log for 'movie' from queries.users: ", user);
        callback(null, user);
    })
    .catch((err) => {
        console.log("This is the console.log for 'err' from queries.users: ", err);
        callback(err);
    })
  },

  /*
  getUser(id, callback) {
    let result = {};
    //return User.findById(id)
    return User.findById(id, {
      include: [{
        model: Movie,
        as: "movies"
      }]
    }) 
    .then((user) => {
      if (!user) {
        callback(404);
      } else {
        result["user"] = user;
        //console.log("This is result: ", result);
        callback(null, user);
      }
    })
        .catch((err) => {
        callback(err);
        })
  }  */

}

/*
User.findByPk(id, {
  include: [{
      model: Movie
  }]
})
.then(user => {
// Here, you can access user.MovieRatings
}); */