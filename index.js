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
}

init()