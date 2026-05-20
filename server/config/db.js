const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'appliassist123',
    database: 'appliassist_db'
});

connection.connect((err) => {
    if (err) {
        console.log('Database connection failed');
        console.log(err);
    } else {
        console.log('MySQL Connected');
    }
});

module.exports = connection;