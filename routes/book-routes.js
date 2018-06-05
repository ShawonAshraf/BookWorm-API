import express from "express"
import mongoose from "mongoose"

import Book from "../models/book"

var bookRouter = express.Router()

// GET all books
bookRouter.get("/all", (req, res) => {
    Book.find({})
        .then((books) => {
            res.send({
                books
            })
        })
        .catch(err => res.status(400).send(err))
})