const request = require('request-promise-native');
const pathbase = "https://montanaflynn-fifa-world-cup.p.mashape.com/";
const path2 = "https://restcountries-v1.p.mashape.com/all/";
const path3 = "https://restcountries-v1.p.mashape.com/name";
const options = {
    json : true,
    method : 'GET',
    headers : {
        "X-Mashape-Key" : "ZVovVZcrzDmshVeZJxFpGsohp5jdp1x6j8rjsnqz0Cf8e8Ovqz",
        accepts: "json",
        Accept: "application/json"
    }
 };

/**
 * Obtiene la información del endpoint teams
 * perteneciente al API fifa
 *
 * @returns {Promise} con la información(nombre,id) de los más de 200
 * equipos del endpoint (cuenta con los equipos de eliminatorias)
 */
function getTeams(){
    const result = request(`${pathbase}teams`, options);
     return result.then((result) =>{
        const data = []; 
        result.forEach(element => {
             data.push({
                name:element.title,
                country_id:element.id,
             })
         });
         return data;
        }).catch((err)=>{
            return Promise.reject(err)
        });
}


/**
 * Obtiene la información del endpoint games
 * perteneciente al API fifa
 *
 * @returns {Promise} con el id de los 32
 * equipos clasificados al mundial
 */
function getGamesID(){
    const result = request(`${pathbase}games`, options);
     return result.then((result) =>{
         const data = new Set();
         result.forEach(element =>{
            data.add(element.team1_id);
            data.add(element.team2_id); 
         });
         return data
        }).catch((err)=>{
            return Promise.reject(err)
        });
}


/**
 * Obtiene la información del endpoint getAllcountries
 * perteneciente al API de paises
 *
 * @returns {Promise} con la información(codigo,region) de todos 
 * los paises que contiene el endpoint
 */
function getFlagRegion(){
    const result = request(path2, options);
    return result.then((result) =>{
       const data = {}; 
       result.forEach(element => {
            data[element.name] = {
                alpha3Code:element.alpha3Code,
                region: element.region
            };
        });
        return data;
       }).catch((err)=>{
           return Promise.reject(err)
       });
}

/**
 * Obtiene la información del endpoint getByName
 * perteneciente al API de paises
 * @param {string} countryName nombre del pais específico
 * a consultar
 * @returns {Promise} con la información(codigo,region,subregion)
 * de un pais en específico
 */
function getFlagRegion2(countryName){
    let name = encodeURI(countryName);
    if (name === 'England'){
        name = 'United Kingdom'
    }
    const result = request(`${path3}/${name}`, options);
    return result.then((result) =>{
       const data = {}; 
       result.forEach(element => {
            data[element.name] = {
                alpha3Code:element.alpha3Code,
                region: element.region,
                subregion: element.subregion,
            };
        });
        return data;
       }).catch((err)=>{
           return Promise.reject(err);
       });
}

/**
 * Obtiene la información del endpoint getRounds
 * perteneciente al API fifa
 * @returns {Promise} con la información(codigo,nombre)
 * de cada una de las fechas del mundial
 */
function getRounds(){
    const result = request(`${pathbase}rounds`, options);
     return result.then((result) =>{
        const data = []; 
        result.forEach(element => {
             data.push({
                id:element.id, 
                roundname:element.title,
             })
         });
         return data;
        }).catch((err)=>{
            return Promise.reject(err)
        });
}

/**
 * Obtiene la información del endpoint getGame
 * perteneciente al API fifa
 * @returns {Promise} con la información(codigo,region,subregion)
 * de un pais en específico
 */
function getGames(){
    const result = request(`${pathbase}games`, options);
     return result.then((result) =>{
        const data = []; 
        result.forEach(element => {
             data.push({
                idgame:element.id,
                id:element.round_id,
                group: element.group_id, 
                team1:element.team1_id,
                team2: element.team2_id,
                score1: element.score1,
                score2: element.score2,
                date:element.play_at,
                winner:element.winner,
             })
         });
         return data;
        }).catch((err)=>{
            return Promise.reject(err)
        });
}

/**
 * Obtiene la información del endpoint getGoals
 * perteneciente al API fifa
 * @returns {Promise} con la información de cada gol marcado:
 * id,anotador nombre e id, equipo al cual pertenece el gol y
 * si fue autogol o no
 */
function getGoals(){
    const result = request(`${pathbase}goals`, options);
     return result.then((result) =>{
        const data = []; 
        result.forEach(element => {
             data.push({
                goal_id:element.id,
                personId:element.person_id, 
                gameID:element.game_id,
                teamId:element.team_id,
                minute:element.minute,
                og:element.owngoal,
             })
         });
         return data;
        }).catch((err)=>{
            return Promise.reject(err)
        });
}

/**
 * Obtiene la información del endpoint persons
 * perteneciente al API fifa
 * @returns {Promise} con la información(id, nombre) de
 * cada jugador del mundial
 */
function getPersons(){
    const result = request(`${pathbase}persons`, options);
     return result.then((result) =>{
        const data = []; 
        result.forEach(element => {
             data.push({
                id:element.id,
                name:element.name,
             })
         });
         return data;
        }).catch((err)=>{
            return Promise.reject(err)
        });
}


/*
async function getTeam(){
    try{
        const result = await request({
            uri : "https://montanaflynn-fifa-world-cup.p.mashape.com/teams",
            json : true,
            method : 'GET',
            header : {
                "X-Mashape-Key" : "o8pbkyQL4qmshzazRexAK5RqRrnAp11h1THjsnBj1l8ry80jG1",
                accepts: "json",
                Accept: "application/json"
            }
         });
         return result;
    }
    catch(excep){
        return Promise.reject;
    }
}
*/

module.exports = {
    getTeams,
    getGamesID,
    getFlagRegion,
    getFlagRegion2,
    getRounds,
    getGames,
    getGoals,
    getPersons,
}

