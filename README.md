# Backend notes & tips
**Package description:**
express-fileupload" - Simple express middleware for uploading files 

Since DB is going to be complex, before setting up backend APIs, first I need to do is design and implenment DB structure, as well as conect it to our backend. And than build servrside based on its logic. In that case I'll have better understanding of how better to implement APIs later on. Good tool for building visual scemas of future DB is - https://app.diagrams.net.

To avoid manual implementation of SQL database, I'm going to use Sequelize to connect backend to the DB, create  table bluepint\their relations on the server side using JS and then parse their logic to the DB to create real one's (tables). All code for that matter I mooved to the db_model folder.

Also, while setting up connection to our DB I mooved connection points to the separate file: db.js. Addinionaly file '.env' was implemented. It allows us to set envarimentle variables to our liking in a sepparate file, so we can use them later on in different parts of our code. However, this is not an obligatory part and we could have built our app without '.env'. To be able to use '.env' file we need to install 'dotenv' dependancy and import it into index.js file (require('dotenv').config()). 'dotenv' is a zero-dependency module that loads environment variables from a '.env' file into process.env.

All needed 'kyes' for connection to our DB I store in db.js. I mooved it here from index.js to make code look cleaner.

I was told that Latest version of exressJS now comes with Body-Parser. However without app.use(express.json()) I was't able to parse any data. Без этого мы не может запарсить инфу с тела запроса: const {name} = req.body.

После создания моделей базы данных, я приступил к написанию функциональных api маршрутов. При чем для того чтобы все держать в чистоте и для разделения логики, я вывел api маршруты из корневого index.js к папке routes. А от нее каждый отдельный маршурт, где и хранится функциональная логика, уже к папке controllers. Именно в этой папке и прописана логика взаимодействия клиента с DB. При чем прописывая логику маршрутов, также паралельно нужно не забывать тестировать их работоспособность, пока код еще не стал слишком комплексным. Заметки по тому как работает каждый контроллер, я добавил в файл самого контроллера.

Далее, для удобства, создадим файл ApiError и middleware для него, чтобы при необходимости нам легче было бы обрабатывать ошибки в любом из других файлов.

После завершения вышеописаного кода, теперь у нас есть рабочая база данных и api маршруты, по ендпоинтах которых мы можем добавлять/получать бренды девыйсы и их типы из нашей БД.

Далее прописываем логику аутентификации в userController. Тут мы будем прописывать логику создания JWT токена для нашего юзера (некий ключ который подтверджает личеость юзера) и логику регистрации/логина. При регестрации и логине создаем новый временный JWT токен. Если срок годности токена истек, нам нужно будет по новой залогиниться. Также JWT токен полезен при перезагрузки страницы пользователем, ведь аосле перезагрузки нам не нужно повторно вводить логин/пароль, а браузер помнит, что это мы как раз таки благодаря JWT токену.

Валидность токена мы проверяем при помощи check() в userController. Но перед тем как проверить токен на валидность нам сперва нужно его декодировать. А саму дектодировку вынести в отдельный елемент (для преиспользования ее в разных частях кода). Для этого, в userRouter, перед тем как запустить функцию проверки "userController.check" по адресу '/auth', мы предварительно используем созданный authMiddleware, чтобы декодировать токен. А уже декодированый результат передаем дальше в "userController.check" для проверки. Если же токен был не указал или истек: выводим предупреждающее сообщение. Также, при работе над аунтефикацией, работоспособность созданого JWT токена можно проверить на [этом ресурсе](https://jwt.io).

Далее также мы должны написать логику которая будет отделять изера от администратора, который будет имень возможность добалять новые товары и т.д. Для этого дополнительно создадим checkRoleMiddleware. Для проверки его работы, добавим его пока только в логическую цепочку typeRouter при попытке добавить новый тип товара (post запрос). Но потом его нужно будет еще добавить в девайсы и бренды. Если роль === ADMIN, можем переходить к логике по добавлению типа товара.

В итоге был созданн полноценный REST API. Также, наш сервер может раздавать статику, мы можем авторизовываться, и добавлять различные товары в нашу БД, хотя можно было бы добавить еще и удаление товаров.

P.S. Статические файлы (фото, видео и т.д.) нужно уметь не только помещать на сервер, но и забирать их оттуда при помощи get запроса. И именно express.static() дает на возможность вытаскивать стаатику из сервера и передавать ее юзеру. Именно для этого мы и используем  app.use(express.static(path.resolve(__dirname, 'static'))), в index.js.

P.S.S В deviceController.js, был баг который ламал мне фронтенд, потому-что не мог найти и вернуть мне typeId и brandId. Все из-за маленькой опечатки! Вместо {where:{typeId, brandId, limit, offset}}, нужно было написать {where:{typeId, brandId}, limit, offset}. Иначе поиск не работал.
if (brandId && typeId) {
            device = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})  

### Choosing Node.js ORM tool for Postgres
ODM / ORM - это некоторая оболочка над нашей БД, которая позволяет не писать запросы в БД напрямую, а пользоваться более удобным синтаксисом для взаимодействия с БД, создавая логику и структуры нашей БД прямиком из Node.JS.
MySQL is an example of a relational database - you would use an ORM to translate between your objects in code and the relational representation of the data.
MongoDB is an example of a document database - you would use an ODM to translate between your objects in code and the document representation of the data (if needed).

I was choosing between Sequelize and Knex. But since Sequelize is more capble one, it became my choice.
**Modules reminder:** if you want to use new import/export syntax for modules don't forget to set `"type": "module"` in the package.json or to use `.mjx` extention.


# Database notes & tips
### Choosing PostgreSQL GUI
Не забываем, что любые запросы к базе данных являютяся асинхронными

TESTING const {id} = req.query //.query означает что мы получаем информацию из строки запроса. P.S. req.body - из тела запроса

For a PostgreSQL GUI I was choosing between 'pgAdmin' or 'PSequel' client. 'pgAdmin' is great for its feature-richness. However, I found its UI clumsy and complicated. So I've desided to use PSequel instesd. 
P.S. For some reason PSequel do not work with latest version of PostgreSQL. So, I'm going to use pgAdmin4 instead.

Also worth mentioning that unlike in pgAdmin3 - in pgAdmin4 you have to manually connect to a running postgres server, since there is no pre-built server skeleton. So, when you enter a DB server for the first time there's gonna be no DB under "Servers" root folder (it's going to be completely empty). Solution on StackOverflow: [Databases in psql Don't Show up in PgAdmin4](https://stackoverflow.com/questions/61576670/databases-in-psql-dont-show-up-in-pgadmin4). 

Немного теории о слоях абстракции (в другой литературе может называться по-другому). Смыст теории заключается в том, чтобы разделять логические куски нашего приложения в отдельные модули. Благодяря этому, мы будем из иметь возможность какой-либо из этих модулей переписать/модифицировать без необходимости при этом затрагивать или модифицировать другие модули. Хочется упоминуть следующие слои (эсть и больше):
    1. DAL (data access layer) - В нашем случае за этот слой можно принять Sequelize, поскольку все операции к базе данных мы делаем с помощью него. Если бы мы сами описывали SQL запросы, было бы разумно выделить эту логику, по обращению к базе данных, в какой-нибудь отдельный слой.
    2. Controller. В Controller идёт работа именно клиент-серверной состовляющей (req/res). Это, напроимер, работа с заголовками (headers), параметрами строке запроса (params) или телом запроса (body). После чего из контроллера мы возвращаем ответ на клиент и указываем статус код.
    3. Service (бизнесс-логика). В сервисе уже непосредственно прописано какая-то логика (никак не связана с req/res). Например, получить данные из базы данных и как-то с ними поработать или что -то высчитакть и т.д. И после всех операций - вернуть (return) результат. А куда мы это возвращаем - уже абсолютно не важно. То есть, если мы, например, решим поменять наш framework с экспресс на что-то другое - мы скорей всего будем переписывать маршруты/контролерры и т.д., но бизнесс-логику при этом нам вообще трогать не нужно. Какой она была такой и остается. 