//Здесь мы будем проверять роль пользователя (логика схожа с authMiddleware)
//Админ имеет право добавялть и изменять товары в магазине, а пользователь только их просматривать и добавлять в корзину
//Наша функция не будет принимать 'req & res', а только принимать параметром роль, а потом выдавать сам middleware
//Делаем своего рода замыкание (функция в функции)

module.exports = function(role) {
    

    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] //Токен зачастую помещают в 'headers.authorization'. И помещают его в виде 'тип_токена.сам_токен'. Поэтому отделяем их друг от друга и получаем сам_токен по 1-му индексу
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
}





