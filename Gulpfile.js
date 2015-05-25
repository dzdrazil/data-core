'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var amd = require('amd-optimize');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rmrf = require('rimraf');

gulp.task('clean', function(cb) {
    rmrf('dist', function(err) {
        if (err) {
            throw err;
        }
        cb();
    });
});

gulp.task('build', function() {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            stage: 0,
            modules: 'amd'
        }))
        .pipe(amd('data-core'))
        .pipe(concat('data-core.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-min', function() {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            stage: 0,
            modules: 'amd'
        }))
        .pipe(amd('data-core'))
        .pipe(concat('data-core.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'build', 'build-min']);
