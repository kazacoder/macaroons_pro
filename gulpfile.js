'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const clean = require('gulp-clean-css');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');


gulp.task('assembleProject', function (cb) {
    gulp.src('./node_modules/jquery/dist/jquery.min.js').
        pipe(gulp.dest('./dist/lib/jquery'));

    gulp.src('./node_modules/inputmask/dist/jquery.inputmask.min.js').
        pipe(gulp.dest('./dist/lib/inputmask'));

    gulp.src('./node_modules/magnific-popup/dist/jquery.magnific-popup.min.js').
        pipe(gulp.dest('./dist/lib/magnific-popup'));

    gulp.src('./node_modules/magnific-popup/dist/magnific-popup.css').
        pipe(gulp.dest('./dist/lib/magnific-popup'));

    cb();
});

gulp.task('compileLess', function (cb) {
    gulp.src(['./src/animation.less', './src/styles.less', './src/adaptive.less'])
        .pipe(less())
        .pipe(concatCss('styles.css'))
        .pipe(clean())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css'));
    cb();
});


gulp.task('watchLess', function() {
    gulp.watch('./src/*.less' , gulp.series('compileLess'));
});


gulp.task('default', gulp.series('assembleProject', 'compileLess'));
