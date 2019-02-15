const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');

module.exports = {
    signUp(req, res, next){
      res.render("users/sign_up");
    },

    create(req, res, next){
    
           let newUser = {
             email: req.body.email,
             password: req.body.password,
             passwordConfirmation: req.body.passwordConfirmation
           };
      
           userQueries.createUser(newUser, (err, user) => {
             if(err){
               req.flash("error", err);
               res.redirect("/users/sign_up");
             } else {
               passport.authenticate("local")(req, res, () => {
                 req.flash("notice", "You've successfully signed in!");
                 sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                 const msg = {
                   to: user.email,
                   from: 'support@moviephile.com',
                   subject: 'Welcome to Moviephile!',
                   text: `Welcome to Moviephile ${user.email}!`,
                   html: `<strong>Welcome to Moviephile ${user.email}!</strong>`,
                 };
                 sgMail.send(msg);
                 res.redirect("/");
               })
             }
           });
    },

    signInForm(req, res, next){
      res.render("users/sign_in");
    }, 

    signIn(req, res, next){
      passport.authenticate("local")(req, res, function () {
        if(!req.user){
          req.flash("notice", "Sign in failed. Please try again.")
          res.redirect("/users/sign_in");
        } else {
          req.flash("notice", "You've successfully signed in!");
          res.redirect(303, `/users/${req.user.id}`);
        }
      })
    }, 

    signOut(req, res, next){
      req.logout();
      req.flash("notice", "You've successfully signed out!");
      res.redirect("/");
    },

    

   show(req, res, next){
       userQueries.getUser(req.params.id, (err, user) => {
         if(err || user === undefined){
           
           req.flash("notice", "No user found with that ID");
           res.redirect("/");
         } else {
           
           res.render("users/show", {user});
         }
       });
   } 
    
/*
  show(req, res, next){
    let sortedMovies = null;
    userQueries.getUser(req.params.id, (err, user) => {
      if(err || user === undefined){
        console.log("This is the err: ", err)
        req.flash("notice", "No user found with that ID");
        res.redirect("/");
      } else {
        console.log("This is user: ", user)

        sortedMovies = user.movies.sort( (a, b) => {
          return a.user.reviews.rating - b.user.reviews.rating;
        });

        res.render("users/show", {user, sortedMovies});
      }
    });
  }  
    */

  }