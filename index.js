//'dotenv' is a zero-dependency module that loads environment variables from a .env file into process.env.
//Thx to in we can now use '.env'
require('dotenv').config() //
const express = require('express')
const sequelize = require('./db')
const db_models = require('./db_models/db_models')

const app = express();

const start = async() => {
    try {
        await sequelize.authenticate(); //Using it to connect to DB
        await sequelize.sync();
    } catch (err) {
        console.log(err)
    }
}
start()

app.listen(process.env.PORT || 5001, () => console.log(`Server is running on the port ${process.env.PORT}`))