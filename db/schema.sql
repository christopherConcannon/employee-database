DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT,
  dept_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(9, 2),
  department_id INT,
  PRIMARY KEY (id),
  -- TODO...define cascade effects?
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  -- TODO...define cascade effects?
  manager_id INT REFERENCES employees(id),
  PRIMARY KEY (id),
  -- TODO...define cascade effects?
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
);


-- ADD RECURSIVE FOREIGN KEY AFTER THE TABLE HAS BEEN CREATED IF 'manager_id INT REFERENCES employees(id),' DOES NOT ACCOMPLISH WHAT WE NEED IT TO, LIKE SO: 
-- ALTER TABLE employees
-- ADD CONSTRAINT fk_manager
-- FOREIGN KEY (manager_id) REFERENCES employees(id);



