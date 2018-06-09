import request from "supertest"
import expect from "expect"

// app
import app from "../server"

// models
import Book from "../models/book"
// seed
import { books, populateBookData } from "./seed"

// pre hook to populate
beforeEach(populateBookData)

// test
describe("GET /books", () => {
    it("Should fetch all the books", (done) => {
        // expect 2 books
        request(app)
            .get("/books/all")
            .expect(200)
            .expect(res => {
                expect(res.body.books.length).toBe(2)
                done()
            })
            .catch(err => done(err))
    })

    it("Should fetch a book by id", (done) => {
        request(app)
            .get(`/books/byid/${books[1]._id}`)
            .expect(200)
            .expect(res => {
                expect(res.body.book._id).toBe(books[1]._id.toHexString())
                done()
            })
            .catch(err => done(err))
    })

    it("Should fetch a book by name", (done) => {
        request(app)
            .get(`/books/byname/${books[0].name}`)
            .expect(200)
            .expect(res => {
                expect(res.body.name).toBe(books[0].name)
                done()
            })
            .catch(err => done(err))
    })

    it("Should fetch a book by author name", (done) => {
        request(app)
            .get(`/books/byauthor/${books[0].author}`)
            .expect(200)
            .expect(res => {
                expect(res.body.author).toBe(books[0].author)
                done()
            })
            .catch(err => done(e))
    })
})

describe("POST /books", () => {
    it("Should add a book", (done) => {
        let book = new Book({
            name: "BookThree",
            author: "AuthorThree",
            addedOn: new Date(),
            addedBy: "UserThree"
        })

        request(app)
            .post("/books/add")
            .send(book)
            .expect(res => {
                expect(res.body.name).toBe(book.name)
                done()
            })
            .catch(err => done(err))
    })
})