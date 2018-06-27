import express from "express"
import _ from "lodash"
import mongoose from "mongoose"
import { ObjectID } from "mongodb"

// model
import User from "../models/user"

// router
let userRouter = express.Router()

// sign up user
userRouter.post("/signup", (req, res) => {
    let body = _.pick(req.body, ["name", "email", "password"])
    let user = new User(body)

    user.save()
        .then(() => {
            return user.generateAuthToken()
                .then(token => {
                    res.header('x-auth', token).send({
                        name: user.name,
                        email: user.email
                    })
                })
        })
        .catch(err => res.send(err))

})

// get an user by email, password
userRouter.post("/find", (req, res) => {
    let body = _.pick(req.body, ["email", "password"])

    User.findOne({ email: body.email })
        .then((user) => res.send(user))
        .catch(err => res.status(404).send({
            message: "User not found, please register."
        }))
})

export default userRouter