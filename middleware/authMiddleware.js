//Здесь мы будем декодировать JWT токен при регистрации или логине и проверять его на валидность
module.export = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {

    } catch (err) {
        res.status(401).json({message: "Not authorized"})
    }
}