const Generator = require('yeoman-generator');
const destinationRoot = 'deployments';

module.exports = class extends Generator {

    initializing() {
        this.sourceRoot();
    }

    async prompting() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "dataFactoryName",
                message: "Name for the data-factory deployment",
                default: "data-factory"
            }
        ]);

        this.config.set('dataFactoryName', answers.dataFactoryName);

    }

    writing() {
        ["data-factory.json"].forEach(
            template => this.fs.copy(this.templatePath(template), this.destinationPath(`${sourceRoot}/${this.config.get('deploymentName')}`, this.config.get('dataFactoryName'), template))
        );
    }
};
