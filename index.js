const fs = require(`fs`)
const { ServerResponse } = require("http")
const inquirer = require(`inquirer`)
const { type } = require("os")
const { v4: uuidv4 } = require('uuid');

class Employee {
    constructor(name, id, email) {
        this.name = name
        this.id = id
        this.email = email
    }

    getName() {

    }
    getId() {

    }
    getEmail() {

    }
    getRole() {

    }
}

class Manager extends Employee {
    constructor(officeNumber) {
        this.officeNumber = officeNumber
    }

    getRole() {

    }
}
class Engineer extends Employee {
    constructor(gitHub) {
        this.gitHub = gitHub
    }

    getGitHub() {
        console.log(`${this.gitHub}`);
    }

    getRole() {

    }
}
class Intern extends Employee {
    constructor(school) {
        this.school = school
    }

    getRole() {

    }
}

const questions = [{
    type: `input`,
    name: `name`,
    message: `What is your name?`
},
{
    type: `list`,
    name: `id`,
    message: `id?`,
    choices: [`Yes`, `No`]
},
{
    type: `input`,
    name: `email`,
    message: `What is your email?`
},
{
    type: `list`,
    name: `role`,
    message: `What is your role?`,
    choices: [`Manager`, `Engineer`, `Intern`]
}]

const managerQuestion = [{
    type: `input`,
    name: `officeNumber`,
    message: `What is your office number?`
}]

const engineerQuestion = [{
    type: `input`,
    name: `gitHub`,
    message: `What is your GitHub username?`
}]

const internQuestion = [{
    type: `input`,
    name: `school`,
    message: `What school do you attend?`
}]

function addEmployee() {
    inquirer.prompt(questions)
        .then((Response) => {
            // console.log(Response);
            if (Response.role === `Manager`) {
                inquirer.prompt(managerQuestion)
                    .then((managerResponse) => {
                        let manager = []
                        manager.push(Response, managerResponse)
                        console.log(manager);
                    })
            } else if (Response.role === `Engineer`) {
                inquirer.prompt(engineerQuestion)
                    .then((engineerResponse) => {
                        let engineer = []
                        engineer.push(Response, engineerResponse)
                        console.log(engineerResponse);
                    })
            } else if (Response.role === `Intern`) {
                inquirer.prompt(internQuestion)
                    .then((internResponse) => {
                        let intern = []
                        if (Response.id === `Yes`) {
                            let newId = uuidv4()
                            intern.push(newId)
                        }
                        intern.push(Response, internResponse)

                        console.log(intern);
                    })
            }
        })
}

addEmployee();




