const Generator = require('yeoman-generator');
const Armed = require('../app/armed')
const destinationRoot = 'deployments';

module.exports = class extends Generator {

    initializing(){
    }

    async prompting() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "commonDeploymentName",
                message: "Name for the common deployment",
                default: "_common"
            }
        ]);

        const deployment = {
            name: answers.commonDeploymentName
        }
        const deployments = this.config.get('deployments') || [];
        deployments.push(deployment);
        this.config.set('deployments', deployments);
        this.config.set(Armed.COMMON_DEPLOYMENT_NAME, answers.commonDeploymentName);
    }

    writing() {
        ["functions.json", "variables.json"].forEach(
            template => {
                return this.fs.copy(this.templatePath(template), this.destinationPath(destinationRoot, this.config.get(Armed.COMMON_DEPLOYMENT_NAME), template));
            });
    }
};
