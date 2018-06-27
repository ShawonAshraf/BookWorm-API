import { ObjectID } from "mongodb"
import Book from "../models/book"
import User from "../models/user"

const bookOneId = new ObjectID()
const bookTwoId = new ObjectID()

const userOneId = new ObjectID()
const userTwoId = new ObjectID()


export const users = [{
        _id: userOneId,
        name: "User1",
        email: "user1@bookworm.com",
        password: "123456"
    },
    {
        _id: userTwoId,
        name: "User2",
        email: "user2@bookworm.com",
        password: "123456"
    }
]

export const books = [{
        _id: bookOneId,
        name: "BookOne",
        author: "AuthorOne",
        addedOn: new Date().toTimeString(),
        addedBy: users[0].name
    },
    {
        _id: bookTwoId,
        name: "BookTwo",
        author: "AuthorTwo",
        addedOn: new Date().toTimeString(),
        addedBy: users[1].name
    }
]

export const populateBookData = (done) => {
    Book.remove({})
        .then(() => {
            return Book.insertMany(books)
        })
        .then(() => done())
}

export const populateUserData = (done) => {
    User.remove({})
        .then(() => {
            return User.insertMany(users)
        })
        .then(() => done())
}