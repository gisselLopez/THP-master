const sequelize = require('sequelize');
const pass = process.env.pass;
const db = new sequelize(
    'hotel', 
    'root',
    pass, 
    {
        host: '127.0.0.1', 
        dialect: 'mysql', 
        port: '3306', 
    }
);

module.exports=db;