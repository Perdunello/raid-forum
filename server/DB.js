const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'raid-forum',
    password: 'raidMySql1'
})


module.exports = connection