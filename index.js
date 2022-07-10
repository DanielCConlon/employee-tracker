const inquirer = require('inquirer');
const queries = require('./utils/queries');
const db = require('./db/connection');

// --------------------------------------------------
const initialQuestionList = [
    {
        type: 'list',
        name: 'userChoice',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        validate: questionListInput => {
            if (questionListInput) {
                return true;
            }
            else {
                console.log('Please select an Option.');
                return false;
            }
        }
    }
]

const addNewDepartmentPrompt = [
    {
        type: 'input',
        name: 'newDepartment',
        message: 'What is the name of the department? ',
        validate: departmentInput => {
            if (departmentInput) {
                return true;
            }
            else {
                console.log('Please name a department.');
                return false;
            }
        }
    }
]

 addNewRolePrompt = function(departmentChoices){
    return [
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the Role? ',
            validate: newRoleNameInput => {
                if (newRoleNameInput) {
                    return true;
                }
                else {
                    console.log('Please enter a Role.');
                    return false;
                }
            }
        },
    
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the Role? ',
            validate: newRoleSalaryInput => {
                if (newRoleSalaryInput) {
                    return true;
                }
                else {
                    console.log('Please enter a Salary.');
                    return false;
                }
            }
        },
    
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'What department does this role belong to? ',
            choices: departmentChoices
        }
    
    ];
 };

// prompt the user
const promptUser = function() {
    inquirer
    .prompt(initialQuestionList)
    .then((userResponse) => {
        switch(userResponse.userChoice) {
            case 'View all departments':
            queries.viewAllDepartments();
            break;

            case 'View all roles':
            queries.viewAllRoles();
            break;

            case 'View all employees':
            queries.viewAllEmployees();
            break;

            case 'Add a department':
            inquirer
            .prompt(addNewDepartmentPrompt)
            .then(({ newDepartment }) => {
                queries.addDepartment(newDepartment);
            })
            break;

            case 'Add a role':
            // run a query to get a list of departments to pass into inquirer prompt so the user only can choose from a list of departments from the DB
            db.query(`SELECT * FROM department`, (err, res) => {
                const deptChoices = res.map((row) => {
                    return { value: row.id, name: row.name };
                });
                const newRolePrompt = addNewRolePrompt(deptChoices);
                inquirer
                .prompt(newRolePrompt)
                .then(({ roleName, roleSalary, roleDepartment }) => {
                    queries.addRole(roleName, roleSalary, roleDepartment);
                })
            })
            break;

            case 'Add an employee':
            console.log('It maybe working')
            break;

            case 'Update an employee role':
            console.log('It maybe working')
            break;
        }
    })
};


promptUser();