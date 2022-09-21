//Здесь мы будем декодировать JWT токен при регистрации/логине и проверять его на валидность. Если токен не валидный отправляем ошибку и говорим что юзеру нужно авторизироваться
//Этот middleware создан в целях безопасности, для проверки валидности токена уже готового пользователя.
//Основным пердназначением метода check являеся генерация нового токена и отправки его на клиент
//Так как если клиент будет постоянно пользоватся аккаунтом, то токен у него будет постоянно перезаписыватся
//const token = generateToken(req.user.id, req.user.email, req.user.role)
//P.S. Для проверки токена в Postman, создаем хедер "Authorization: Bearer TOKEN". Bearer - тип токена который мы перед ним указываем. 
const jwt = require('jsonwebtoken') //Для разкодировки токена

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //Токен зачастую помещают в 'headers.authorization'. И помещают его в виде 'тип_токена.сам_токен'. Поэтому отделяем их друг от друга и получаем сам_токен по 1-му индексу
        if (!token) {
            return res.status(401).json({message: `Token is not found. You're not athorized or token expired`})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY) //Далее мы должны разкодировать полученный токен (по образу как на сайте по разкодировке JWT). В итоге мы получим объект с данными
        req.user = decoded //К реквесту (например в поле юзер) добавим данные которые мы вытащили. И во всех функциях этот юзер будет доступен
        next() //С помощью next вызываем следующий в цепочке middleware
    } catch (err) {
        res.status(401).json({message: "Error: Not authorized or invalid token"})
    }
}