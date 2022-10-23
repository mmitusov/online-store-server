const {User, Basket} = require('../db_models/db_models') / 
const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

const generateToken = (id, email, role) => { 
    return jwt.sign( 
            {id, email, role}, 
            process.env.SECRET_KEY, 
            {expiresIn: '24h'} 
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body 
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
        const token = generateToken(createUser.id, createUser.email, createUser.role) 
        return res.json(token)
    }
    
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}}) 
        if (!user) {
            return next(ApiError.badRequest('Incorrect login, there no such user'))
        }
        const hashPassword = await bcrypt.compareSync(password, user.password)
        if (!hashPassword) {
            return next(ApiError.badRequest('Incorrect password'))
        }
        const token = generateToken(user.id, user.email, user.role) 
        return res.json(token) 
    }
     
    async check(req, res, next) {        
        //Основным пердназначением метода check являеся генерация нового токена и отправки его на клиент,
        //так как если клиент будет постоянно пользоватся аккаунтом, то токен у него будет постоянно перезаписыватся
        //Ведь если юзер не заходил на наш сайт дольше чем 24 часа (это условие указывали выше) - токен будет анулирован (его нельзя будет считать) и мы попросим юезера вновь залогиниться (Token is not found. You're not athorized)
        //Но если он заходит чаще этого промежутка времени, мы будем постоянно автоматически обновлять его токен, чтобы он не истек
        //Ведь если юзер часто пользуется ресурсом, зачем ему каждый разслогиниться
        //Также JWT токен полезен при перезагрузки страницы пользователем, ведь аосле перезагрузки нам не нужно повторно вводить логин/пароль, а браузер помнит, что это мы как раз таки благодаря JWT токену
        const token = generateToken(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }    
}

module.exports = new UserController()
//Exporting new object created from class above