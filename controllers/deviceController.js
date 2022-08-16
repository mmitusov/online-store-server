const {Device, DeviceInfo} = require('../db_models/db_models') //Импортируем модель нашей таблицы
const uuid = require('uuid') //Generates random and unique IDs for uploading img to our DB
const path = require('path') //NodeJS build in module for paths creation 
const ApiError = require('../error/apiError') //Так как здесь потенциально может возникнуть ошибка - оборачиваем код в try-catch. Не забываем добавить функцию next третим параметром, и передать в нее вызов функции ApiError

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body //Получаем данные из тела запроса
            const {img} = req.files //У каждого устройства должна имется картинка. Также получаем ее из запроса, однако уже не из поля тела (body), а из поля files
            let fileName = uuid.v4() + '.jpg' //After we got img we need to generate unique name for it, so we can get this img later by its name. v4 function generates unique id
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) //После получения файла используем функцию .mv для перемещения нового файла с заданным именем в папку static. 
            //P.S. '.resolve' - адаптирует указанный путь к операционной системе. После перемещения файла, теперь мы можем использовать его и создать в нашей DB новый Device
            const device = await Device.create({name, price, brandId, typeId, img: fileName}) //Картинкой передаем не сам файл, а его название, что было сгенерировано ранее; Рейтинг не указываем так как по дефолту он = 0

            //Для ототбражения описания товаров на фронте, сперва нам нужно перегнать описание из формата объкта (с сервера) в строку
            if (info) {
                info = JSON.parse(info)
                info.forEach(i => 
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }            
            return res.json(device)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getAll(req, res) { //Besides reuesting needed devices, it would be also useful to set of how much devices we can see at once and on which page we're currently at
        let {brandId, typeId, limit, page} = req.query //If we use 'const' we'll get err: "Assignment to constant variable". So, don't use const where you're plan to changing variables later
        limit = limit || 9 
        page = page || 1
        let offset = page * limit - limit

        //Чтобы посчитать кол-во отображенных товаров на фронте, нам нужно знать общее количество товаров которое к нам вернется по запросу. Для этого мы будем использовать метод .findAndCountAll (для пагинации)
        let device; //If we use 'const' it would result in error, since 'const' always must be equal to something.
        if (!brandId && !typeId) {
            device = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            device = await Device.findAndCountAll({where:{brandId, limit, offset}})
        }
        if (!brandId && typeId) {
            device = await Device.findAndCountAll({where:{typeId, limit, offset}})
        }
        if (brandId && typeId) {
            device = await Device.findAndCountAll({where:{typeId, brandId, limit, offset}})
        }
        return res.json(device)
    }

    //Возвращаем одно устройство
    async getOne(req, res) {
        const {id} = req.params //params берем из userRouter.js
        const device = await Device.findOne(
            {
                where: {id}, 
                include: [{model: DeviceInfo, as: 'info'}] //Импортированный из модели таблицы
            }
        )
        return res.json(device)
    }
} 

module.exports = new DeviceController()
//Exporting new object created from class above