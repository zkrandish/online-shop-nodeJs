const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-w25','root','Aa13671367!',{
    dialect: 'mysql', host: 'localhost'
    });

module.exports = sequelize;