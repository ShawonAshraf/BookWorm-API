import express from "express"
import _ from "lodash"
import mongoose from "mongoose"
import { ObjectID } from "mongodb"

// auth middleware
import { authenticate } from "../middleware/authenticate"

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

// login an user
userRouter.post("/login", (req, res) => {
    let credentials = _.pick(req.body, ["email", "password"])

    // if user exists a token will be sent
    User.findByCredentials(credentials.email, credentials.password)
        .then(user => {
            user.generateAuthToken()
                .then(token => res.status(200).header("x-auth", token).send(user))
        })
        .catch(err => res.status(404).send({
            message: "Sorry, no user found with the following credential. Register.",
            credential: {
                email: credentials.email
            }
        }))
})

// logout user
userRouter.delete("/logout", authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send({ message: "User has been logged out!" })
    }).catch((err) => {
        res.status(400).send({ err })
    })
})

export default userRouter