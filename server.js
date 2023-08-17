//importing
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const {delete_row, table, update_employee, view_depart, view_roles, view_employees, add_depart, add_role, add_employee, sort_input, sort_input_2} = require('./helpers/queries.js');
const { Console } = require('console');
const { Transform } = require('stream');



//function for prompting for initial user input
const get_input = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'delete data']
        }
    ]).then((res) => {
        const db = mysql.createConnection(
            {
                host: 'localhost',
                user: process.env.DB_USER,
                password:process.env.DB_PASSWORD,
                database: 'employees_db'
            })
            sort_input(res);
    })
}
//running
get_input();