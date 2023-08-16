const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
//let i = 1;
//let j = 0;
let listofids = []
let current_emp = [];
const { table, update_employee, view_depart, view_roles, view_employees, add_depart, add_role, add_employee, sort_input, sort_input_2} = require('./helpers/queries.js');
const { Console } = require('console');
const { Transform } = require('stream');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database: 'employees_db'
        
    })

const get_input = async () => {
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ]).then((res) => sort_input(res)).then();
}

//function loopedCLapp
/*
const main = () => {
    i=10
    j=0
    while (true) {
        if(i>j) {
            j+=1;
            get_input()
        }
    }
}*/

/*
const main = async () => {
    for (let count = 0; count < 3; count++) {
      await cmdLineLoop()
  };
} 
main()*/
get_input()
/*
async function main() {
    for (j =0; j<10; j+=1) {
        await get_input()
    }
}
main();
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