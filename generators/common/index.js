const Generator = require('yeoman-generator');
const Armourer = require('../app/armourer')
const destinationRoot = 'deployments';

module.exports = class extends Generator {

    initializing(){
        this.sourceRoot(`${this.sourceRoot()}/../../templates/common/`);
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
        this.config.set(Armourer.COMMON_DEPLOYMENT_NAME, answers.commonDeploymentName);
    }

    writing() {
        ["functions.json", "variables.json"].forEach(
            template => {
                return this.fs.copy(this.templatePath(template), this.destinationPath(destinationRoot, this.config.get(Armourer.COMMON_DEPLOYMENT_NAME), template));
            });
    }
};
