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
          body: "Great movie."
        }
      };
      request.post(options,
        (err, res, body) => {
          Review.findOne({where: {body: "Great movie."}})
          .then((review) => {
            expect(review).not.toBeNull();
            expect(review.body).toBe("Great movie.");
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
         `${base}${this.user.id}/movies/${this.movie.id}/reviews/${this.review.id}/destroy`,
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

}); //end context for signed in user

}); //Final curly brace, etc.