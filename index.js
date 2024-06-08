const inquirer = require("inquirer");
const fs = require("fs");
const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'departments_db'
  },
  console.log('Connected to departments_db database.')
); 
const questions = [{ 
type: "list",
name: "options",
message: "what would you like to do?",
choices: ["see departments", "see roles", "see employees", "add department", "add a role", "add an employee", "update employee role"]
}];

function init() {
    inquirer
        .prompt(questions)
        .then(input => {
          switch (input.options) {
              case "see departments": 
                  db.query('SELECT * from departments', function (error, results){
                      console.log(results);
                      init();
                  })
                  break;
              case "see roles":
                  db.query('SELECT * from roles', function (error, results){
                      console.log(results);
                      init();
                  })
                  break;
              case "see employees":
                  db.query('SELECT * from employees', function (error, results){
                      console.log(results);
                      init();
                  })
                  break;
              case "add department" :
                  inquirer
                      .prompt([
                      {
                          type: 'input',
                          name: 'departmentName',
                          message: 'what is the departments name?',
                      },
                  ])
                  .then(input => { 
                      const departmentName = input.departmentName;
                      db.query(`INSERT INTO departments (name)
                      VALUES ("${departmentName}")`, function (error, results){
                          console.log(`Added ${departmentName} department to the database`);
                          init();
                      })
                  });
                  break
              case "add a role" :
                  inquirer
                      .prompt([
                          {
                              type: 'input',
                              name: 'roleName',
                              message: 'what is the roles name?',
                          },
                          {
                              type: 'input',
                              name: 'roleSalary',
                              message: 'what is the salary?',
                          },
                          {
                              type: 'list',
                              name: 'roleDepartment',
                              message: 'what department does it belong to?',
                              choices: ["Sales","Engineering","Finance","Legal"]
                          },
                      ])
                      .then(input => { 
                          const roleName = input.roleName;
                          const roleSalary = input.roleSalary;
                          const roleDepartment = input.roleDepartment;
                          db.query(`INSERT INTO roles (title, department, salary)
                          VALUES ("${roleName}","${roleDepartment}","${roleSalary}")`, function (error, results){
                              console.log(`Added ${roleName} department to the database`);
                              init();
                          })
                      });
                      break
                      case "add an employee" :
                  inquirer
                      .prompt([
                          {
                              type: 'input',
                              name: 'employeeName',
                              message: "what is the employees first name?",
                          },
                          {
                              type: 'input',
                              name: 'employeeLast',
                              message: "what is the employees last name?",
                          },
                          {
                              type: 'list',
                              name: 'employeeRole',
                              message: "what is the employees role?",
                              choices: ["Sales Lead","Salesperson","Lead Engineer","Software Engineer","Account Manager","Accountant","Legal Team Lead","Lawyer"]
                          },
                          {
                              type: 'list',
                              name: 'employeeManager',
                              message: "who is the employees manager?",
                              choices: ["None","John Doe","Asheley Rodriguez","Kunal Singh","Sarah Lourd"]
                          },
                      ])
                      .then(input => { 
                          const employeeName = input.employeeName;
                          const employeeLast = input.employeeLast;
                          const employeeRole = input.employeeRole;
                          const employeeManager = input.employeeManager;
                          if (employeeManager === "None") {
                              var manager = "null"
                          } else {
                              manager = employeeManager
                          }
                          if (employeeRole === "Sales Lead") {
                              var department = "Sales"
                              var salary = `100000`
                          } else if (employeeRole === "Salesperson") {
                              var department = "Sales"
                              var salary = `80000`
                          } else if (employeeRole === "Lead Engineer") {
                              var department = "Engineering"
                              var salary = `150000`
                          } else if (employeeRole === "Software Engineer") {
                              var department = "Engineering"
                              var salary = `120000`
                          } else if (employeeRole === "Account Manager") {
                              var department = "Finance"
                              var salary = `160000`
                          } else if (employeeRole === "Accountant") {
                              var department = "Finance"
                              var salary = `125000`
                          } else if (employeeRole === "Legal Team Lead") {
                              var department = "Legal"
                              var salary = `250000`
                          } else if (employeeRole === "Lawyer") {
                              var department = "Legal"
                              var salary = `190000`
                          } 
                          db.query(`INSERT INTO employees (first_name, last_name, title, department, salary, manager)
                          VALUES ("${employeeName}","${employeeLast}","${employeeRole}","${department}",${salary},${manager})`, function (error, results){
                              console.log(`Added ${employeeName} ${employeeLast} department to the database`);
                              init();
                          })
                      });
                      break
                      case "update employee role" : 
                      inquirer
                      .prompt([
                          {
                              type: 'list',
                              name: 'chosenEmployee',
                              message: "which employee do you want to update?",
                              choices: ["John Doe","Mike Chan","Asheley Rodriguez","Kevin Tupik","Kunal Singh","Malia Brown","Sarah Lourd","Tom Allen"]
                          },
                          {
                              type: 'list',
                              name: 'chosenRole',
                              message: "Which role do you want to assign the selected employee?",
                              choices: ["Sales Lead","Salesperson","Lead Engineer","Software Engineer","Account Manager","Accountant","Legal Team Lead","Lawyer"]
                          },
                      ])
                      .then(input => { 
                          const chosenRole = input.chosenRole;
                          const chosenEmployee = input.chosenEmployee;
                          if (chosenEmployee === "Sales Lead") {
                              var department = "Sales"
                              var salary = `100000`
                          } else if (chosenRole === "Salesperson") {
                              var department = "Sales"
                              var salary = `80000`
                          } else if (chosenRole === "Lead Engineer") {
                              var department = "Engineering"
                              var salary = `150000`
                          } else if (chosenRole === "Software Engineer") {
                              var department = "Engineering"
                              var salary = `120000`
                          } else if (chosenRole === "Account Manager") {
                              var department = "Finance"
                              var salary = `160000`
                          } else if (chosenRole === "Accountant") {
                              var department = "Finance"
                              var salary = `125000`
                          } else if (chosenRole === "Legal Team Lead") {
                              var department = "Legal"
                              var salary = `250000`
                          } else if (chosenRole === "Lawyer") {
                              var department = "Legal"
                              var salary = `190000`
                          } 
                          var firstName = chosenEmployee.split(" ")
                          db.query(`UPDATE employees
                          SET title = "${chosenRole}", department = "${department}", salary = ${salary}
                          WHERE first_name = '${firstName[0]}';`, function (error, results){
                              console.log(`updated employees role`);
                              init();
                          })
                      });
                      break
          }
      })
}

init()