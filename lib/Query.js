const connection = require('../utils/connection');

class Query {

  // HELPER METHODS
  
  // used in promptAddRole().  queries db to return array of department names
  deptsArray() {
    return connection.promise().query(
      `SELECT dept_name FROM departments`)
      .then(([ rows ]) => {
        rows.map(row => row.dept_name);
        rows = rows.map(row => row.dept_name);
        // console.log(rows)
        return rows;
      })
  }
  

  // used in promptAddEmployee().  queries db to return array of roles
  rolesArray() {
    return connection.promise().query(
      `SELECT title FROM roles`)
      .then(([ rows ]) => {
        rows.map(row => row.title);
        rows = rows.map(row => row.title);
        // console.log(rows)
        return rows;
      })
  }

  // used in promptAddEmployee().  queries db to return array of employees (each is also a possible manager)
  employeesArray() {
    return connection.promise().query(
      `SELECT CONCAT(first_name, ' ', last_name) AS fullName FROM employees`)
      .then(([ rows ]) => {
        rows.map(row => row.fullName);
        rows = rows.map(row => row.fullName);
        // console.log(rows)
        return rows;
      })
  }

	// used in addRoles().  takes in department name and returns department id
	deptHelper(deptName) {
		return connection.promise().query(
			`SELECT id FROM departments
       WHERE dept_name = ?`,
			deptName
    )
	}

	// used in addEmployees() and updateEmployeeRole().  takes in role title and returns role id
	roleHelper(roleName) {
		return connection.promise().query(
			`SELECT id FROM roles
       WHERE title = ?`,
			roleName
		);
	}

  // used in addEmployees().  takes in full name of manager and returns manager's employee id
	managerHelper(managerName) {
    const fullName = managerName.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[1];
    
		return connection.promise().query(
      `SELECT id FROM employees
       WHERE first_name = ? AND last_name = ?`,
			[firstName, lastName]
		);
	}

  // MAIN QUERY METHODS 
  
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


	addRole(newRole) {
		const { title, salary, department } = newRole;
		return this.deptHelper(department)
			.then(([ rows ]) => {
				return rows[0].id;
			})
			.then((rowID) => {
        // console.log('department id:', rowID);
        return connection.promise().query(`INSERT INTO roles SET ?`, {
          title         : title,
          salary        : salary,
          department_id : rowID
        });
      })
			.catch(console.log);


	}

	addEmployee(newEmp) {
		const { firstName, lastName, role, manager } = newEmp;
		return this.roleHelper(role)
			.then(([ rows ]) => {
				return rows[0].id;
			})
			.then((roleID) => {
        // console.log('role id:', roleID);
        this.managerHelper(manager)
        .then(([ rows ]) => {
          const managerID = rows[0].id;
          // console.log('manager id:', managerID);
          const idsObj = {
            roleID: roleID,
            managerID: managerID
          }
          return idsObj
        })
        .then(idsObj => {
          const { roleID, managerID } = idsObj;
          return connection.promise().query(`INSERT INTO employees SET ?`, {
            first_name : firstName,
            last_name  : lastName,
            role_id    : roleID,
            manager_id : managerID
          });
        })
        // .then(this.viewEmployees)
        // .then(([ row ]) => {
        //   console.table(row);
        // })
      })
      .catch(console.log);
	}

  // find employee by name
	updateEmployeeRole({ employee, newRole }) {
    return this.roleHelper(newRole)
    .then(([ rows ]) => {
      return rows[0].id;
    })
    .then(roleID => {
      employee = employee.split(' ');
      const firstName = employee[0];
      const lastName = employee[1];
      return connection.promise().query(
        `UPDATE employees
         SET role_id = ?
         WHERE first_name = ? AND last_name = ?`,
         [roleID, firstName, lastName]);
    })
	}

	quit() {
		connection.end();
	}
}

// // DEV PURPOSES ONLY******************************************************
// const testQuery = new Query();

  // testQuery.deptsArray();
  // testQuery.rolesArray();
  // testQuery.employeesArray();

  // .then( ([rows,fields]) => {
//   console.log(rows);
// })
// .catch(console.log)

// DEV PURPOSES ONLY******************************************************

module.exports = Query;


