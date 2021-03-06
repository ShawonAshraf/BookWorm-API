import request from "supertest"
import expect from "expect"

// app
import app from "../server"

// model
import Book from "../models/book"
// seed
import { books, populateBookData, users, populateUserData } from "./seed"

// pre hook to populate
beforeEach(populateBookData)
beforeEach(populateUserData)

// test
describe("GET /books", () => {
    it("Should fetch all the books", (done) => {
        // expect 2 books
        request(app)
            .get("/books/all")
            .set("x-auth", users[0].tokens[0].token)
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
            .set("x-auth", users[0].tokens[0].token)
            .expect(200)
            .expect(res => {
                expect(res.body.book._id).toBe(books[1]._id.toHexString())
                done()
            })
            .catch(err => done(err))
    })

    it("Should reject an invalid id", (done) => {
        let id = 12345

        request(app)
            .get(`/books/byid/${id}`)
            .set("x-auth", users[0].tokens[0].token)
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe("Invalid ID")
                done()
            })
            .catch(err => done(err))
    })

    it("Should fetch a book by name", (done) => {
        request(app)
            .get(`/books/byname/${books[0].name}`)
            .set("x-auth", users[0].tokens[0].token)
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
            .set("x-auth", users[0].tokens[0].token)
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
            .set("x-auth", users[0].tokens[0].token)
            .send(book)
            .expect(200)
            .expect(res => {
                expect(res.body.name).toBe(book.name)
                done()
            })
            .catch(err => done(err))
    })
})

describe("DELETE /books", () => {
    it("Should delete a book", (done) => {
        let id = books[0]._id

        request(app)
            .delete(`/books/delete/${id}`)
            .set("x-auth", users[0].tokens[0].token)
            .expect(200)
            .expect(res => {
                expect(res.body._id).toBe(id.toHexString())
                done()
            })
            .catch(err => done(err))
    })

    it("Should reject an invalid id", (done) => {
        let id = 12345

        request(app)
            .delete(`/books/delete/${id}`)
            .set("x-auth", users[0].tokens[0].token)
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe("Invalid ID")
                done()
            })
            .catch(err => done(err))
    })
})

describe("PUT /books", () => {
    it("Should update book info", (done) => {
        let newInfo = {
            name: "GG",
            author: "GG",
            addedBy: "GG"
        }

        let id = books[1]._id

        request(app)
            .put(`/books/update/${id}`)
            .set("x-auth", users[0].tokens[0].token)
            .send(newInfo)
            .expect(200)
            .expect(res => {
                expect(res.body.name).toBe(newInfo.name)
                done()
            })
            .catch(err => done(err))
    })
})