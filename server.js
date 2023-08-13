//const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database: 'employees_db'
        
    })
const update_employee = async () => {
    //db query and loop to extract ids
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
          console.log(err);
        }
        const listofids = {}
        for (i = 0; i<result.length(); i+=1) {
            listofids.push(result[i].id);
            console.log(result[id].id)
        }
        console.log(listofids);
      })
    /*
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'employee_id',

        }
    ])*/
}
const view_depart = async () => {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
}

const view_roles = async () => {
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        });
}

const view_employees = async () => {
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
}

const add_depart = async () => {
    await inquirer
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

const add_role = async () => {
    await inquirer
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

const add_employee = async () => {
    await inquirer
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


const sort_input = async (input) => {
    act = input.action;
    switch(act) {
        case 'view all departments':
            await view_depart();
            break;
        case 'view all roles':
            await view_roles()
            break;
        case 'view all employees':
            await view_employees()
            break;
        case 'add a department':
            await add_depart()
            break;
        case 'add a role':
            await add_role()
            break;
        case 'add an employee':
            await add_employee()
            break;
        case 'update an employee role':
            await update_employee()
            break;
        }
    }

const get_input = async () => {
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ]).then((res) => sort_input(res))
}

//function loopedCLapp
const main = async () => {
while (true) {
    await get_input()
}}

/*
const main = async () => {
    for (let count = 0; count < 3; count++) {
      await cmdLineLoop()
  };
} */
main()
/*
const loopedPromiseChain = (iterations, maxIterations) => {
    if (iterations <= maxIterations) {
        return cmdLineLoop()
            .then(() => {
                return loopedPromiseChain(iterations + 1, maxIterations);
            });
    } else {
        return Promise.resolve();
    }
}

const maxIterations = 50;

loopedPromiseChain(1, maxIterations)
    .then(() => {
        console.log("loop finito!");
    })
    .catch((error) => {
        console.error("Error: ", error);
    }*/