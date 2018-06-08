import express from "express"
import mongoose from "mongoose"

import Book from "../models/book"

var bookRouter = express.Router()

// GET all books
bookRouter.get("/all", (req, res) => {
    Book.find({})
        .then((books) => {
            res.status(200).send({
                books
            })
        })
        .catch(err => res.status(400).send(err))
})

// get book by mongodb document id
bookRouter.get("/:id", (req, res) => {
    Book.find({ _id: id })
        .then(books => {
            res.status(200).send({
                books
            })
        })
        .catch(err => res.status(404).send(err))
})

export default bookRouter