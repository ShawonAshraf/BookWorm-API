import request from "supertest"
import expect from "expect"

// app
import app from "../server"
// model
import User from "../models/user"
// seed
import { users, populateUserData } from "./seed"

// pre hook
// beforeEach(populateUserData)

// test
describe("POST /user", () => {
    it("should register an user and return auth token", (done) => {
        let user = {
            name: "xyz",
            email: "xyz@abc.com",
            password: "123456"
        }

        request(app)
            .post("/user/signup")
            .send(user)
            .expect((res) => {
                expect(res.headers["x-auth"]).toExist()
                expect(res.body.name).toBe(user.name)
                done()
            })
            .catch((err) => done(err))
    })

    it("should return an already registered user", (done) => {
        let email = users[0].email
        let password = users[0].password

        request(app)
            .post("/user/find")
            .send({ email, password })
            .expect((res) => {
                expect(res.body.email).toBe(email)
                done()
            })
            .catch((err) => done(err))
    })

    it('should login user and return auth token', (done) => {
        request(app)
            .post("/user/login")
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist()
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[1]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    })
                    done()
                }).catch((e) => done(e))
            })
    })

    it("should reject invalid login", (done) => {
        let email = users[0].email
        let password = users[0].password + "GGWP"

        let user = {
            email: email,
            password: password
        }

        request(app)
            .post("/user/login")
            .send(user)
            .expect(404)
            .expect(res => {
                let token = res.headers["x-auth"]
                expect(token).toNotExist()
                done()
            })
            .catch(err => done(err))
    })
})

describe("DELETE /user", () => {
    it("should remove auth token on logout", (done) => {
        request(app)
            .delete("/user/logout")
            .set("x-auth", users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                User.findById(users[0]._id).then((user) => {
                    expect(user.tokens.length).toBe(0)
                    done();
                }).catch((e) => done(e))
            });
    })
})