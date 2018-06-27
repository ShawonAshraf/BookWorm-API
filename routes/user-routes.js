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

    user.save().then(() => {
            // return auth token
            user.generateAuthToken()
        })
        .then((token) => {
            res.header("x-auth", token).send(user)
        })
        .catch(err => res.status(400).send(err))
})

export default userRouter