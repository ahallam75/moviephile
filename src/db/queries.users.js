const User = require("./models").User;
const Movie = require("./models").Movie;
const Review = require("./models").Review;
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

  getReview(id, callback) { 
    return Review.findById(id, {
      include: [
        {model: Movie, as: "movies", include: [
          {model: User}
        ]}
      ]
    })
    .then((review) => {
        callback(null, review);
    })
    .catch((err) => {
        callback(err);
    })
  },

  getUser(id, callback){
    return User.findById(id, {

      include: [{
        model: Movie,
        as: "movies", include: [
          {model: Review, as: "reviews"}
        ]
      }]
    })

   .then((user) => {
     callback(null, user);
   })
   .catch((err) => {
     callback(err);
   })
 }
 
}
