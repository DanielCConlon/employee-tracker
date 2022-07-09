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


// prompt the user
const promptUser = function() {
    inquirer
    .prompt(initialQuestionList)
    .then((userResponse) => {
        console.log(userResponse.userChoice);
        switch(userResponse.userChoice) {
            case 'View all departments':
                console.log(queries);
            queries.viewAllDepartments();
            break;
        }
        switch(userResponse.userChoice) {
            case 'View all roles':
            console.log('It maybe working')
            break;
        }
        switch(userResponse.userChoice) {
            case 'View all employees':
            console.log('It maybe working')
            break;
        }
        switch(userResponse.userChoice) {
            case 'Add a department':
            console.log('It maybe working')
            break;
        }
        switch(userResponse.userChoice) {
            case 'Add a role':
            console.log('It maybe working')
            break;
        }
        switch(userResponse.userChoice) {
            case 'Add an employee':
            console.log('It maybe working')
            break;
        }
        switch(userResponse.userChoice) {
            case 'Update an employee role':
            console.log('It maybe working')
            break;
        }
    })
};


promptUser();