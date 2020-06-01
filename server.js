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
  });


/*-----------------SHOW ALL DEPARTMENTS----------------------*/
const allDepartments = () => {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) throw err;
        console.table(result);
    })
    intialQuestions();
}

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
                    "View All employees", 
                    "Add A Department", 
                    "Add A Role", 
                    "Add An Employee", 
                    "Update an employee role", 
                    "Update employee manager",
                    "View employees by manager",
                    "View employees by department",
                    "Delete departments",
                    "Delete roles",
                    "Delete employees",
                    "View department budget"
                ]
            }
        ])
    }
    
    intialQuestions().then(qAnswer => {

        console.log('Answer to initial question: ' + qAnswer.initQ);

        //Save the Answer
        const selection = qAnswer.initQ;

        if (selection == 'View All Departments') {
            allDepartments();
        }
        else if (selection == 'View All Roles') {

        }
        
    
    })
