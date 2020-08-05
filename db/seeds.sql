INSERT INTO departments VALUES 
  (DEFAULT, 'Sales'),
  (DEFAULT, 'Engineering'),
  (DEFAULT, 'Finance'),
  (DEFAULT, 'Legal');


INSERT INTO roles VALUES
  (DEFAULT, 'Sales Lead', 100000, 1),
  (DEFAULT, 'Salesperson', 80000, 1),
  (DEFAULT, 'Lead Engineer', 150000, 2),
  (DEFAULT, 'Software Engineer', 120000, 2),
  (DEFAULT, 'Accountant', 125000, 3),
  (DEFAULT, 'Legal Team Lead', 250000, 4),
  (DEFAULT, 'Lawyer', 190000, 4);

INSERT INTO employees VALUES
  (DEFAULT, 'John', 'Doe', 1, 3),
  (DEFAULT, 'Mike', 'Chan', 2, 1),
  (DEFAULT, 'Ashley', 'Rodriguez', 3, null),
  (DEFAULT, 'Kevin', 'Tupik', 4, 4),
  (DEFAULT, 'Malia', 'Brown', 5, null),
  (DEFAULT, 'Sarah', 'Lourd', 6, null),
  (DEFAULT, 'Tom', 'Allen', 7, 6);
