INSERT INTO department (name)
VALUES 
("Accounting"),
("IT"),
("HR");

INSERT INTO role (title, salary, department_id)
VALUES
('Accoutant', 100000, 1),
('Help desk', 65000, 2),
('Hiring specialist', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('James', 'Fracno', 1, NULL),
('Bob', 'Whataburger', 2, NULL),
('Tyler', 'Burger', 3, NULL),
('Five', 'Guys', 1, 1),
('Cookout', 'BurgerTray', 2, 2),
('Prime', 'Rib', 3, 3)




