/*jshint node:true*/

module.exports = function(grunt){
    'use strict';
    
    require('load-grunt-tasks')(grunt);
    var pkg, path;
    path = require('path');
    pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        pkg:pkg,


        
//===================================================================
        jshint:{
            options:{
                jshintrc: '.jshintrc',
                force: true,
                reporter: require('jshint-stylish')
            },
            tests:{
                src: ['test/**/*.js']
            },
            lib:{
                src: ['./*.js']
            },
            gruntfile:{
                src:'Gruntfile.js'
            }
            
        },
//===================================================================

        jsonlint:{
            pkg: {
                src: 'package.json'
            }
        },

//===================================================================

        watch:{
            scripts:{
                files: ['./test/**/*.js', './*.js', 'Gruntfile.js', './*.json'],
                tasks: ['jshint', 'jsonlint'],
                spawn: true
            }
        }
//===================================================================





    });


grunt.registerTask('test', ['mochaWebdriver', 'jshint']);
grunt.registerTask('linting', ['jshint', 'jsonlint']);
};
