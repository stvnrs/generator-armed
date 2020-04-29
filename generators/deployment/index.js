const Generator = require('yeoman-generator');
const destinationRoot = 'deployments';

module.exports = class extends Generator {

    initializing() {
        this.sourceRoot(`${this.sourceRoot()}/../../templates/common`);
    }

    async prompting() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "deploymentName",
                message: "Name of group deployment",
                default: "core"
            }
        ]);

        const deployments = this.config.get('deployments') || [];
        this.deployment = deployments.find(d => d.name == answers.deploymentName);

        if (!this.deployment) {
            this.deployment = {
                name: answers.deploymentName
            };
            deployments.push(this.deployment);
        }

        this.config.set('deployments', deployments);
    }

    writing() {
        ["_deployment.json", "_parameters.json", "resources.json", "variables.json", "functions.json", "outputs.json"].forEach(
            template => {
                this.fs.copy(this.templatePath(template), this.destinationPath(destinationRoot, this.deployment.name, template));
            }
        );
    }
};
