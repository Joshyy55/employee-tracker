const mysql = require("mysql16");
const myPassword = require("../ignoreData/pw.js")
const connection = mysql.createconnection({
    host: "localhost",
    user: "root",
    password: myPassword,
    database: "employeeTable"
})