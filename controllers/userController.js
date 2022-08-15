const ApiError = require('../error/apiError')

class UserController {
    async registration(req, res) {

    }
    async login(req, res) {
        
    }
    async check(req, res, next) {
        const {id} = req.query //.query означает что мы получаем информацию из строки запроса
        if (!id) {
            return next(ApiError.badRequest('No given ID'))
        }
        res.json({id})
    }    
}

module.exports = new UserController()
//Exporting new object created from class above