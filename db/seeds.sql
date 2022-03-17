USE company_db;

INSERT INTO department (id, name) VALUES
(1, "Finance"),
(2, "Sales"),
(3, "Engineering"),
(4, "Marketing");

INSERT INTO roles (id, title, salary, department_id) VALUES
(1, "Finance Manager", 2000, 1),
(2, "Finance Clerk", 1000, 1),
(3, "Engineer", 3500, 3),
(4, "Sales Manager", 3000, 2),
(5, "Marketing Manger", 6500, 4),
(6, "Sales clerk", 2000, 2);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, "Jag", "Deep", 1, NULL),
(2, "Dee", "Pinder", 2, 1),
(3, "Jane", "Doe", 5, NULL),
(4, "Kevin", "Clein", 6, 5);



