require('dotenv').config()
let express = require('express')
let app = express()

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

// Checks the current time
app.get("/now", (req, res, next) => {
  req.time = new Date().toString()
  next()
},
  (req, res) => {
    res.send({ time: req.time })
  })

module.exports = app;