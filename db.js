const {Sequelize} = require('sequelize')
module.exports = new Sequelize(
    process.env.DB_NAME, //db_name
    process.env.DB_USER, //user_name
    process.env.DB_PASSWORD, { //password
        dialect: 'postgres',             
        host:  process.env.DB_HOST,
        port:  process.env.DB_PORT
    }
);
lize;