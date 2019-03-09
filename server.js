const express = require('express')
const database = require('./database')
const app = express()

const port = 3000

// db 

// routes
app.get("/api/car", function(req, res) {
    resp = {type: "response", model: 500}
    res.status(200).json(resp)
    console.log("SENT RESPONSE")
})

// run server
app.listen(port, () => console.log("LETS GO"))
app.on('listening', function() {

})