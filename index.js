const express = require('express')
const {Sequelize} = require('sequelize') //Or we can use knex instead
const app = express()

app.listen(process.env.PORT || 3000, () => console.log(`Server is running on the port ${process.env.PORT}`))