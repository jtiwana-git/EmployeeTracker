const inquirer = require("inquirer");
require("console.table");
const db = require("./db/connection");

const mainMenu = () => {

 inquirer.prompt([
    {
     type: "list",
     name: "mainMenu",
     message: "Select the following options",
     choices: ["View ALL roles", "View ALL departments", "View budgets", "Add a Department", "Add an Employee", "Add a Role", "QUIT"]
   }    
    ])
    .then((MenuChoice) => {
        switch (MenuChoice.mainMenu) {
            case "View ALL roles":
            viewRoles()
            break;
            case "View ALL departments":
            viewDepartments()
            break;
            case "View budgets":
            viewBudgets()
            break;
            case "Add a Department":
            addDept()
            break;
            case "Add an Employee":
            addEmployee()
            break;
            case "Add a Role":
            addRole()
            break; 
           default: 
        }                
    })

}

function viewRoles() {

db.query("SELECT * FROM roles LEFT JOIN  department ON roles.department_id = department.id", (err, res) => {
    if(err) {console.log(err)}
    else {
        console.table(res);
    }
})

}
function viewDepartments() {
  db.query("SELECT * FROM department", (err, res) => {
        if(err) {console.log(err)}
        else {
            console.table(res);
        }
    })

}


// TO DO!!!
function viewBudgets() {
    db.query("SELECT role, SUM(salary) AS budget FROM roles", (err, res) => {
        if(err) {console.log(err)}
        else {
            console.table(res);
        }
    })
}   

// NOTWORKING!! NULL VALUE
function addDept() {
    const addDeptQuestion = [
        {
            type: "input",
            name: "AddDepartment",
            message: "What the name of the NEW department?"
        }

    ];
    inquirer.prompt(addDeptQuestion).then(res => {
        const queryAddDept = "INSERT INTO department(name) VALUES (?)";
    db.query(queryAddDept, [res.name], (err, res) => {
        if (err) throw err;
        mainMenu()
    });
    })
    .catch(err => {
        console.error(err);
      });
 }
    
 function addEmployee() {
    const addEmployeeQuestion = [
        {
            type: "input",
            name: "AddFirstName",
            message: "What is the Employee's first Name?"
        },
        {
            type: "input",
            name: "AddLastName",
            message: "What is the Employee's last Name?"
        },
        {
            type: "input",
            name: "EmployeeRole",
            message: "What is the Employee's Role?"
        },
        {
            type: "list",
            name: "EmployeeManagar",
            message: "Who is the Employee's manager?",
            choices: []
        },
        
// SORT OUT
    ];
    inquirer.prompt(addDeptQuestion).then(res => {
        const queryAddDept = "INSERT INTO department(name) VALUES (?)";
    db.query(queryAddDept, [res.name], (err, res) => {
        if (err) throw err;
        mainMenu()
    });
    })
    .catch(err => {
        console.error(err);
      });

 }
    


mainMenu()
