import express from "express"
// for parsing json body requests
import bodyParser from "body-parser"

// define port number
let port = process.env.PORT | 3000

let app = new express()


// register middleware
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send({
        message: "Yeah got your message, now the server is running"
    })
})

// start the server
app.listen(port, () => {
    console.log("Server running at ", port)
})