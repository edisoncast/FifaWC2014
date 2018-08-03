const express = require('express');
const app = express();
const router = require('./routes');
const bodyparser = require('body-parser');
const jsonparser = bodyparser.json()

app.use('/fifa',jsonparser,router.fifarouter);

app.listen(3000, function () {
  console.log('Servidor encendido en puerto 3000');
});