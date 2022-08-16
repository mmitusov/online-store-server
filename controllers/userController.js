const {User, Basket} = require('../db_models/db_models') //Импортируем модель нашей таблицы
const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt') //For hashing data
const jwt = require('jsonwebtoken') //For genereting JWT tokens

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body //Деление на роли (админ/пользователь) пока не внедряем, но для наглядности добавим при деструктуризации
        if (!email || !password) {
            return next(ApiError.badRequest('Please enter your email and password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Such email already exist'))
        }
        const hashPassword = await bcrypt.hash(password, 7)
        const createUser = await User.create({email, password: hashPassword, role})
        const basket = await Basket.create({userId: createUser.id})
        const token = jwt.sign(
            {id: createUser.id, email, role}, 
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
        return res.json(token)
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