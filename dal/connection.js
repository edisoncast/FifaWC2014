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

/**
 *Función para conectarse a la bd
 *
 * @returns {Promise} que sincroniza la bd con los modelos
 * y genera una conexión
 */
function loadDB(){
return sequelize
  .authenticate()
  .then(() => {
    const round = models.round(sequelize,Sequelize);
    const team = models.team(sequelize,Sequelize);
    const game = models.game(sequelize,Sequelize);
    const goal = models.goal(sequelize,Sequelize);
   /* team.hasMany(game,{
      foreignKey:'team1',
      foreignKey:'team2' 
    });
    */
    return sequelize.sync().then(()=>{
        return sequelize;
    });
  })
  .catch(err => {
    console.error('No se puedo conectar: ', err);
  });
  
}

module.exports=loadDB();