const Sequelize = require('sequelize');
const models = require('../models');

const sequelize = new Sequelize('prueba', 'prueba', 'citytaxi', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 3,
    acquire: 30000,
    idle: 10000
  },
});

function loadbd(){
return sequelize
  .authenticate()
  .then(() => {
    const team = models.team(sequelize,Sequelize);
    return sequelize.sync().then(()=>{
        return sequelize;
    });
  })
  .catch(err => {
    console.error('No se puedo conectar: ', err);
  });
  
}

module.exports=loadbd();