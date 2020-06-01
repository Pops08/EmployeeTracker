INSERT INTO department (id, name) VALUES 
(1, 'IT'), 
(2, ’Sales’), 
(3, ‘HR’);

INSERT INTO role (id, title, salary, department_id) 
VALUES 
(1, 'Manager', 90000.00, 1),
(2, ‘PM’, 80000.00, 2), 
(3, ‘Associate’, 60000.00, 3);

INSERT INTO employee (id,first_name,last_name, role) 
VALUES (1, “John”, “Smith”, 1),
(2, “April”, “Summers”, 3, 1),
(3, “Kent”, “Rogers”, 2, 1);