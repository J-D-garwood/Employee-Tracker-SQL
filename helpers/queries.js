const mysql = require('mysql2');
require('dotenv').config();
const { Console } = require('console');
const { Transform } = require('stream');
const inquirer = require('inquirer');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database: 'employees_db'
        
    })

const table = (data) => {
    // @see https://stackoverflow.com/a/67859384
    const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
    const logger = new Console({ stdout: ts })
    logger.table(data)
    const table = (ts.read() || '').toString()
    let result = '';
    for (let row of table.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, '┌');
    r = r.replace(/^├─*┼/, '├');
    r = r.replace(/│[^│]*/, '');
    r = r.replace(/^└─*┴/, '└');
    r = r.replace(/'/g, ' ');
    result += `${r}\n`;
    }
    console.log(result);
}

const view_depart = () => {
db.query(` SELECT department.id AS ID, department.department_name AS Department FROM department`, (err, result) => {
    if (err) {
        console.log(err);
    }
    table(result);
    });
}

const update_employee = () => {
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
                  console.log("Employee Updated!!");
            });
        })
      })
}

const view_roles = () => {
    db.query(`SELECT role.title AS Title, role.id AS ID, department.department_name AS Department, role.salary AS Salary FROM role LEFT JOIN department ON role.department_id = department.id`, (err, result) => {
        if (err) {
            console.log(err);
        }
        table(result);
        });
}
    
const view_employees = () => {
    db.query(`SELECT employee.id AS ID, employee.first_name AS Name, employee.last_name AS Surname, role.title AS Title, role.salary AS Salary FROM employee JOIN role ON employee.role_id = role.id`, (err, result) => {
        if (err) {
          console.log(err);
        }
        table(result);
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
            console.log("Department Added!!!");
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
            console.log("Role Added!!!");
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
            console.log("Employee Added!!!");
            });
    })
}

const sort_input = (input) => {
    act = input.action; 
    switch(act) {
        case 'view all departments':
            view_depart();
            break;
        case 'view all roles':
            view_roles();
            break;
        case 'view all employees':
            view_employees();
            break;
        case 'add a department':
            add_depart();
            break;
        case 'add a role':
            add_role();
            break;
        case 'add an employee':
            add_employee();
            break;
        case 'update an employee role':
            update_employee();
            break;
        case 'delete data':
            delete_row();
            break;
        default:
            console.log("error")
    }
        //ADD DEFAULT 
    }

const sort_input_2 = (input) => {
    let column = input.col;
    switch(column) {
        case 'first name':
            column = "first_name";
            break;
        case 'last name':
            column = "last_name";
            break;
        case 'role id':
            column = "role_id";
            break;
        case 'manager id':
            column = "manager_id";
            break;
        default:
            console.log("error");
        }
    return [input.employee_id.toString(), column, input.new_val];
    }

const delete_row = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'datatype',
            message: 'Which type of data would you like to delete',
            choices: ['employee', 'role', 'department']
            
        }
    ]).then((input) => {
        db.query(`SELECT * FROM ${input.datatype}`, (err, result) => {
            if (err) {
              console.log(err);
            }
            tab = result;
            listofids = []
            for (i = 0; i<tab.length; i+=1) {
                listofids.push(tab[i].id.toString());
            }
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'id_to_del',
                    message: `Pick the id of the ${input.datatype} whose entry you want to delete`,
                    choices: listofids
                },
            ]).then((res)  => {
                db.query(`DELETE FROM ${input.datatype} WHERE id = ${res.id_to_del}`,(err, result) => {
                    if (err) {
                      console.log(err);
                    }
                    console.log(`${input.datatype} deleted!!`)
                });
            })
          })
    })
}

const show_depart_bud = () => {

}

module.exports = {delete_row, table, update_employee, view_depart, view_roles, view_employees, add_depart, add_role, add_employee, sort_input, sort_input_2};