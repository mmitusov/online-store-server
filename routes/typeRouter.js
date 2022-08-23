var express = require('express');
var router = express.Router();
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware') //Для проверки роли пользователя. Обычный 'USER' не имеет права добавлять новые типы в БД 

router.post('/', checkRole('ADMIN'), typeController.create) //'checkRole' middleware мы не просто передаем а вызываем. Ведь нам необходимо чтобы после вызова функции туда попал наш middleware (because of the function closure)
router.get('/', typeController.getAll)

module.exports = router; 