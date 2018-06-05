import express from "express"
// for parsing json body requests
import bodyParser from "body-parser"

// define port number
let port = process.env.PORT | 3000

let app = new express()

// register middleware
app.use(bodyParser.json())


// start the server
app.listen(port, () => {
    console.log("Server running at ", port)
})