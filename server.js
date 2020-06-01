const express = require('express');
const db = require('./db/database');

const PORT = process.env.PORT || 3001;
const app = express();

// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Connect To The Database
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected To The Database");
    intialQuestions();
  });


/*-----------------SHOW ALL DEPARTMENTS----------------------*/
const allDepartments = () => {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) throw err;
        console.table(result);

        intialQuestions();
    })
    
}

/*-----------------SHOW ALL EMPLOYEES----------------------*/
const allEmployees = () => {

    const employeeQuery = 'SELECT e.id, e.first_name,e.last_name, role.title,department.name, salary, CONCAT(m.first_name,m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON m.manager_id = e.manager_id LEFT JOIN role ON e.id = role.id LEFT JOIN department ON department.id = role.department_id WHERE e.first_name != m.first_name;'
    
    db.query(employeeQuery, (err, result) => {
        if (err) throw err;
        console.table(result);

        intialQuestions();
    })
    
}

/*-----------------SHOW ALL ROLES----------------------*/
const allRoles = () => {

    const roleQuery = 'SELECT title,salary,department.name FROM role LEFT JOIN department ON role.id = department.id;'

    db.query(roleQuery, (err, result) => {
        if (err) throw err;
        console.table(result);

        intialQuestions();
    })
}

/*-----------------ADD Department----------------------*/
const addDepartment = () => {

    inquirer.prompt([
        {
            type: "input",
            message: "Please Enter A New Department.",
            name: "addDpt",
            validate: checkDpt => {
                if(checkDpt.match("[a-zA-Z]+$")) {
                    return true;
                } else {
                    console.log("Please Enter A Valid Department");
                    return false;
                }
            }

        }
    ])
    .then(dptAnswer => {
        const sql = `INSERT INTO department (name, id) 
        VALUES (?, 4)`;
        db.query(sql, dptAnswer.addDpt, (err, result) => {
            if(err) throw err;
            console.log("Added New Department: " + dptAnswer.addDpt);
            
            allDepartments();
        })
    })

};

/*-----------------PROMPT THE USER----------------------*/

    const intialQuestions = () => {
        console.log(`
        ============================
        Welcome To Employee Tracker
        ============================
        `);
    
        return inquirer.prompt([
            {
                type: "list",
                name: "initQ",
                message: "What would you like to do?",
                choices: [
                    "View All Departments", 
                    "View All Roles", 
                    "View All Employees", 
                    "Add A Department" 
                    //,"Add A Role", 
                    //"Add An Employee", 
                    //"Update an employee role"
                ]
            }
        ]).then(qAnswer => {

                //Save the Answer
                const selection = qAnswer.initQ;
        
                if (selection == 'View All Departments') {
                    allDepartments();
                }
                else if (selection == 'View All Roles') {
                    allRoles();
                }
                else if (selection == 'View All Employees') {
                    allEmployees();
                }
                else if (selection == 'Add A Department') {
                    addDepartment();
                }
            
            })
        }
