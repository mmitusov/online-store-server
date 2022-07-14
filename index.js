const express = require('express')
const {Sequelize} = require('sequelize') //Or we can use knex instead, 5432
const sequelize = new Sequelize(
    'store_db', //db_name
    'postgres', //user_name
    '0000', { //password
        dialect: 'postgres',             
        host: 'localhost'
    }
);
module.exports = sequelize;

const app = express();

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (err) {
        console.log(err)
    }
}
start()

app.listen(process.env.PORT || 3000, () => console.log(`Server is running on the port ${process.env.PORT}`))