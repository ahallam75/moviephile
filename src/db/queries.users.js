const User = require("./models").User;
const Movie = require('./models').Movie;
const UserMovie = require('./models').UserMovie;
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
    let result = {};
    User.findById(id)
      .then((user) => {
        if (!user) {
          callback(404);
        } else {
          result["user"] = user;
         //console.log("This is 'result' from 'getUser': ", result);
         //console.log("This is the err from getUser: ", err);
        }
      })
      .catch((err) => {
        callback(err);
      })
  }

}
