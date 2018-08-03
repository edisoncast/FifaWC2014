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

function loadDB(){
return sequelize
  .authenticate()
  .then(() => {
    const round = models.round(sequelize,Sequelize);
    const team = models.team(sequelize,Sequelize);
    const game = models.game(sequelize,Sequelize);
    const goal = models.goal(sequelize,Sequelize);
    return sequelize.sync().then(()=>{
        return sequelize;
    });
  })
  .catch(err => {
    console.error('No se puedo conectar: ', err);
  });
  
}

module.exports=loadDB();