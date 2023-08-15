const { update_employee, view_depart, view_roles, view_employees, add_depart, add_role, add_employee } = require('./queries.js');


const sort_input = (input) => {
    act = input.action;
    switch(act) {
        case 'view all departments':
            view_depart;
            break;
        case 'view all roles':
            view_roles;
            break;
        case 'view all employees':
            view_employees;
            break;
        case 'add a department':
            add_depart;
            break;
        case 'add a role':
            add_role;
            break;
        case 'add an employee':
            add_employee;
            break;
        case 'update an employee role':
            update_employee;
            break;
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
        }
    return [input.employee_id.toString(), column, input.new_val];
    }

module.exports = {sort_input, sort_input_2}