const express = require('express');
const app = express();
const router = require('./routes');
const bodyparser = require('body-parser');
const jsonparser = bodyparser.json()

app.use('/fifa',jsonparser,router.fifarouter);

/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});
*/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});