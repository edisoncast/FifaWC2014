const agents = require('../agents');

function teams() {
    const requestTeams = agents.fifa.getTeams();
    const requestGamesID = agents.fifa.getGamesID();
    const requestFlagRegion = agents.fifa.getFlagRegion2();
    return Promise.all([requestGamesID, requestTeams]).then(
        (results) => {
            const gamesID = results[0];
            const teams = results[1];
            //const flagRegion = results[2];
            const worldCupTeams = [];
            teams.forEach(element => {
                if (gamesID.has(element.country_id)) {
                    worldCupTeams.push({
                        country_id: element.country_id,
                        name: element.name,
                        //region: requestFlagRegion[element.name].region,
                        //flag: `https://restcountries.eu/data/${requestFlagRegion[element.name].alpha3Code}.svg`,
                    })
                }
            });
            return worldCupTeams;
        }
    ).catch(excep => { return Promise.reject(excep) })
}

function matchdays() {
    const requestRounds = agents.fifa.getRounds();
    const requestGames = agents.fifa.getGames();
    const teams = teams();
    return Promise.all([requestRounds, requestGames, teams]).then(
        (results) => {
            const rounds = results[0];
            const games = results[1];
            const teams = results[2];
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




module.exports = {
    teams,
    matchdays,
    goals,
}