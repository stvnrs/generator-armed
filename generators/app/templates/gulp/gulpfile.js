const gulp = require('gulp');
const clean = require('gulp-clean');
const bump = require('gulp-bump');
const replace = require('gulp-replace');

gulp.task('clean', function () {
    return gulp.src(['./build/**', './temp/**'], { read: false })
        .pipe(clean());
});

gulp.task('bump', function () {
    return gulp.src(['./package.json', 'package-lock.json'])
        .pipe(bump({ "type": "prerelease" }))
        .pipe(gulp.dest('./'));
});

gulp.task('build', function () {
    const fs = require('fs');
    const package = JSON.parse(fs.readFileSync('./package.json'));

    return gulp.src([
        './deployments/tenant/**.json',
        './deployments/subscription/**.json'
    ])
    .pipe(replace(/"contentVersion": "\d+.\d+.\d+.\d+"/, `"contentVersion": "${package.version.replace(/-[a-zA-Z0-9]*[.]/, '.')}"`))
        .pipe(gulp.dest('./build/'));
});


