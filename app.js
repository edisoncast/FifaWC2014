const express = require('express');
const app = express();
const router = require('./routes');
const bodyparser = require('body-parser');
const jsonparser = bodyparser.json()
const load = require('./controllers')

app.use('/fifa',jsonparser,router.fifarouter);


app.on('ready',function(){
  app.listen(3000, function () {
    console.log('Servidor encendido en puerto 3000');
  });
})

load.fifaController.loadSave().then(()=>{
  let executed=false;
  if(!executed){
    executed=true;
    app.emit('ready')
  }
})

