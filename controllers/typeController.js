const {Type} = require('../db_models/db_models') //Импортируем модель типа нашей таблицы
const ApiError = require('../error/apiError')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    } 
}

module.exports = new TypeController()
//Exporting new object created from class above