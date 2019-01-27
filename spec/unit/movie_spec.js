const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("Movie", () => {

  beforeEach((done) => {

    this.user;
    this.movie;
    sequelize.sync({force: true}).then((res) => {

      User.create({
        email: "user@example.com",
        password: "fakepassword123"
      })
      .then((user) => {
        this.user = user;

        Movie.create({
          title: "Star Wars",
          year: 1977,
          director: "George Lucas",
          userId: this.user.id
        })
        .then((movie) => {
          this.movie = movie;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });
});