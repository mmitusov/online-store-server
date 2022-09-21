require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const db_models = require('./db_models/db_models')
const routes = require('./routes/index')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path') //We need it for 'express.static' below

const app = express();
//Регестрируем установленные модули при помощи midleware, чтобы эти модули работали в рамках нашего приложения
app.use(cors());
app.use(express.json()); //Без этого мы не может запарсить инфу с тела запроса: const {name} = req.body!!! Експересс по умолчанию не может преобразовать json формат который мы отправляем в req
app.use(express.static(path.resolve(__dirname, 'static'))); //Теперь мы можем обращатся по названию ко всем файлам которые лежат в папку static и получать их
app.use(fileUpload({})); //Simple express middleware. Needed for uploading files (e.g. imgages). Used in deviceController.js
app.use('/api', routes); //app.use(url по которому обрабатывается роутер, сам роутер)
app.use(errorHandler); //Middleware работающий с ошибками должен обязательно идти в самом конце, так как он замыкающий

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