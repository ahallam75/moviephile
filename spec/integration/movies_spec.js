const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const sequelize = require("../../src/db/models/index").sequelize;
const Movie = require("../../src/db/models").Movie;
const User = require("../../src/db/models").User;

describe("routes : movies", () => {

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
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

  describe("GET /users/:userId/movies/new", () => {

    it("should render a new movie form", (done) => {
      request.get(`${base}${this.user.id}/movies/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Movie");
        done();
      });
    });

  });

  describe("POST /users/:userId/movies/create", () => {

    it("should create a new movie and redirect", (done) => {
       const options = {
         url: `${base}/${this.user.id}/movies/create`,
         form: {
           title: "Star Wars",
           year: 1977,
           director: "George Lucas"
         }
       };
       request.post(options,
         (err, res, body) => {
 
           Movie.findOne({where: {title: "Star Wars"}})
           .then((movie) => {
             expect(movie).not.toBeNull();
             expect(movie.title).toBe("Star Wars");
             expect(movie.year).toBe(1977);
             expect(movie.director).toBe("George Lucas");
             expect(movie.userId).not.toBeNull();
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           });
         }
       );
     });
 
  });

  describe("GET /users/:userId/movies/:id", () => {

    it("should render a view with the selected movie", (done) => {
      request.get(`${base}/${this.user.id}/movies/${this.movie.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(this.movie.title).toContain("Star Wars");
        done();
      });
    });

  });

  describe("POST /users/:userId/movies/:id/destroy", () => {

    it("should delete the movie with the associated ID", (done) => {
      expect(this.movie.id).toBe(1);
      request.post(`${base}${this.user.id}/movies/${this.movie.id}/destroy`, (err, res, body) => {
        Movie.findById(1)
        .then((movie) => {
          expect(err).toBeNull();
          expect(movie).toBeNull();
          done();
        })
      });

    });

  });

  describe("GET /users/:userId/movies/:id/edit", () => {

    it("should render a view with an edit movie form", (done) => {
      request.get(`${base}${this.user.id}/movies/${this.movie.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Movie");
        expect(this.movie.title).toContain("Star Wars");
        expect(this.movie.year).toBe(1977);
        expect(this.movie.director).toContain("George Lucas");
        done();
      });
    });

  });

  describe("POST /users/:userId/movies/:id/update", () => {

    it("should return a status code 303", (done) => {
      request.post({
        url: `${base}${this.user.id}/movies/${this.movie.id}/update`,
        form: {
          title: "Star Wars",
          year: 1977,
          director: "George Lucas"
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(303);
        done();
      });
    });

    it("should update the movie with the given values", (done) => {
        const options = {
          url: `${base}/${this.user.id}/movies/${this.movie.id}/update`,
          form: {
            title: "Star Wars",
            year: 1977,
            director: "George Lucas"
          }
        };
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();

          Movie.findOne({
            where: {id: this.movie.id}
          })
          .then((movie) => {
            expect(this.movie.title).toContain("Star Wars");
            expect(this.movie.year).toBe(1977);
            expect(this.movie.director).toContain("George Lucas");
            done();
          });
        });
    });

  });

}); //Final closing curly brace



  