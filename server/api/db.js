const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'factorial'
});

db.connect(error => {
    if (error) throw error;
    console.log('Database connected successfully');
});

module.exports = db;
