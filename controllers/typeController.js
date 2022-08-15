const {Type} = require('../db_models/db_models') //Импортируем модель нашей таблицы
// const ApiError = require('../error/apiError') - если вдруг решу отлавливать ошибки

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name}) //Создаем новую график в DB по парамертам из запроса
        return res.json(type)
    }
    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    } 
}

module.exports = new TypeController()
//Exporting new object created from class above