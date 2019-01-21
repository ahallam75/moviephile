module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const userRoutes = require("../routes/users");
      const movieRoutes = require("../routes/movies");

      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(movieRoutes);
    }
  }