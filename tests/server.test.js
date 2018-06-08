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
})