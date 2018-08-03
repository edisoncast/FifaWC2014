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
function getRound()
function getPlayer()
function getGoals()
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

