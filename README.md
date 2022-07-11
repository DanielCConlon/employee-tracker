# employee-tracker

GithubRepo: https://github.com/DanielCConlon/employee-tracker
Demo: https://watch.screencastify.com/v/Nc0yY7hbHDvfuvgUj3OQ

## Table-of-Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)

## [Description](#table-of-contents)

Build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

Requirements for the project:
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## [Installation](#table-of-contents)

Download the repo from Github. You will also need to run the command npm install express mysql2 in order to get npm and mysql ready.

## [Usage](#table-of-contents)

After you have installed mysql2 you will need to the root folder of the application in the command line and run mysql -u root -p. The create the employees database.
Then when you are in the root folder of the appliation go to git bash and use the command node index.js. Then fill our the questions prompted.
