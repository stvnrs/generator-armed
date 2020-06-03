# Armed

Armed is [yeoman](https://yeoman.io/) generator that simplifies the development of ARM templates using a code first compositional approach. It will produce a solution consists of a number of ARM template fragments which are merged together without the need for pre-processing or transformation which maintains compatibility with the [Azure Resource Manager (ARM) Tools for Visual Studio Code (Preview)](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools) from Microsoft.

## Quick Start

### Pre-requisites

- Install/update PowerShell [Az](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-3.8.0) or the [azure-cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).

- Install/update *node* & *npm* for your platform [nodejs.org](https://nodejs.org/en/).

- Install *gulp* globally - global install is required for VS Code to detect gulp build tasks.

```Powershell
npm install --global gulp
```

- Install *yeoman* - see yeoman's [docs](https://yeoman.io/learning/index.html) for a detailed walkthrough.

```Powershell
npm install --global yo
```

- Install *armed* from the npm repository, or to use a clone of this repository see the [Contributing](#Contributing) section below.

```Powershell
npm install --global generator-armed
```

### Creating an armed project

- Open your favorite terminal and create a new folder for your project:

```Powershell
mkdir my-armed-project
cd my-armed-project
```

- Run _npm init_ to initialize your project. See npm's [docs](https://docs.npmjs.com/) for a more detailed walkthrough of this process.
(Note: we expect to automate this step at some point.)

```bash
npm init
```

```text
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (my-armed-project)
version: (1.0.0)
description: Super cool armed project!
entry point: (index.js)
test command:
git repository:
keywords: arm
author: Ricky Swift
license: (ISC)
About to write to C:\Users\StevenRose\source\repos\my-armed-project\package.json:
{
  "name": "my-armed-project",
  "version": "1.0.0",
  "description": "Super cool armed project!",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "arm"
  ],
  "author": "Ricky Swift",
  "license": "ISC"
}


Is this OK? (yes)
```

- Install *gulp* packages required for building your armed solution (Note: we expect to automate this step at some point.)

```bash
npm install gulp-clean gulp-bump gulp-replace --save-dev
```

- Run the *armed* generator: 
Armed will prompt you for any required inputs - you can accept the defaults by pressing return or enter your own values.

```Powershell
yo armed
```

```text
? Your project name my-armed-project
? Add tenant deployment true
? Add subscription deployment true
? Add group deployment true
? Name of group deployment core
   create .gitignore
   create .vscode\snippets.code-snippets
   create gulpfile.js
   create deployments\tenant\tenant-deployment.json
   create deployments\subscription\subscription-deployment.json
   create deployments\core\_deployment.json
   create deployments\core\_parameters.json
   create deployments\core\resources.json
   create deployments\core\variables.json
   create deployments\core\functions.json
   create deployments\core\outputs.json
```

### Output

This will create a folder structure like this:

```Powershell
.
├───.vscode
└───deployments
    ├───_common
    ├───core
    ├───subscription
    └───tenant
```

#### .vscode

Contains vscode config files including solution specific settings, snippets etc.

#### deployments/_common

This folder contains files that will be included with all deployments. By default it contains 2 files:

```Powershell
    functions.json
    variables.json
```

- functions.json should contain any functions that need to be consistent across all deployments e.g. functions used to generate resource names.
- variables.json should contain variables that need to be consistent across all deployments.

#### deployments/core

```Powershell
    _deployment.json
    _parameters.json
    resources.json
    outputs.json
```

#### Files

##### _deployment.json

File name can be overridden in .yo-rc.json (not yet supported)

This file contains ...

```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "",
    "apiProfile": "",
    "parameters": {  }
  }
```

Note: only schema and parameter objects are required. Parameters can be empty.

Example:

```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0",
    "parameters": {  

    }
  }
```

##### _parameters.json

File name can be overridden in .yo-rc.json (not yet supported)

```json
{
    "parameters": {  }
}
```

Example:

```json
{
    "parameters": {  }
}
```

## Generators

armed

```Powershell
yo armed
```

### Sub-generators

#### Deployment

A deployment contains a set of resources to be deployed to a single resource group - see Azure docs on resource groups [here](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview).  An armed solution can contain deployments for multiple different resource groups

```Powershell
yo armed:deployment
```

#### Data Factory

```Powershell
yo armed:data-factory
```

#### Dataset

```Powershell
yo armed:dataset
```

#### Data Flow

```Powershell
yo armed:data-flow
```

#### Pipeline

```Powershell
yo armed:pipeline
```

#### Linked Service

```Powershell
yo armed:linked-service
```

#### Logic App

```Powershell
yo armed:logic-app
```

## Contributing

Clone this repo.

```bash
git clone https://github.com/stvnrs/generator-armed
```

Link the armed generator

```bash
cd generator-armed
npm link
```

Note:  in your target solution you will need to manually initialize the package and locally install dependencies

```bash
npm init
npm install gulp-clean gulp-bump gulp-replace
```

Any changes made in the generator-armed solution will be available immediately in your target solution.

## Licence

The source code in this repository is licensed under the [ISC license](https://opensource.org/licenses/ISC).
