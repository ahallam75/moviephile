module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const userRoutes = require("../routes/users");
      const movieRoutes = require("../routes/movies");
      const reviewRoutes = require("../routes/reviews");

      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(movieRoutes);
      app.use(reviewRoutes);
    }
  }