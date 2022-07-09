const mysql = require('mysql2');

// connect to the application to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL Username
        user: 'root',
        // Your mySQL password
        password: 'Bootcampsqlpassword*',
        database: 'employees'
    },
    console.log('Connected to the employees database.')
);

module.exports = db;