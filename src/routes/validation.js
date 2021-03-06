module.exports = {
    validateMovies(req, res, next) { 
  
      if(req.method === "POST") {
  
        req.checkParams("userId", "must be valid").notEmpty().isInt();
        req.checkBody("title", "must be at least 1 characters in length").isLength({min: 1});
        req.checkBody("year", "must be at least 4 characters in length").isLength({min: 4});
        req.checkBody("director", "must be at least 2 characters in length").isLength({min: 2});
      }
  
      const errors = req.validationErrors();
  
      if (errors) {
  
        req.flash("error", errors);
        return res.redirect(303, req.headers.referer)
      } else {
        return next();
      }
    }, 

    validateUsers(req, res, next) {
      if(req.method === "POST") {
 
        req.checkBody("email", "must be valid").isEmail();
        req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6})
        req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
      }
 
      const errors = req.validationErrors();
 
      if (errors) {
        req.flash("error", errors);
        return res.redirect(req.headers.referer);
      } else {
        return next();
      }
    },

    validateReviews(req, res, next) {
      if(req.method === "POST") {
        req.checkBody("body", "must not be empty").notEmpty();
        req.checkBody("rating", "must").notEmpty().isInt({min: 0, max: 100});
      }
 
      const errors = req.validationErrors();
 
      if (errors) {
        req.flash("error", errors);
        return res.redirect(req.headers.referer);
      } else {
        return next()
      }
    }
  } // Final curly brace