const Employee = require(`./employee`)

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

module.exports = Engineer