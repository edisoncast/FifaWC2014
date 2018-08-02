const request = require('request-promise-native');
const pathbase = "https://montanaflynn-fifa-world-cup.p.mashape.com/";
const path2 = "https://restcountries-v1.p.mashape.com/all";
const options = {
    json : true,
    method : 'GET',
    headers : {
        "X-Mashape-Key" : "o8pbkyQL4qmshzazRexAK5RqRrnAp11h1THjsnBj1l8ry80jG1",
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
                country_id:element.country_id,
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
}

