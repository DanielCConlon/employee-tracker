const db = require('../db/connection');
// const cTable = require('console.table');

function viewAllDepartments () {
    db.query('SELECT * FROM DEPARTMENT', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });
};

function viewAllRoles () {
    db.query('SELECT * FROM ROLE', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });

};

function viewAllEmployees () {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });
};

function addDepartment (newDepartmentName) {
    const sql = ("INSERT INTO department (name) VALUES (?)");
    const params = [newDepartmentName]

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
          }
        console.log(`You added a new department called ${params}`)
        console.log(result);
    });
}

function addRole (roleName, roleSalary, roleDepartment) {
    const sql = ("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)");
    const params = [roleName, roleSalary, roleDepartment];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
          }
        console.log(result);
    });
}

function addEmployee (employeesFirstName, employeesLastName, employeesRole, employeeManager) {
    const sql = ("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)");
    const params = [employeesFirstName, employeesLastName, employeesRole, employeeManager];

    db.query(sql, params, (err, res) => {
        if (err) {
            console.log(err);
          }
        console.log(res);
    });
}

function updateEmployee (updateEmloyeeOption, updateEmloyeeRole) {
    const splitEmployee = updateEmloyeeOption.split(" ");
    first_name = splitEmployee[0];
    last_name = splitEmployee[1];

    const sql = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`;
    const params = [updateEmloyeeRole, first_name, last_name];

    db.query(sql, params, (err, res) => {
        if (err) {
            console.log(err);
          }
        console.log(res);
    });
}



module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployee };