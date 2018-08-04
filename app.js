const express = require('express');
const app = express();
const router = require('./routes');
const bodyparser = require('body-parser');
const jsonparser = bodyparser.json()
const load = require('./controllers')

app.use('/fifa',jsonparser,router.fifarouter);


load.fifaController.loadSave().then(()=>{
    app.emit('ready')
})

app.on('ready',function(){
  app.listen(3000, function () {
    console.log('Servidor encendido en puerto 3000');
  });
})