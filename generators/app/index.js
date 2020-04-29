const Generator = require('yeoman-generator');
const destinationRoot = 'deployments';

module.exports = class extends Generator {

    initializing() {
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "projectName",
                message: "Your project name",
                default: this.appname, // Default to current folder name
                store: true
            },
            {
                type: "confirm",
                name: "addTenantDeployment",
                message: "Add tenant deployment",
                default: false,
                store: true
            },
            {
                type: "confirm",
                name: "addSubscriptionDeployment",
                message: "Add subscription deployment",
                default: false,
                store: true
            },
            {
                type: "confirm",
                name: "addGroupDeployment",
                message: "Add group deployment",
                default: true,
                store: true
            }
        ]);

        if (this.answers.addTenantDeployment) {
            this.composeWith(require.resolve('../tenant'));
        }

        if (this.answers.addSubscriptionDeployment) {
            this.composeWith(require.resolve('../subscription'));
        }

        if (this.answers.addGroupDeployment) {
            this.composeWith(require.resolve('../deployment'));
        }
    }

    writing() {
        this.fs.copy(this.templatePath('git/.gitignore'), this.destinationPath('.gitignore'));
        this.fs.copy(this.templatePath('vscode'), this.destinationPath('./.vscode/'));
        this.fs.copy(this.templatePath('gulp/gulpfile.js'), this.destinationPath('gulpfile.js'));
    }
};
