const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
	host     : 'localhost',
	port     : 3306,
	user     : 'root',
	password : process.env.DB_PASS,
	database : 'employee_tracker_db'
});

connection.connect((err) => {
	if (err) throw err;
	// console.log('connected as id ' + connection.threadId + '\n');
});

module.exports = connection;