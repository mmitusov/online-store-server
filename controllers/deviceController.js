const {Device} = require('../db_models/db_models') //Импортируем модель нашей таблицы
const uuid = require('uuid') //Generates random and unique IDs for uploading img to our DB
const path = require('path') //NodeJS build in module for paths creation 
const ApiError = require('../error/apiError') //Так как здесь потенциально может возникнуть ошибка - оборачиваем код в try-catch. Не забываем добавить функцию next третим параметром, и передать в нее вызов функции ApiError

class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body //Получаем данные из тела запроса
            const {img} = req.files //У каждого устройства должна имется картинка. Также получаем ее из запроса, однако уже не из поля тела (body), а из поля files
            let fileName = uuid.v4() + '.jpg' //After we get img we need to generate unique name for it, so we can get this img later by its name. v4 function generates unique id
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) //После получения файла используем функцию .mv для перемещения нового файла с заданным именем в папку static. 
            //P.S. '.resolve' - адаптирует указанный путь к операционной системе. После перемещения файла, теперь мы можем создать в нашей DB новый Device
    
            const device = await Device.create({name, price, brandId, typeId, img: fileName}) //Картинкой передаем не сам файл, а его название; Рейтинг не указываем так как по дефолту он = 0
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