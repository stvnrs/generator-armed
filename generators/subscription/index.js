const Generator = require('yeoman-generator');
const destinationRoot = 'deployments';

module.exports = class extends Generator {

    initializing() {
    }

    async prompting() {
    
    }

    writing() {
        ["subscription-deployment.json"].forEach(
            template => {
                this.fs.copy(this.templatePath(template), this.destinationPath(destinationRoot, "subscription", template));
            }
        );
    }
};
