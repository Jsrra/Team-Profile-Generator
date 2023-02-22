const Employee = require(`./employee`)

class Intern extends Employee {
    constructor(school) {
        this.school = school
    }

    getRole() {

    }
}

module.exports = Intern