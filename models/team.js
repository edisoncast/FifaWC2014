module.exports = (sequelize,DataTypes)=>{
    const team = sequelize.define('team',{
        country_id : {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false
        },
        name : {
            type:DataTypes.STRING
        },
        region : {
            type:DataTypes.STRING
        },
        flag : {
            type:DataTypes.STRING
        },

    });
    return team;
}