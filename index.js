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

addNewEmployeePrompt = function(roleChoices, managerChoices) {
    return [
        {
            type: 'input',
            name: 'employeesFirstName',
            message: 'What is the employees first name? ',
            validate: newEmployeeFirstName => {
                if (newEmployeeFirstName) {
                    return true;
                }
                else {
                    console.log('Please enter a first name.');
                    return false;
                }
            }
        },

        {
            type: 'input',
            name: 'employeesLastName',
            message: 'What is the employees last name? ',
            validate: newEmployeeLastName => {
                if (newEmployeeLastName) {
                    return true;
                }
                else {
                    console.log('Please enter a last name.');
                    return false;
                }
            }
        },

        {
            type: 'list',
            name: 'employeesRole',
            message: 'What is the employees role? ',
            choices: roleChoices
        },

        {
            type: 'list',
            name: 'employeeManager',
            message: "Who is the employee's manager? ",
            choices: managerChoices
        }
    ]
};


updateEmployeePrompt = function(employeeChoices, roleChoiceForUpdate) {
    return [
        {
            type: 'list',
            name: 'updateEmloyeeOption',
            message: "Which employee's role do you want to update? ",
            choices: employeeChoices
        },

        {
            type: 'list',
            name: 'updateEmloyeeRole',
            message: "What do you want to update their role to? ",
            choices: roleChoiceForUpdate
        },
    ]
};


// prompt the user
const promptUser = function() {
    inquirer
    .prompt(initialQuestionList)
    .then((userResponse) => {
        switch(userResponse.userChoice) {
            case 'View all departments':
            queries.viewAllDepartments();
            promptUser();
            break;

            case 'View all roles':
            queries.viewAllRoles();
            promptUser();
            break;

            case 'View all employees':
            queries.viewAllEmployees();
            promptUser();
            break;

            case 'Add a department':
            inquirer
            .prompt(addNewDepartmentPrompt)
            .then(({ newDepartment }) => {
                queries.addDepartment(newDepartment);
                promptUser();
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
                    promptUser();
                })
            })
            break;

            case 'Add an employee':
            // run a query that will get a list of all roles
            db.query(
                    `SELECT DISTINCT employee.role_id, role.title
                    FROM employee as employee
                    LEFT JOIN role on employee.role_id = role.id
                    LEFT JOIN department on role.department_id = department.id
                    LEFT JOIN employee as employee2 on employee.id = employee2.manager_id`,
                    (err, res) => {
                        const roleChoices = res.map((row) => {
                            return { value: row.role_id, name: row.title };
                        });
                        // run a query that gets a list of all managers
                        const sql = `SELECT DISTINCT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS manager 
                                    FROM employee
                                    LEFT JOIN role on employee.role_id = role.id
                                    LEFT JOIN department on role.department_id = department.id

                                    WHERE employee.manager_id IS  NULL`;


                        db.query(sql, (err, res) => {
                            const managerChoices = res.map((row) => {
                                return { value: row.id, name: row.manager };
                            });

                            const roleChoicesManagerChoices = addNewEmployeePrompt(roleChoices, managerChoices);

                            inquirer
                            .prompt(roleChoicesManagerChoices)
                            .then(({ employeesFirstName, employeesLastName, employeesRole, employeeManager }) => {
                                queries.addEmployee(employeesFirstName, employeesLastName, employeesRole, employeeManager);
                                console.log(`${employeesFirstName} ${employeesLastName} was added to the database.`)
                                promptUser();
                            });
                        })
                    })

            break;

            case 'Update an employee role':
            db.query(
                `SELECT CONCAT(employee.first_name, " ", employee.last_name) AS empName FROM employee`,
                (err, res) => {
                    const employeeChoices = res.map((row) => {
                        return { value: row.empName, name: row.empName };
                    });

                    db.query(
                        `SELECT id, title
                        FROM role`,
                        (err, res) => {
                            const roleChoiceForUpdate = res.map((row) => {
                                return { value: row.id, name: row.title };
                            });

                            const update = updateEmployeePrompt(employeeChoices, roleChoiceForUpdate);
                            inquirer
                            .prompt(update)
                            .then(({ updateEmloyeeOption, updateEmloyeeRole }) => {
                                console.log(`${updateEmloyeeOption}'s role was updated!`);

                                queries.updateEmployee(updateEmloyeeOption, updateEmloyeeRole);
                                promptUser();
                            });
                        }
                    )
                }
            );
            break;
        }
    })
};


promptUser();