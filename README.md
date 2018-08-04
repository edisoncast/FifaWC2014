# FifaWC2014
Pequeño proyecto para mostrar los resultados del mundial de 2014

* El proyecto sirve como un API, el objetivo es usar angular u otro framework para consumirlo
* El método loadSave se ejecuta al iniciar el servidor, almacena en base de datos, dentro de dal/setup.js se encuentra la información para configurar inicialmente la base de datos.
* loadSave se encarga de realizar peticiones a las 2 API y almacena en base de datos, desde postman se pueden realizar:
  * Obtener los equipos participantes: 
    * https://localhost:3000/getTeams
  * Obtener información sobre cada uno de los partidos:
    * https://localhost:3000/getMatches
  * Obtener información de los anotadores en cada partido:
    * https://localhost:3000/getScorers
* No se cuenta con una vista, actualmente estoy en proceso de aprendizaje de Sequelize y Angular.

