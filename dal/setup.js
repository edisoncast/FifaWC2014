const environment = {
  database: 'prueba',
  username: 'prueba',
  password: 'citytaxi',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 3,
	  acquire: 30000,
	  idle: 10000
  }
};
 
module.exports = environment;