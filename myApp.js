require('dotenv').config();
let express = require('express');
let app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

console.log('Hello');

app.get("/", function (req, res) { // Redirection or route
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ "message": "Hello json".toUpperCase() });
  } else {
    res.json({ "message": "Hello json" });
  }
});

app.use("/", express.static(__dirname + '/public')); // To access the styles.css for index.html
app.use("/public", express.static(__dirname + '/public'));

module.exports = app; 