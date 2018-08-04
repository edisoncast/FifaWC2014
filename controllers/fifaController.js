const agents = require('../agents');
const dal = require('../dal');

/**
 *Función para realizar el setup del API
 *
 * @returns {Promise} que almacena la información obtenida de 
 * la API que contienen 4 arreglos 
 */
function loadSave(){
    const requestRounds = agents.fifa.getRounds();
    const requestTeams = teams();
    const requestMatchdays = matchdays();
    const requestGoals = goals ();
    return Promise.all([requestRounds,requestTeams, 
        requestMatchdays,requestGoals]).then(
            (data)=>{
                const rounds = data[0];
                const teams = data[1];
                const matches = data[2];
                const goals = data[3];
                dal.connect.loadDB().then((db)=>{ 
                    rounds.forEach((element)=>{
                        db.models.round.create({
                            id: element.id,
                            name:element.roundname,
                        })
                    })
                    teams.forEach(element2 =>{
                        db.models.team.create({
                            country_id:element2.country_id,
                            name:element2.name,
                            region:element2.region,
                            //subregion:element2.subregion,
                            flag:element2.flag,
                        })
                    })
                    
                    matches.forEach(element3 =>{
                        db.models.game.create({
                            id:element3.idgame,
                            //round_id:element3.id,
                            group_id:element3.group,
                            round_name:element3.round,
                            team1fk:element3.team1,
                            team2fk:element3.team2,
                            score1:element3.score1,
                            score2:element3.score2,
                            date:element3.date,
                            winner:element3.winner,
                        })
                    })
                    
                   goals.forEach(element4=>{
                       db.models.goal.create({
                           id_goal:element4.id,
                           //player_id:element4.player_id,
                           name_scorer:element4.name,
                           id_team:element4.team,
                           minute:element4.minute,
                           owngoal:element4.owngoal,
                       })
                   })
                }).catch(excep=>{return Promise.reject(excep)})
            }
    )
}

/**
 *Toma los datos necesarios por equipo, cruzando
 *información de ambas API
 *
 * @returns {Promise} un arreglo que contiene 32 objetos
 * con las siguientes propiedades para cada selección:
 * id del pais, nombre, región, subregión y bandera
 */
function teams() {
    const requestTeams = agents.fifa.getTeams();
    const requestGamesID = agents.fifa.getGamesID();
    const promises =[];
    return Promise.all([requestGamesID, requestTeams]).then(
        (results) => {
            const gamesID = results[0];
            const teams = results[1];
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
                        subregion: element2[country_name].subregion,
                        flag: `https://restcountries.eu/data/${element2[country_name].alpha3Code.toLowerCase()}.svg`,
                    })
                })
                return worldCupTeams;
            }).catch(excep => {
                return Promise.reject(excep)})
        }
    ).catch(excep => { 
        return Promise.reject(excep) })
}

/**
 *Toma los datos necesarios por partido, usando
 *solo los endpoints de la API del mundial
 *
 * @returns {Promise} un arreglo que contiene 64 objetos
 * con las siguientes propiedades para cada partido:
 * id del partido, id ronda, grupo(si tiene),
 * id ambos equipos, goles ambos equipos, fecha y ganador
 */
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
                            idgame: element2.idgame,
                            id: element.id,
                            group: element2.group,
                            round: element.roundname,
                            team1:element2.team1,
                            team2:element2.team2,
                            score1:element2.score1,
                            score2:element2.score2,
                            date:element2.date,
                            winner: element2.winner,
                        })
                    }
                })
            });
            return game;
        }
    ).catch(excep => { return Promise.reject(excep) })
}


/**
 *Toma los datos necesarios por equipo,
 * con información de los endpoint goals y persons
 *
 * @returns {Promise} un arreglo que contiene 172 objetos
 * con las siguientes propiedades para cada gol marcado:
 * id del gol,id jugador, id equipo al que pertenece 
 * el gol,minuto del gol y si fue o no autogol
 */
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
                            id:element2.goal_id,
                            player_id:element2.personId,
                            game_id:element2.gameID,
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
    loadSave,

}
