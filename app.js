const inquirer = require('inquirer');
const cTable = require('console.table');
const Query = require('./lib/Query');

const query = new Query();

const promptActions = () => {
	inquirer
		.prompt([
			{
				type    : 'list',
				name    : 'action',
				message : 'What would you like to do?',
				choices : [
					'View all departments',
					'View all roles',
					'View all employees',
					'Add a department',
					'Add a role',
					'Add an employee',
          'Update an employee role',
          'Quit'
				]
			}
		])
		.then(({ action }) => {
			// console.log(action);
			switch (action) {
				case 'View all departments':
					console.log('choice is View all departments');
					query
						.viewDept()
						.then(([ row ]) => {
							console.table(row);
							promptActions();
						})
						.catch(console.log);
					break;
				case 'View all roles':
					console.log('choice is View all roles');
					query
						.viewRoles()
						.then(([ row ]) => {
							console.table(row);
							promptActions();
						})
						.catch(console.log);
					break;
				case 'View all employees':
          console.log('choice is View all employees');
          query
          .viewEmployees()
          .then(([ row ]) => {
            console.table(row);
            promptActions();
          })
          .catch(console.log);
					break;
				case 'Add a department':
          console.log('choice is Add a department');
          promptAddDepartment();
					break;
				case 'Add a role':
          console.log('choice is Add a role');
          promptAddRole();
					break;
				case 'Add an employee':
          console.log('choice is Add an employee');
          promptAddEmployee();
					break;
				case 'Update an employee role':
					console.log('choice is Update an employee role');
          break;
        case 'Quit':
          console.log('Goodbye!')
          query.quit();
			}
		});
};

const promptAddDepartment = () => {
	// return inquirer.prompt([
	inquirer.prompt([
		{
			type    : 'input',
			name    : 'department',
			message : 'What is the name of the department you would like to add?'
		}
  ])
  .then(({ department }) => {
    query.addDepartment(department)
      .then(query.viewDept)
      .then(([ row ]) => {
        console.table(row);
        promptActions();
      })
      .catch(console.log); 
  })
};

const promptAddRole = () => {
	// TODO...populate choices dynamically from db with helper query function
	const deptChoices = [ 'Sales', 'Engineering', 'Finance', 'Legal' ];
	// return inquirer.prompt([
  inquirer.prompt([
		{
			type    : 'input',
			name    : 'title',
			message : 'What is the name of the role you would like to add?'
		},
		{
			type    : 'input',
			name    : 'salary',
			message : 'What is the salary for this role?'
		},
		{
			type    : 'list',
			name    : 'department',
			message : 'Please select the department this role belongs to',
			choices : deptChoices
		}
  ])
  .then((roleObj) => {
    query.addRole(roleObj)
      .then(query.viewRoles)
      .then(([ row ]) => {
        console.table(row);
        promptActions();
      })
      .catch(console.log); 
  })
};

const promptAddEmployee = () => {
	// TODO...populate choices dynamically from db with helper query function
	const roleChoices = [
		'Sales Lead',
		'Salesperson',
		'Lead Engineer',
		'Software Engineer',
		'Accountant',
		'Legal Team Lead',
		'Lawyer'
	];
	const managerChoices = [
		'John Doe',
		'Mike Chan',
		'Ashley Rodriguez',
		'Kevin Tupik',
		'Malia Brown',
		'Sarah Lourd',
		'Tom Allen'
	];
	inquirer.prompt([
		{
			type    : 'input',
			name    : 'firstName',
			message : "What is the new employee's first name?"
		},
		{
			type    : 'input',
			name    : 'lastName',
			message : "What is the employee's last name?"
		},
		{
			type    : 'list',
			name    : 'role',
			message : "Select the employee's role",
			choices : roleChoices
		},
		{
			type    : 'list',
			name    : 'manager',
			message : "Select the employee's manager",
			choices : managerChoices
		}
  ])
  .then((addEmpObj) => {
    query.addEmployee(addEmpObj)
      .then(query.viewEmployees)
      .then(([ row ]) => {
        console.table(row);
        promptActions();
      })
      .catch(console.log); 
  })
};

const promptUpdateEmp = () => {
  // TODO...populate choices dynamically from db with helper query function
	const employeeChoices = [
		'John Doe',
		'Mike Chan',
		'Ashley Rodriguez',
		'Kevin Tupik',
		'Malia Brown',
		'Sarah Lourd',
		'Tom Allen'
	];
	return inquirer.prompt([
		{
			type    : 'list',
			name    : 'employee',
			message : 'Please select the employee to update',
			choices : employeeChoices
		},
		{
			type    : 'input',
			name    : 'role',
			message : "Please enter the employee's new role?"
		}
	]);
};

promptActions();

