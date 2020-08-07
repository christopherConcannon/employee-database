const mysql = require('mysql2');
const pwd = require('../config/keys');
const cTable = require('console.table');
require('dotenv').config()

const connection = mysql.createConnection({
	host     : 'localhost',
	port     : 3306,
	user     : 'root',
	password : process.env.DB_PASS,
	// password : pwd,
	database : 'employee_tracker_db'
});

connection.connect((err) => {
	if (err) throw err;
	console.log('connected as id ' + connection.threadId + '\n');
});

class Query {
	viewDept() {
		return connection.promise().query('SELECT * FROM departments');
	}

	deptHelper(deptName) {
		return connection.promise().query(
			`SELECT id FROM departments
       WHERE dept_name = ?`,
			deptName
		);
	}

	viewRoles() {
		return connection.promise().query(
			`SELECT r.id, title, salary, d.dept_name AS department
       FROM roles r
       JOIN departments d
        ON r.department_id = d.id`
		);
	}

	viewEmployees() {
		return connection.promise().query(
			`SELECT 
        e.id, 
        e.first_name, 
        e.last_name, 
        title, 
        dept_name AS department,
        salary,
        CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employees e
      LEFT JOIN employees m
        ON e.manager_id = m.id
      LEFT JOIN roles r 
        ON e.role_id = r.id
      LEFT JOIN departments d
        ON r.department_id = d.id`
		);
	}

	addDepartment(newDept) {
		return connection.promise().query(`INSERT INTO departments SET ?`, {
			dept_name : newDept
		});
	}

	// ISSUE...need to add department id to db, but user is passing in department name.   need to first query departments table to retrieve id associated with dept_name so i can pass an id to INSERT query that adds role (whose schema requires a department_id, NOT a name string)
	addRole(newRole) {
		const { title, salary, department } = newRole;
		let deptID;
		this.deptHelper(department)
			.then(([ rows, fields ]) => {
				// const deptID = rows[0].id;
				// deptID = rows[0].id;
        // return deptID;
        return rows[0].id;
      })
      .then((rowID) => deptID = rowID)
      .then(console.log)
      // .then(addRoleToDB)
			.catch(console.log);
    // console.log('deptID:', deptID);
    // function addRoleToDB() {
    //   return connection.promise().query(`INSERT INTO roles SET ?`, {
    //     title         : title,
    //     salary        : salary,
    //     department_id : deptID
    //   });
    // }
		return connection.promise().query(`INSERT INTO roles SET ?`, {
			title         : title,
			salary        : salary,
			department_id : deptID
		});
	}

	addEmployee(newEmp) {
		const { firstName, lastName, role, manager } = newEmp;
		return connection.promise().query(`INSERT INTO employees SET ?`);
	}

	updateEmpRole() {
		return connection.promise().query(``);
	}

	quit() {
		connection.end();
	}
}

// // DEV PURPOSES ONLY******************************************************
const testQuery = new Query();
// testQuery.viewDept()
// testQuery.viewRoles()
// testQuery.viewEmployees()
// testQuery.addDepartment('Marketing').then(testQuery.viewDept)
// testQuery.addRole({ title: 'testRole', salary: '6666666', department: 'Legal'})
testQuery
	.addRole({ title: 'testRole', salary: '6666666', department: 'Legal' })
	// .then(testQuery.viewRole)
	// // testQuery.addEmployee()
	// // testQuery.updateEmpRole()

	.then(([ row, field ]) => {
		console.table(row);
	})
	.catch(console.log)
	.then(() => testQuery.quit());

// DEV PURPOSES ONLY******************************************************

module.exports = Query;

// .then( ([rows,fields]) => {
//   console.log(rows);
// })
// .catch(console.log)
