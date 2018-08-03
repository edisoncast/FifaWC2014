module.exports = (sequelize,DataTypes)=>{
    const goal= sequelize.define('goal',{
        id_goal : {
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        id_scorer: {
            type:DataTypes.INTEGER
        },
        name_scorer: {
            type:DataTypes.STRING
        },
        id_team: {
            type:DataTypes.INTEGER
        },
        minute: {
            type:DataTypes.INTEGER
        },
        owngoal : {
            type:DataTypes.CHAR
        },

    });
    return goal;
}