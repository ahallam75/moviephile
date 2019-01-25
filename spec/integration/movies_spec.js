const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/movies/";
const sequelize = require("../../src/db/models/index").sequelize;
const Movie = require("../../src/db/models").Movie;

describe("routes : movies", () => {
  beforeEach((done) => {
    this.movie;
    sequelize.sync({force: true}).then((res) => {

     Movie.create({
       title: "Star Wars",
       year: 1977,
       director: "George Lucas"
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


  describe("GET /movies", () => {

    it("should return a status code 200 and all movies", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    request.get(base, (err, res, body) => {
      expect(res.statusCode).toBe(200);
      expect(err).toBeNull();
      expect(body).toContain("Movies");
      expect(body).toContain("Star Wars");
      done();
    });
  });
});

  