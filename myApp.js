let express = require('express');
let app = express();

console.log('Hello');

app.get("/", function (req, res) { // Redirection or route
  res.sendFile(__dirname + '/views/index.html');
});

app.use("/", express.static(__dirname + '/public')); // To access the styles.css for index.html
app.use("/public", express.static(__dirname + '/public'));

module.exports = app; 