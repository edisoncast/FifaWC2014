module.exports = (sequelize,DataTypes)=>{
    const game = sequelize.define('game',{
        id : {
            type:DataTypes.INTEGER,
            primaryKey:true
        },
        round_id : {
            type:DataTypes.INTEGER
        },
        round : {
            type:DataTypes.STRING
        },
        team1 : {
            type:DataTypes.INTEGER
        },
        team2 : {
            type:DataTypes.INTEGER
        },
        score1: {
            type:DataTypes.INTEGER
        },
        score2: {
            type:DataTypes.INTEGER
        },
        date: {
            type:DataTypes.DATE
        },
        group_id: {
            type:DataTypes.INTEGER
        },
        winner: {
            type:DataTypes.INTEGER
        },
        

    });
    return game;
}