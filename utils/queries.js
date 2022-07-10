const db = require('../db/connection');

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
    })
}

function addRole (roleName, roleSalary, roleDepartment) {
    const sql = ("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)");
    const params = [roleName, roleSalary, roleDepartment]

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
          }
        console.log(result);
    })
}



module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole };