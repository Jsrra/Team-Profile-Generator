class Employee {
    constructor(name, id, email) {
        this.name = name
        this.id = id
        this.email = email
    }

    getName(name) {
        inquirer.prompt(questions[0])
    }
    getId(id) {
        inquirer.prompt(questions[1])
        .then((Response)=> {
            if(Response.id === `Yes`)
                 let newId = uuidv4()
                 

        })
    }
    getEmail(email) {
        inquirer.prompt(questions[2])
    }
    getRole() {
        inquirer.prompt(questions[3])
        .then((Response)=> {
            if(Response.role === `Manager`){
                inquirer.prompt(managerQuestion)
            }
        })
    }
}