const {Device} = require('../db_models/db_models') //Импортируем модель типа нашей таблицы
const uuid = require('uuid') //Generates random and unique IDs for uploading img to our DB
const path = require('path') //NodeJS build in module to dynamicly create paths to whatever file we need
const ApiError = require('../error/apiError')

class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg' //v4 function generates unique id
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            const device = await Device.create({name, price, brandId, typeId, img: fileName})
            return res.json(device)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }
    async getAll(req, res) {
        
    }
    async getOne(req, res) {
        
    }
}

module.exports = new DeviceController()
//Exporting new object created from class above