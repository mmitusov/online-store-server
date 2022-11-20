const {Sequelize} = require('sequelize')
module.exports = new Sequelize(
    process.env.DB_NAME, //db_name
    process.env.DB_USER, //user_name
    process.env.DB_PASSWORD, { //password
        dialect: 'postgres',             
        host:  process.env.DB_HOST,
        port:  process.env.DB_PORT
    }
);

// //If you dont want to use ".env" file, you can just fill everything by hand. 
// //+You can use classic method of exporting modules
// /*Also, if you use this method - you don't need nether to configure/create ".env" file 
// and thus nor 'require('dotenv').config()' in index.js*/

// const {Sequelize} = require('sequelize')
// const sequelize = new Sequelize(
//     'postgres', //db_name
//     'postgres', //user_name
//     '0000', { //password
//         dialect: 'postgres',             
//         host: 'localhost',
//         port: '5432'
//     }
// );
// module.exports = sequelize;