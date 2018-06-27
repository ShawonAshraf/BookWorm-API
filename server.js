import express from "express"
// for parsing json body requests
import bodyParser from "body-parser"

// import routers
import bookRouter from "./routes/book-routes"
import userRouter from "./routes/user-routes"

// config
import "./config/config"
// db init
import db from "./db/db"

// define port number
let port = process.env.PORT || 3000
let app = new express()

// register middleware
app.use(bodyParser.json())

// routes
app.use("/books", bookRouter)
app.use("/user")


// start the server
app.listen(port, () => {
    console.log("Server running at ", port)
})

// export for testing
export default app