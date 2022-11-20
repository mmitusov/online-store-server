const {Brand} = require('../db_models/db_models') //Импортируем модель нашей таблицы
// const ApiError = require('../error/apiError') - если вдруг решу отлавливать ошибки

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name}) //Создаем новую графу в DB по парамертам из запроса
        return res.json(brand)
    }
    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)  
    }
}

module.exports = new BrandController()
//Exporting new object created from class above