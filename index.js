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
                // console.log(newDepartment);
                queries.addDepartment(newDepartment);
            })
            break;

            case 'Add a role':
            console.log('It maybe working')
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