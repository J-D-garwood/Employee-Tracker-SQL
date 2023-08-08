//const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();


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
    const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database: 'Employees_db'
        
    })
    return res.action
})
.then((act) => {
    switch(act) {
        case 'view all departments':
            console.log(act);
            break;
        case 'view all roles':
            console.log(act);
            break;
        case 'view all employees':
            console.log(act);
            break;
        case 'add a department':
            console.log(act);
            break;
        case 'add a role':
            console.log(act);
            break;
        case 'add an employee':
            console.log(act);
            break;
        case 'update an employee role':
            console.log(act);
            break;
    }
})
