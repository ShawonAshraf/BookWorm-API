import { ObjectID } from "mongodb"
import Book from "../models/book";

const bookOneId = new ObjectID()
const bookTwoId = new ObjectID()

export const books = [{
        _id: bookOneId,
        name: "BookOne",
        author: "AuthorOne",
        addedOn: new Date().toTimeString(),
        addedBy: 'A lousy cat'
    },
    {
        _id: bookTwoId,
        name: "BookTwo",
        author: "AuthorTwo",
        addedOn: new Date().toTimeString(),
        addedBy: 'A lousy cat'
    }
]

export const populateBookData = (done) => {
    Book.remove({})
        .then(() => {
            return Book.insertMany(books)
        })
        .then(() => done())
}