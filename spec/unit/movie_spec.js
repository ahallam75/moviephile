const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Movie = require("../../src/db/models").Movie;

describe("Movie", () => {

  beforeEach((done) => {

    //this.user;
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

  describe("#create()", () => {

    it("should create a movie object with a title, year, and director", (done) => {

      Movie.create({
        title: "Star Wars",
        year: 1977,
        director: "George Lucas",
        userId: this.user.id
      })
      .then((movie) => {

        expect(movie.title).toBe("Star Wars");
        expect(movie.year).toBe(1977);
        expect(movie.director).toBe("George Lucas");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a movie with missing title, year, or director", (done) => {
        Movie.create({
          title: "Star Wars"
        })
        .then((movie) => {
   
         // the code in this block will not be evaluated since the validation error
         // will skip it. Instead, it will catch the error in the catch block below
         // and set the expectations there
   
          done();
   
        })
        .catch((err) => {
   
          expect(err.message).toContain("Movie.year cannot be null");  
          expect(err.message).toContain("Movie.director cannot be null");
          expect(err.message).toContain("Movie.userId cannot be null");
          done();
   
        })
    });

  });

  describe("#setUser()", () => {

    it("should associate a user and a movie together", (done) => {

      User.create({
        email: "user@example.com",
        password: "fakepassword123"
      })
      .then((newUser) => {
        expect(this.movie.userId).toBe(this.user.id);

        this.movie.setUser(newUser)
        .then((movie) => {
          expect(movie.userId).toBe(newUser.id);
          done();

        });
      })
    });

  });

  describe("#getUser()", () => {

    it("should return the associated user", (done) => {

      this.movie.getUser()
      .then((associatedUser) => {
        expect(associatedUser.email).toBe("user@example.com");
        done();
      });

    });

  });
  


});