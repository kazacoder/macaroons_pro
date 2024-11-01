'use strict';

const gulp = require('gulp');


function defaultTask(cb) {
    gulp.src('./node_modules/jquery/dist/jquery.min.js').
        pipe(gulp.dest('./dist/lib/jquery'));

    gulp.src('./node_modules/inputmask/dist/jquery.inputmask.min.js').
        pipe(gulp.dest('./dist/lib/inputmask'));

    gulp.src('./node_modules/magnific-popup/dist/jquery.magnific-popup.min.js').
        pipe(gulp.dest('./dist/lib/magnific-popup'));

    gulp.src('./node_modules/magnific-popup/dist/magnific-popup.css').
        pipe(gulp.dest('./dist/lib/magnific-popup'));

    cb();
}

exports.default = defaultTask