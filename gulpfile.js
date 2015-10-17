'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');


gulp.task('sass', function () {
    gulp.src('./assets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'))
        .pipe(notify("Leopard launcher: Sass Done!"));
});


gulp.task('scripts', function() {
    gulp.src(['./assets/js/*.js'])
        .pipe(gulp.dest('./js'))
        .pipe(browserify())
        .pipe(concat('launcher.min.js'))
        .pipe(gulp.dest('./js'))
        .pipe(notify("Leopard launcher: Scripts Done!"));
});




gulp.task('watch', function () {

    gulp.watch('./assets/sass/**', function(event) {
        gulp.run('sass');
    })

    gulp.watch('./assets/js/**', function(event) {
        gulp.run('scripts');
    })

});

gulp.task('default', function() {
    gulp.run('sass','scripts','watch');
});