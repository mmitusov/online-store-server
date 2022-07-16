require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const db_models = require('./db_models/db_models')
const cors = require('cors')

const app = express();
app.use(cors())
//app.use(express.json()); - Latest version of exressJS now comes with Body-Parser, so we don't need this!

app.get('/', (req, res) => {
    res.status(200).json({message: 'Working'})
})

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