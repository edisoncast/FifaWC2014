const agents = require('../agents');

function teams() {
    const requestTeams = agents.fifa.getTeams();
    const requestGamesID = agents.fifa.getGamesID();
    const requestFlagRegion = agents.fifa.getFlagRegion();
    return Promise.all([requestGamesID, requestTeams, requestFlagRegion]).then(
        (results) => {
            const gamesID = results[0];
            const teams = results[1];
            const flagRegion = results[2];
            const worldCupTeams = [];
            teams.forEach(element => {
                if (gamesID.has(element.country_id)) {
                    worldCupTeams.push({
                        country_id: element.country_id,
                        name: element.name,
                        region: flagRegion[element.name].region,
                        flag: `https://restcountries.eu/data/${flagRegion[element.name].alpha3Code}.svg`,
                    })
                }
            });
            return worldCupTeams;
        }
    ).catch(excep => { return Promise.reject(excep) })
}

module.exports = {
    teams,
}