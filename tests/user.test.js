import request from "supertest"
import expect from "expect"

// app
import app from "../server"
// model
import User from "../models/user"
// seed
import { users, populateUserData } from "./seed"

// pre hook
beforeEach(populateUserData)

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

    it("should login an user and return auth token and user", (done) => {
        let email = users[1].email
        let password = users[1].password

        let user = {
            email: email,
            password: password
        }

        request(app)
            .post("/user/login")
            .send(user)
            .expect(200)
            .expect(res => {
                expect(res.body.email).toBe(email)
                done()
            })
            .catch(err => done(err))
    })
})