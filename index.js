require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const db_models = require('./db_models/db_models')
const routes = require('./routes/index')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path') 

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.static(path.resolve(__dirname, 'static'))); 
app.use(fileUpload({})); 
app.use('/api', routes); 
app.use(errorHandler); 

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (err) {
        console.log(err)
    }
}
start()

app.listen(process.env.PORT || 3002, () => console.log(`Server is running on the port ${process.env.PORT}`))