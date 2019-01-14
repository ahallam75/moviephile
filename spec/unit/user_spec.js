const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

  beforeEach((done) => {

    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("#create()", () => {

    it("should create a User object with a valid email and password", (done) => {
      User.create({
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {
        expect(user.email).toBe("user@example.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a user with invalid email or password", (done) => {
      User.create({
        email: "It's-a me, Mario!",
        password: "1234567890"
      })
      .then((user) => {

        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it("should not create a user with an email already taken", (done) => {

      User.create({
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {

        User.create({
          email: "user@example.com",
          password: "nananananananananananananananana BATMAN!"
        })
        .then((user) => {

          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        });

        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("POST /users", () => {

        it("should create a new user with valid values and redirect", (done) => {
    
          const options = {
            url: base,
            form: {
              email: "user@example.com",
              password: "123456789"
            }
          }
    
          request.post(options,
            (err, res, body) => {
    

              User.findOne({where: {email: "user@example.com"}})
              .then((user) => {
                expect(user).not.toBeNull();
                expect(user.email).toBe("user@example.com");
                expect(user.id).toBe(1);
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });
    
        it("should not create a new user with invalid attributes and redirect", (done) => {
          request.post(
            {
              url: base,
              form: {
                email: "no",
                password: "123456789"
              }
            },
            (err, res, body) => {
              User.findOne({where: {email: "no"}})
              .then((user) => {
                expect(user).toBeNull();
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

});