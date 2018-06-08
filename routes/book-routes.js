import express from "express"
import mongoose from "mongoose"
import { ObjectID } from "mongodb"

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
    var id = req.params.id

    if (ObjectID.isValid(id)) {
        Book.findOne({ _id: id })
            .then(book => {
                res.status(200).send({
                    book
                })
            })
            .catch(err => res.status(404).send(err))
    } else {
        res.status(400).send({ error: "Invalid ID" })
    }
})

export default bookRouter