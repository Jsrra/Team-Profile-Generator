const fs = require(`fs`)
const inquirer = require(`inquirer`)
const team = [];
const Manager = require(`./lib/manager`)
const Engineer = require(`./lib/engineer`)
const Intern = require(`./lib/intern`);
const Employee = require("./lib/employee");

// const questions = [{
//     type: `input`,
//     name: `name`,
//     message: `What is your name?`
// },
// {
//     type: `input`,
//     name: `id`,
//     message: `id?`,
// },
// {
//     type: `input`,
//     name: `email`,
//     message: `What is your email?`
// },
// {
//     type: `list`,
//     name: `role`,
//     message: `What is your role?`,
//     choices: [`Manager`, `Engineer`, `Intern`]
// },
// {
//     type: `input`,
//     name: `officeNumber`,
//     message: `What is your office number?`,
//     when: (Response.role === `Manager`)
// },
// {
//     type: `input`,
//     name: `gitHub`,
//     message: `What is your GitHub username?`,
//     when: (Response.role === `Engineer`)
// },
// {
//     type: `input`,
//     name: `school`,
//     message: `What school do you attend?`,
//     when: (Response.role === `Intern`)
// }
// ]

function init() {
    console.log("Welcome to Team Generator!!!");
    console.log("\n")


    addManager()
}
init();

function addManager() {
    inquirer.prompt([{
        type: `input`,
        name: `name`,
        message: `What is your name?`
    },
    {
        type: `input`,
        name: `id`,
        message: `id?`,
    },
    {
        type: `input`,
        name: `email`,
        message: `What is your email?`
    },
    {
        type: `input`,
        name: `officeNumber`,
        message: `What is your office number?`
    },]).then(function (answers) {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        team.push(manager);
        addEmployee();
    })
}


function addEmployee() {
    inquirer.prompt([{
        type: `list`,
        name: `role`,
        message: `Select a role.`,
        choices: [`Engineer`, `Intern`, `Quit and Create`],
    }])
        .then(function (answers) {
            switch (answers.role) {
                case `Engineer`:
                    addEngineer()
                    break;
                case `Intern`:
                    addIntern()
                    break;
                default:
                    const html = generateHtml()
                    fs.writeFileSync(`dist/index.html`, html, (err) => {
                        if (!err) { console.log(`Success!`); } else { console.log(`Error.`, err); }
                    })
                    break;
            }
        })
}

function addEngineer() {
    inquirer.prompt([{
        type: `input`,
        name: `name`,
        message: `What is your name?`
    },
    {
        type: `input`,
        name: `id`,
        message: `id?`,
    },
    {
        type: `input`,
        name: `email`,
        message: `What is your email?`
    },
    {
        type: `input`,
        name: `github`,
        message: `What is your Github username?`
    },]).then(function (answers) {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        team.push(engineer);
        addEmployee();
    })
}
function addIntern() {
    inquirer.prompt([{
        type: `input`,
        name: `name`,
        message: `What is your name?`
    },
    {
        type: `input`,
        name: `id`,
        message: `id?`,
    },
    {
        type: `input`,
        name: `email`,
        message: `What is your email?`
    },
    {
        type: `input`,
        name: `school`,
        message: `What school do you attend?`
    },]).then(function (answers) {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        team.push(intern);
        addEmployee();
    })
}

function generateHtml() {

    const employeeHtml = team.map(employee => {
        let holder = ``;
        let hold;
        if (employee.getRole() === "Manager") {
            // holder = employee.officeNumber;
            // hold = 'Office Number'
            holder = `<li class="list-group-item"> Office Number: <span>${employee.getOfficeNumber()}</span></li>`
        } else if (employee.getRole() === "Engineer") {
            // holder = employee.getGitHub();
            // hold = 'GitHub'
            holder = `<li class="list-group-item">Github: <a href="https://github.com/${employee.getGitHub()}">${employee.getGitHub()}</a></li>`
        } else if (employee.getRole() === "Intern") {
            // holder = employee.school;
            // hold = 'School'
            holder = `<li class="list-group-item"> School: <span>${employee.getSchool()}</span></li>`
        }

        return `<div class="card text-bg-primary mb-3 mx-3" style="max-width: 18rem;">
                <div class="card-header">${employee.name}<h5>${employee.getRole()}</h5><i class="bi bi-cup-hot-fill"></i></div>

                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: <span>${employee.id}</span></li>
                        <li class="list-group-item">Email: <span><a href="mailto:${employee.email}">${employee.email}</a></span></li>
                        ${holder}
                    </ul>
                </div>`
    })

    const template = `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <title>Document</title>
</head>

<body>
    <div class="d-flex bg-primary justify-content-center flex-column text-center m-3" style="height:25vh">
        <h1>My Team</h1>
    </div>

    <div class="d-flex justify-content-center">

        <div class="d-flex mx-3">

            <div class="d-flex">
            ${employeeHtml.join("")}
            </div>

        </div>
    </div>
</body>

</html>`

    console.log(template);
    return template;
}

