module.exports = function(grunt) {

    grunt.initConfig({
        less: {
            all: {
                files: {
                    './css/styles.css': './src/styles.less'
                }
            }
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'css/styles.min.css': ['css/styles.css']
                }
            }
        },
        clean: ['css/styles.css', 'css/styles.css.map'],
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['src/*.less'],
                tasks: ['default'],
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'cssmin', 'clean', 'watch']);

};
//ATTENTION!!!!
// for correct working need to uncomment:
//@import "animation"; in src/styles.less 725 line