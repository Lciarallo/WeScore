const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('miseria','root','0970',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    query:{raw:true}
})

module.exports = sequelize