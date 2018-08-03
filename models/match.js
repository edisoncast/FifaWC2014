module.exports = (sequelize,DataTypes)=>{
    const round = sequelize.define('round',{
        id : {
            type:DataTypes.INTEGER,
            primaryKey:true
        },
        name : {
            type:DataTypes.STRING
        },
    });
    return round;
}