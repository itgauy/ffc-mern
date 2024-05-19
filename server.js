require('dotenv').config();

const express = require('express');
const app = require('./myApp');

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});