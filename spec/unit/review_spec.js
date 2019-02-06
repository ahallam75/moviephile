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

          Review.create({
            body: "Great movie.",
            userId: this.user.id,
            movieId: this.movie.id
          })
          .then((review) => {
            this.review = review;
            done();
          })
        
      });
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });
});

  describe("#create()", () => {

    it("should create a review object with a body, assigned movie and user", (done) => {
      Review.create({                
        body: "The best movie ever!",
        movieId: this.movie.id,
        userId: this.user.id
      })
      .then((review) => {           
        expect(review.body).toBe("The best movie ever!");
        expect(review.movieId).toBe(this.movie.id);
        expect(review.userId).toBe(this.user.id)
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a review with missing body, assigned movie or user", (done) => {
      Review.create({
        body: "Still a great movie after all these years!"
      })
      .then((review) => {

        // the code in this block will not be evaluated since the validation error
        // will skip it. Instead, it will catch the error in the catch block below
        // and set the expectations there

        done();

      })
      .catch((err) => {

        expect(err.message).toContain("Review.userId cannot be null");
        expect(err.message).toContain("Review.movieId cannot be null");
        done();

      })
    });

  });

  describe("#setUser()", () => {

    it("should associate a review and a user together", (done) => {

      User.create({               
        email: "fakeb@example.com",
        password: "fakepassword123"
      })
      .then((newUser) => {       

        expect(this.review.userId).toBe(this.user.id); 

        this.review.setUser(newUser)                
        .then((review) => {

          expect(review.userId).toBe(newUser.id); 
          done();

        });
      })
    });

  });

  describe("#getUser()", () => {

    it("should return the associated user", (done) => {

      this.review.getUser()
      .then((associatedUser) => {
        expect(associatedUser.email).toBe("fake@example.com");
        done();
      });

    });

  });

  describe("#setMovie()", () => {

    it("should associate a movie and a review together", (done) => {

      Movie.create({      
        title: "Star Wars",
        year: 1977,
        director: "George Lucas",
        userId: this.user.id
      })
      .then((newMovie) => {

        expect(this.review.movieId).toBe(this.review.id); 

        this.review.setMovie(newMovie)                   
        .then((review) => {

          expect(review.movieId).toBe(newMovie.id);      
          done();

        });
      })
    });

  });

  describe("#getMovie()", () => {

    it("should return the associated movie", (done) => {

      this.review.getMovie()
      .then((associatedMovie) => {
        expect(associatedMovie.title).toBe("Star Wars");
        done();
      });

    });

  });



