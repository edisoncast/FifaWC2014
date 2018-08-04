const Sequelize = require('sequelize');
const models = require('../models');
const env = require('./setup')

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  pool: {
    max: env.max,
    min: env.min,
    acquire: env.acquire,
    idle: env.idle,
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
    game.belongsTo(round);
    goal.belongsTo(team);
    team.hasMany(game,{
      as: 'team1',
      foreignKey:'team1fk', 
    });
    team.hasMany(game,{
      as: 'team2',
      foreignKey:'team2fk', 
    });
    game.belongsTo(round,{
      foreignKey:'id_team'
    });

    return sequelize.sync().then(()=>{
        return sequelize;
    });
  })
  .catch(err => {
    console.error('No se puedo conectar: ', err);
  });
  
}

module.exports={
  loadDB,
}