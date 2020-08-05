const inquirer = require('inquirer');

const promptActions = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'actions', 
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles', 
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
      ]
    }
  ])
}

const promptDepartment = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of the department you would like to add?'
    }
  ])
}

const promptRole = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: 'What is the name of the role you would like to add?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?'
    },
    {
      type: 'list',
      name: 'department',
      message: 'Please select the department this role belongs to',
      // TODO...output choices dynamically, if possible
      choices: [
        'Department 1',
        'Department 2',
        'Department 3',
        'Department 4',
        'Department 5'
      ]
    }
  ])
}

const promptAddEmp = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the new employee\'s first name?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the employee\'s last name?'
    },
    {
      type: 'list',
      name: 'role',
      message: 'Select the employee\'s role',
      // TODO...output choices dynamically, if possible
      choices: [
        'role 1',
        'role 2',
        'role 3',
        'role 4',
        'role 5'
      ]
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Select the employee\'s manager',
      choices: [
        'Manager 1',
        'Manager 2',
        'Manager 3',
        'Manager 4',
        'Manager 5'
      ]
    }
  ])
}

const promptUpdateEmp = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Please select the employee to update',
      choices: [
        'Employee 1',
        'Employee 2',
        'Employee 3',
        'Employee 4',
        'Employee 5',
        'Employee 6',
        'Employee 7'
      ]
    },
    {
      type: 'input',
      name: 'role',
      message: 'Please enter the employee\'s new role?'
    }
  ])
}