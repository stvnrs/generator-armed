const fs = require('fs');
const { dest, parallel, series, src, task } = require('gulp');
const gulpClean = require('gulp-clean');
const gulpBump = require('gulp-bump');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const mergeJson = require('gulp-merge-json');
const beautify = require('gulp-jsbeautify');

function bump() {
    return src(['./package.json', 'package-lock.json'])
        .pipe(gulpBump({ "type": "prerelease" }))
        .pipe(dest('./'));
}

function clean() {
    return src(['./build/**', './temp/**'], { read: false })
        .pipe(gulpClean());
}

const deployments = JSON.parse(
    fs.readFileSync('./.yo-rc.json'))["generator-armed"]
    .deployments.filter(
        d => { return d.name !== '_common' }
    );
const deploymentTasks = [];

deployments.forEach(d => {
    deploymentTasks.push("build:deployment:" + d.name);
    task("build:deployment:" + d.name,
        () => {
            const version = JSON.parse(fs.readFileSync('./package.json')).version;

            return src([
                `./deployments/${d.name}/_deployment.json`,
                `./deployments/${d.name}/functions*.json`,
                `./deployments/${d.name}/variables*.json`,
                `./deployments/${d.name}/resources*.json`,
                `./deployments/${d.name}/outputs*.json`
            ])
                .pipe(src([
                    `./deployments/_common/variables*.json`,
                    `./deployments/_common/functions*.json`,
                ], { allowEmpty: true }
                ))
                .pipe(mergeJson({
                    concatArrays: true
                }))
                .pipe(rename(`_deployment.json`))
                .pipe(src(`./deployments/${d.name}/_parameters*.json`))
                .pipe(rename(path => { path.basename = `${d.name}.${path.basename.substring(1)}` }))
                .pipe(replace(/"contentVersion": "\d+.\d+.\d+.\d+"/, `"contentVersion": "${version.replace('-', '.')}"`))
                .pipe(beautify({
                    indent_char: ' ',
                    indent_size: 2
                }))
                .pipe(dest(`./build/${d.name}`));
        }
    );
});

exports.bump = bump;
exports.clean = clean;
exports["build:deployments"] = parallel(deploymentTasks);
exports.default = series(clean, bump, parallel(deploymentTasks));
