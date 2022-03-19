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
            case "Add a Department":
            addDept()
            break;
            case "Add a Role":
            addNewRole()
            break; 
            case "Add an Employee":
            addEmployee()
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
    mainMenu()
})

}
function viewDepartments() {
  db.query("SELECT * FROM department", (err, res) => {
        if(err) {console.log(err)}
        else {
            console.table(res);
        }
        mainMenu()
    })

}


// TO DO!!!
function viewBudgets() {
    db.query("SELECT * SUM(salary) FROM roles", (err, res) => {
        if(err) {console.log(err)}
        else {
            console.table(res);
        }
    })
    mainMenu()
}   


function addDept() {
    const addDeptQuestion = [
        {
            type: "input",
            name: "deptName",
            message: "What the name of the NEW department?"
        }

    ];
    inquirer.prompt(addDeptQuestion).then(res => {
        const queryAddDept = "INSERT INTO department(name) VALUES (?)";
    db.query(queryAddDept, [res.deptName], (err, res) => {
        if (err) throw err;
        mainMenu()
    });
    })
    .catch(err => {
        console.error(err);
      });
 }

 function addNewRole(){
     let departId = []
     let departName = []
     db.query("SELECT * FROM department", (err, res) =>{
         if(err) throw err 
         res.forEach(({id})=> {
             departId.push(id)
            })
         res.forEach(({name}) => {
             departName.push(name)
         })
         addRole(departId, departName)
     })

 }
 
 
 
 function addRole(departId, departName){
     let id = "";

    const addRoleQuestion = [
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the role salary?"
        },
        {
            type: "list",
            name: "selectDepart",
            message: "What is role does the department belongs to?",
            choices: departName
        },
    
    ];
    inquirer.prompt(addRoleQuestion).then(res => {
        for(let i = 0; i < departId.length; i++) {
            if(res.selectDepart === departName[i]) {
                id += departId[i]
            }

        }

        const queryAddRole = 'INSERT INTO roles(title, salary, department_id)' +
        'VALUES(?, ?, ?)';
    db.query(queryAddRole, [res.roleName, res.salary, parseInt(id)],  (err, res) => {
        if (err) {
            console.log(err)
        };
        mainMenu()

    });
    })
    .catch(err => {
        console.error(err);
      });

 }

 function addEmployee(role, supervisor) {
    db.query("SELECT * FROM ROLE", (err, res) =>{
        if (err) throw err;
        const role = []
        res.forEach(({id}) => {
            role.push(id)
        })
        res.forEach(({title}) => {
            role.push(title)
        })
    })
        
     db.query("SELECT * FROM EMPLOYEE", (err, res) => {
         if (err) throw err;
         const supervisor = [
             {
                 name: 'None',
                 value: 0
             }
         ];
         res.forEach(({first_name, last_name, id}) => {
            supervisor.push({
                 name: first_name + " " + last_name,
                 value: id
             });
         });

     })

    const addEmployeeQuestion = [
        {
            type: "input",
            name: "first_name",
            message: "What is the EMPLOYEE's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the EMPLOYEE's last name?"
        },
        {
            type: "list",
            name: "selectrole",
            message: "What role will the EMPLOYEE be in?",
            choices: role,
         },
         {
            type: "list",
            name: "selectManager",
            message: "Who is the EMPLOYEE'S manager?",
            choices: supervisor,
         }
    ];
    inquirer.prompt(addEmployeeQuestion).then(res => {
        const queryAddEmployee = "INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES (?)";
    db.query(queryAddEmployee, res.first_name, res.last_name, res.selectRole, res.selectManager, (err, res) => {
        if (err) throw err;
     
    });
})
.catch(err => {
    console.error(err)
})
 
}
mainMenu()
