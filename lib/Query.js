const connection = require('../utils/connection');

class Query {
	// HELPER METHODS

	// used in promptAddRole().  queries db to return array of department names
	deptsArray() {
		return connection
			.promise()
			.query(`SELECT dept_name FROM departments`)
			.then(([ rows ]) => {
				rows.map((row) => row.dept_name);
				rows = rows.map((row) => row.dept_name);
				return rows;
			});
	}

	// used in promptAddEmployee().  queries db to return array of roles
	rolesArray() {
		return connection.promise().query(`SELECT title FROM roles`).then(([ rows ]) => {
			rows.map((row) => row.title);
			rows = rows.map((row) => row.title);
			return rows;
		});
	}

	// used in promptAddEmployee().  queries db to return array of employees (each is also a possible manager)
	employeesArray() {
		return connection
			.promise()
			.query(`SELECT CONCAT(first_name, ' ', last_name) AS fullName FROM employees`)
			.then(([ rows ]) => {
				rows.map((row) => row.fullName);
				rows = rows.map((row) => row.fullName);
				return rows;
			});
	}

	// MAIN METHODS
	viewDept() {
		return connection.promise().query('SELECT * FROM departments');
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

	addRole({ title, salary, department }) {
		return connection.promise().query(`INSERT INTO roles 
       SET 
        title = ?, 
        salary = ?,
        department_id = (SELECT id FROM departments
                         WHERE dept_name = ?)`, [ title, salary, department ]);
	}

	addEmployee({ firstName, lastName, title, manager }) {
		const managerNameArr = manager.split(' ');
		const managerFirstName = managerNameArr[0];
		const managerLastName = managerNameArr[1];

		return connection.promise().query(`INSERT INTO employees 
         SET  
          first_name = ?,
          last_name = ?,
          role_id = (SELECT id FROM roles 
                     WHERE title = ?),
          manager_id = (SELECT id FROM employees AS x
                        WHERE first_name = ? AND
                              last_name = ?)`, [
			firstName,
			lastName,
			title,
			managerFirstName,
			managerLastName
		]);
	}

	updateEmployeeRole({ employee, newRole }) {
		employee = employee.split(' ');
		const firstName = employee[0];
		const lastName = employee[1];
		return connection.promise().query(`UPDATE employees
         SET role_id = (SELECT id FROM roles
                        WHERE title = ?)
         WHERE (first_name = ? AND last_name = ?)`, [ newRole, firstName, lastName ]);
	}

	quit() {
		connection.end();
	}
}

module.exports = Query;
