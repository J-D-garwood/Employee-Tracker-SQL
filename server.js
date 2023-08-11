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
            console.log(act);
            inquirer
            .prompt([

            ])
            console.log(act);
            break;
        case 'add a role':
            console.log(act);
            inquirer
            .prompt([

            ])
            break;
        case 'add an employee':
            console.log(act);
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter the employees first name:'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter the employees last name:'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'Enter the employees role id:'
                }
            ])
            break;
        case 'update an employee role':
            console.log(act);
            inquirer
            .prompt([

            ])
            break;
    }
});
