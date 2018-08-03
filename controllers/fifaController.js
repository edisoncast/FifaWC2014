const agents = require('../agents');
const dal = require('../dal');

function teams() {
    const requestTeams = agents.fifa.getTeams();
    const requestGamesID = agents.fifa.getGamesID();
    const promises =[];
    return Promise.all([requestGamesID, requestTeams]).then(
        (results) => {
            const gamesID = results[0];
            const teams = results[1];
            //const flagRegion = results[2];
            const worldCupTeams = [];
            const tempteam = [];
            teams.forEach(element => {
                if (gamesID.has(element.country_id)) {
                    tempteam.push({
                        country_id: element.country_id,
                        name: element.name,
                    })
                    const requestFlagRegion = agents.fifa.getFlagRegion2(element.name);
                    promises.push(requestFlagRegion);
                }
            });
            return Promise.all(promises).then((data)=>{
                data.forEach((element2,index)=>{
                    const country_name = Object.keys(element2)[0];
                    worldCupTeams.push({
                        name:tempteam[index].name,
                        country_id:tempteam[index].country_id,
                        region: element2[country_name].region,
                        flag: `https://restcountries.eu/data/${element2[country_name].alpha3Code.toLowerCase()}.svg`,
                    })
                })
            //    dal.connect.then((db)=>{
              //      db.models.team.
              //  })
                return worldCupTeams;
            }).catch(excep => {
                return Promise.reject(excep)})
        }
    ).catch(excep => { 
        return Promise.reject(excep) })
}

function matchdays() {
    const requestRounds = agents.fifa.getRounds();
    const requestGames = agents.fifa.getGames();
    return Promise.all([requestRounds, requestGames,]).then(
        (results) => {
            const rounds = results[0];
            const games = results[1];
            const game = [];
            rounds.forEach(element => {
                games.forEach(element2 =>{
                    if (element.id === element2.id){
                        game.push({
                            round: element.roundname,
                            team1:element2.team1,
                            team2:element2.team2,
                            score1:element2.score1,
                            score2:element2.score2,
                            date:element2.date,
                        })
                    }
                })
            });
            return game;
        }
    ).catch(excep => { return Promise.reject(excep) })
}


function goals(){
    const requestGoals = agents.fifa.getGoals();
    const requestPersons = agents.fifa.getPersons();
    return Promise.all([requestGoals, requestPersons]).then(
        (results) => {
            const goals = results[0];
            const persons = results[1];
            const scorers = [];
            persons.forEach(element => {
                goals.forEach(element2 =>{
                    if (element2.personId===element.id){
                        scorers.push({
                            id:element.id,
                            name:element.name,
                            team:element2.teamId,
                            minute:element2.minute,
                            owngoal:element2.og 
                        })
                    }
                })
            });
            return scorers;
        }
    ).catch(excep => { return Promise.reject(excep) })

}

function groups(){
    
}


module.exports = {
    teams,
    matchdays,
    goals,
}