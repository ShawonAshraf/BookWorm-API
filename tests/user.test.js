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
})