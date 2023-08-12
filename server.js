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

//function loopedCLapp
const cmdLineLoop = () => {
inquirer
.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }
])
.then((res) => {
    return res.action;
})
.then((act) => {
    switch(act) {
        case 'view all departments':
            console.log(act);
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });
            break;
        case 'view all roles':
            console.log(act);
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });
            break;
        case 'view all employees':
            console.log(act);
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });
            break;
        case 'add a department':
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
            break;
        case 'add a role':
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
            break;
        case 'add an employee':
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
            break;
        case 'update an employee role':
            console.log(act);
            inquirer
            .prompt([
            ])
            break;
    }
})};

cmdLineLoop();

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