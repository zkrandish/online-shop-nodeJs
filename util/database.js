const mysql = require ('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database : 'node-w25',
    password: 'Aa13671367!'

});

module.exports = pool.promise();