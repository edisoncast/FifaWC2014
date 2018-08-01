const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'prueba',
  password: 'citytaxi',
  database: 'prueba'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Conexión completa');
});