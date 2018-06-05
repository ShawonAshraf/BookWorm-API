import express from "express"
// for parsing json body requests
import bodyParser from "body-parser"

// import routers
import bookRouter from "./routes/book-routes"

// config
import "./config/config"

// define port number
let port = process.env.PORT || 3000
let app = new express()

// register middleware
app.use(bodyParser.json())

// routes
app.use("/books", bookRouter)


// start the server
app.listen(port, () => {
    console.log("Server running at ", port)
})

// export for testing
export default app