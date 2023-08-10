INSERT INTO department (name)
VALUES ("Management"),
       ("Sales"),
       ("Accounting"),
       ("Human Resources"),
       ("Marketing"),
       ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 1000000.00, 1),
       ("Salesperson", 200000.00, 2),
       ("Accountant", 80000.00, 3),
       ("HR Coordinator", 80000.00, 4),
       ("Marketing analyst", 130000.00, 5),
       ("IT support officer", 90000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chuck", "Stephens", 1, NUll),
       ("Bethany", "Wilde", 2, 1),
       ("Joe", "Dork", 3, 1),
       ("Michael", "Fingers", 4, 1),
       ("Donald", "Trump", 5, NULL),
       ("Kimberly", "Saldana", 6, 1);


    