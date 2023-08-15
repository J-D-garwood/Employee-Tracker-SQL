const { sort_input, sort_input_2 } = require("./sorters.js");

const update_employee = async () => {
    //db query and loop to extract ids
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
          console.log(err);
        }
        current_emp = result;
        listofids = []
        for (i = 0; i<current_emp.length; i+=1) {
            listofids.push(current_emp[i].id.toString());
        }
        console.log(listofids);
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Pick the id of the employee whose entry you want to update: ',
                choices: listofids
            },
            {
                type: 'list',
                name: 'col',
                message: 'Pick the attribute you want to change: ',
                choices: ['first name', 'last name', 'role id', 'manager id']
            },
            {
                type: 'input',
                name: 'new_val',
                message: 'Enter the new value: '
            }
        ]).then((res) => sort_input_2(res)).then((sorted) => {
            db.query(`UPDATE employee SET ${sorted[1]} = '${sorted[2]}' WHERE id = ${sorted[0]}`, (err, res) => {
                if (err) {
                    console.log(err);
                  }
                  console.log(res);
            });
        })
      })
}

const view_depart = () => {
db.query(` SELECT department.id AS ID, department.department_name AS department FROM department`, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
    });
}

const view_roles = () => {
    db.query(`SELECT role.title AS title, role.id AS ID, department.department_name AS department, role.salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        });
}
    
const view_employees = () => {
    db.query(`SELECT employee.id AS ID, employee.first_name AS name, employee.last_name AS surname, role.title AS title, role.salary AS salary FROM employee LEFT JOIN role ON employee.role_id = role.id`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
}

const add_depart = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the new department\'s name:'
        }
    ]).then((res) => {
        db.query(`INSERT INTO department (department_name) VALUES (?)`,res.name, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result);
          });
    })
}

const add_role = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the new role\'s title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the role\'s salary:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the role\'s department id:'
        }
    ]).then((res) => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${res.title}", ${res.salary}, ${res.department_id})`, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            });
    })
}

const add_employee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the employee\'s first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the employee\'s last name:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the employee\'s role id:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the employee\s manager id:'
        }
    ]).then((res) => {
        db.query(`INSERT INTO  employee (first_name, last_name, role_id, manager_id) VALUES ("${res.first_name}", "${res.last_name}", ${res.role_id}, ${res.manager_id})`, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            });
    })
}

module.exports = {update_employee, view_depart, view_roles, view_employees, add_depart, add_role, add_employee};