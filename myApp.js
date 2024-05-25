require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose') // Require Mongoose
mongoose.connect(process.env.MONGO_URI) // Connect MongoDB
const bodyParser = require("body-parser")
const app = express()

// Create a Model
const Schema = mongoose.Schema

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})
const Person = mongoose.model('Person', personSchema)


// Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// Redirection or route
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ "message": "Hello json".toUpperCase() })
  } else {
    res.json({ "message": "Hello json" })
  }
})

// To access the styles.css for index.html
app.use("/", express.static(__dirname + '/public'))
app.use("/public", express.static(__dirname + '/public'))

// To use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }))

// Checks the current time
app.get("/now", (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.send({ time: req.time })
})

// Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
  res.send({ echo: req.params.word })
})

// Get Query Parameter Input from the Client
app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last })
})

// Get Data from POST Requests
app.post("/name", (req, res) => {
  res.json({ name: req.body.first + " " + req.body.last })
})

module.exports = app;