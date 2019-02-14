const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";

const sequelize = require("../../src/db/models/index").sequelize;
const Movie = require("../../src/db/models").Movie;
const User = require("../../src/db/models").User;
const Review = require("../../src/db/models").Review;

describe("Review", () => {

  beforeEach((done) => {
    this.user;
    this.movie;
    this.review;

    sequelize.sync({force: true}).then((res) => {

      User.create({
        email: "fake@example.com",
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

          Review.create({
            body: "Great movie.",
            rating: 100,
            userId: this.user.id,
            movieId: this.movie.id
          })
          .then((review) => {
            this.review = review;
            done();
          })
        
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });
});

describe("signed in user performing CRUD actions for Review", () => {

  beforeEach((done) => {    // before each suite in this context
    request.get({           // mock authentication
      url: "http://localhost:3000/auth/fake",
      form: {
        role: "member",     // mock authenticate as member user
        userId: this.user.id
      }
    },
      (err, res, body) => {
        done();
      }
    );
  });

  describe("POST /users/:userId/movies/:movieId/reviews/create", () => {

    it("should create a new review and redirect", (done) => {
      const options = {
        url: `${base}${this.user.id}/movies/${this.movie.id}/reviews/create`,
        form: {
          body: "Great movie.",
          rating: 100
        }
      };
      request.post(options,
        (err, res, body) => {
          Review.findOne({where: {body: "Great movie."}})
          .then((review) => {
            expect(review).not.toBeNull();
            expect(review.body).toBe("Great movie.");
            expect(review.rating).toBe(100);
            expect(review.id).not.toBeNull();
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

  describe("POST /users/:userId/movies/:movieId/reviews/:id/destroy", () => {

    it("should delete the review with the associated ID", (done) => {
      Review.all()
      .then((reviews) => {
        const reviewCountBeforeDelete = reviews.length;

        expect(reviewCountBeforeDelete).toBe(1);

        request.post(
         `${base}${this.movie.id}/movies/${this.movie.id}/reviews/${this.review.id}/destroy`,
          (err, res, body) => {
          expect(res.statusCode).toBe(302);
          Review.all()
          .then((reviews) => {
            expect(err).toBeNull();
            expect(reviews.length).toBe(reviewCountBeforeDelete - 1);
            done();
          })

        });
      })

    });

  });

}); 

  //Edit and Update

  describe("GET /users/:userId/movies/:id/reviews/:id/edit", () => {

    it("should render a view with an edit review form", (done) => {
      request.get(`${base}${this.user.id}/movies/${this.movie.id}/reviews/${this.review.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(this.review.body).toContain("Great movie.");
        expect(this.review.rating).toBe(100);
        done();
      });
    });

  });

  describe("POST /users/:userId/movies/:id/reviews/:id/update", () => {

    it("should return a status code 303", (done) => {
      request.post({
        url: `${base}${this.user.id}/movies/${this.movie.id}/reviews/${this.review.id}/update`,
        form: {
          body: "This is a good movie.",
          rating: 95
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(303);
        done();
      });
    });

    it("should update the review with the given values", (done) => {
        const options = {
          url: `${base}/${this.user.id}/movies/${this.movie.id}/reviews/${this.review.id}update`,
          form: {
            body: "This is a good movie.",
            rating: 95
          }
        };
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();

          Review.findOne({
            where: {id: this.review.id}
          })
          .then((review) => {
            expect(review.body).toContain("Great movie.");
            expect(review.rating).toBe(100);
            done();
          });
        });
    });

  });

}); //end context for signed in user
