//Здесь мы будем декодировать JWT токен при регистрации/логине и проверять его на валидность
const jwt = require('jsonwebtoken') //Для разкодировки токена

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //Токен зачастую помещают в 'headers.authorization'. И помещают его в виде 'тип_токена.сам_токен'. Поэтому отделяем их друг от друга и получаем сам токен по 1-му индексу
        if (!token) {
            return res.status(401).json({message: `Token is not found. You're not athorized`})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY) //Далее мы должны разкодировать полученный токен и при помощи .verify проверить его на валидность
        req.user = decoded //К реквесту (например в поле юзер) добавим данные которые мы вытащили. И во всех функциях этот юзер будет доступен
        next() //С помощью next вызываем следующий в цепочке middleware
    } catch (err) {
        res.status(401).json({message: "Not authorized"})
    }
}