import express from "express"
import _ from "lodash"
import mongoose from "mongoose"
import { ObjectID } from "mongodb"

// model
import Book from "../models/book"

// auth middleware
import { authenticate } from "../middleware/authenticate"

let bookRouter = express.Router()

// GET all books
bookRouter.get("/all", authenticate, (req, res) => {
    Book.find({})
        .then((books) => {
            res.status(200).send({
                books
            })
        })
        .catch(err => res.status(400).send(err))
})

// get book by mongodb document id
bookRouter.get("/byid/:id", authenticate, (req, res) => {
    let id = req.params.id

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

// get book by name
bookRouter.get("/byname/:name", authenticate, (req, res) => {
    let name = req.params.name

    Book.findOne({ name: name })
        .then(book => {
            res.status(200).send(book)
        })
        .catch(err => res.status(404).send(err))
})

// get book by author
bookRouter.get("/byauthor/:author", authenticate, (req, res) => {
    let author = req.params.author

    Book.findOne({ author: author })
        .then(book => {
            res.status(200).send(book)
        })
        .catch(err => res.status(404).send(err))
})

// add a book
bookRouter.post("/add", authenticate, (req, res) => {
    let book = req.body

    let bookEntry = new Book({
        name: book.name,
        author: book.author,
        addedOn: new Date(),
        addedBy: req.user.name
    })

    bookEntry.save().then(
        book => res.status(200).send(book),
        err => res.status(400).send(err)
    )
})

// delete a book
// by id
bookRouter.delete("/delete/:id", authenticate, (req, res) => {
    let id = req.params.id

    if (ObjectID.isValid(id)) {
        Book.findByIdAndRemove(id)
            .then(deletedBook => {
                res.send(deletedBook)
            })
            .catch(err => res.status(404).send(err))
    } else {
        res.status(400).send({ "error": "Invalid ID" })
    }
})

// update book info
// by id
bookRouter.put("/update/:id", authenticate, (req, res) => {
    let id = req.params.id
    let newInfo = _.pick(req.body, ["name", "author"])

    if (ObjectID.isValid(id)) {
        Book.findByIdAndUpdate(id, { $set: newInfo }, { new: true })
            .then(updatedBook => {
                res.status(200).send(updatedBook)
            })
            .catch(err => re.status(404).send(err))
    } else {
        res.status(400).send({ "error": "Invalid ID" })
    }
})

export default bookRouter