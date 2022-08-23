const {User, Basket} = require('../db_models/db_models') //Импортируем модель нашей таблицы 
const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt') //For hashing data
const jwt = require('jsonwebtoken') //For genereting JWT tokens

const generateToken = (id, email, role) => { //To create JWT token, below we pass all nessessary information to this function
    return jwt.sign( //It was created seperatly but wasn't build in inside of 'regestration', since it will be used in 'sign in' as well
            {id, email, role}, //First argument - payload wiith information
            process.env.SECRET_KEY, //Second argument - secret key (we've hardcoded it to our enviroment and gettin it from there)
            {expiresIn: '24h'} //Third argument - key expiration date for security purposes
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body //By default in db_models 'role': 'USER'
        if (!email || !password) { //If data was not given - throw err. For now we'll just skip validation managment part to save some time
            return next(ApiError.badRequest('Please enter your email and password'))
        }
        const candidate = await User.findOne({where: {email}}) //Chacking if user with such email already exists 
        if (candidate) {
            return next(ApiError.badRequest('Such email already exist'))
        }
        const hashPassword = await bcrypt.hash(password, 7) //If no err conditions are met then we can create new user. Hashing our password befor sending it
        const createUser = await User.create({email, password: hashPassword, role})
        const basket = await Basket.create({userId: createUser.id}) //After we added a new user, we have to make basket for him 
        const token = generateToken(createUser.id, createUser.email, createUser.role) //Creating JWT token
        return res.json(token)
    }
    
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}}) //Chacking if user with such email in our DB 
        if (!user) {
            return next(ApiError.badRequest('Incorrect login, there no such user'))
        }
        const hashPassword = await bcrypt.compareSync(password, user.password)
        if (!hashPassword) {
            return next(ApiError.badRequest('Incorrect login, there no such user'))
        }
        const token = generateToken(user.id, user.email, user.role) //P.S. Мы можем разкодировать полученный токен при помощи 'const decoded = jwt.verify(token, process.env.SECRET_KEY)'
        return res.json(token)
    }
     
    async check(req, res, next) {
        //Основным пердназначением метода check являеся генерация нового токена и отправки его на клиент
        //Так как если клиент будет постоянно пользоватся аккаунтом, то токен у него будет постоянно перезаписыватся
        const token = generateToken(req.user.id, req.user.email, req.user.role)
        return res.json({token})
        
        /*TESTING const {id} = req.query //.query означает что мы получаем информацию из строки запроса
        if (!id) {
            return next(ApiError.badRequest('No given ID'))
        }
        res.json({id})*/
    }    
}

module.exports = new UserController()
//Exporting new object created from class above