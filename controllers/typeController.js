const {Type} = require('../db_models/db_models') //Импортируем модель типа нашей таблицы
const ApiError = require('../error/apiError')

class TypeController {
    async create(req, res) {
        const {body} = req.body;
        const type = await Type.create({body});
        return res.json(type);
    }
    async getAll(req, res) {
        
    } 
}

module.exports = new TypeController()
//Exporting new object created from class above