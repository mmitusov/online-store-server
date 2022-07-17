require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const db_models = require('./db_models/db_models')
const routes = require('./routes/index')


const app = express();
app.use(cors())
app.use('/api', routes) //Global midleware??? We've created midleware "routes" and to be able to use it we call app.use('/api', routes)

const start = async() => {
    try {
        await sequelize.authenticate(); //Using it to connect to DB
        await sequelize.sync();
    } catch (err) {
        console.log(err)
    }
}
start()

app.listen(process.env.PORT || 3002, () => console.log(`Server is running on the port ${process.env.PORT}`))