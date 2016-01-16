/// <binding BeforeBuild='devDependencies' />

'use strict';

var fs = require('fs'),
    path = require('path'),
    appPrefix = '/';


var mountFolder = function (connect, dir) {
    'use strict';
    return connect.static(path.resolve(dir));
};

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        //Responsable to generate the documentation
        ngdocs: {
            options: {
                scripts: [
                    // no jquery automatically loaded for tutorial!!!
                    '//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.js',
                    '//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-touch.js',
                    '//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.js'
                ],
                dest: 'docs',
                html5Mode: false,
                startPage: '/api',
                title: "Discount Ascii Warehouse Documentation",
                titleLink: "/static/content/docs/index.html",
                bestMatch: true
            },
            api: {
                src: ['static/app.js', 'static/components/**/*.js', '!static/components/**/*.spec.js', 'static/shared/**/*.js', '!static/shared/**/*.spec.js'],
                title: 'API'
            },
            sourceCode: {
                src: ['static/content/docs/code/code.js'],
                title: 'Source Code'
            },
            tests: {
                src: ['static/content/docs/tests/*.js'],
                title: 'Tests'
            }
        },

        //Responsable to add the source code as part of the documentation
        docco: {
            code: {
                src: ['static/app.js', 'static/components/**/*.js', '!static/components/**/*.spec.js', 'static/shared/**/*.js', '!static/shared/**/*.spec.js'],
                options: {
                    output: 'static/content/docs/code'
                }
            }
        },

        //Karma configuration for Angular Unit Tests
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: false,
                singleRun: true
            },
            unitHtml:{
                configFile: 'karma.conf.js',
                autoWatch: false,
                singleRun: true,
                reporters: ['html']
            },
            unitCoverage: {
                configFile: 'karma.conf.js',
                autoWatch: false,
                singleRun: true,
                reporters: ['progress', 'coverage'],
                preprocessors: {
                    // source files, that you wanna generate coverage for
                    // do not include tests or libraries
                    // (these files will be instrumented by Istanbul)
                    'static/app.js': ['coverage'],
                    'static/components/**/!(*Spec).js': ['coverage'],
                    'static/shared/**/!(*Spec).js': ['coverage'],
                    //Views
                    'static/components/**/*.{htm,html}': ['ng-html2js']
                },
                coverageReporter: {
                    reporters: [
                        { type: 'text', dir: 'static/content/docs/tests/unit/coverage', subdir: '.' },
                        { type: 'html', dir: 'static/content/docs/tests/unit/coverage', subdir: '.' }
                    ]
                }
            }
        },


        //Responsável por inserir as referencias no index.html
        fileblocks: {
            options: {
                removeFiles: true,
               // prefix: '/static/'
                templatesFn: {
                    js: function (file) {
                        return file.replace('static/','');
                    }
                }
            },

            dev: {
                /* or multiple source files per target. */
                files: [
                    {
                        src: './static/index.html',
                        blocks: {
                            'clientJS': { //cwd: 'app',
                                src: [
                                    './static/*.js',
                                    './static/components/**/*.js',
                                    './static/shared/**/*.js',
                                    '!./static/components/**/*.spec.js',
                                    '!./static/shared/**/*.spec.js'
                                ]
                            },
                            'clientCSS': {
                                src: ['./static/content/styles/{,*/}*.css']
                            }
                        }
                    }
                ]
            }
        },

        // Automatically inject Bower components into index.html
        wiredep: {
            app: {
                directory: './static/libs',
                src: 'static/index.html',
                //ignorePath: /\.\.\//,
                fileTypes: {
                    html: {
                        block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                        detect: {
                            js: /<script.*src=['"]([^'"]+)/gi,
                            css: /<link.*href=['"]([^'"]+)/gi
                        }
                    }
                }
            },
            karma: {
                devDependencies: true,
                directory: './static/libs',
                src: 'karma.conf.js',
                ignorePath: /\.\.\//,
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            }
        }

    });



    //To force a run
    grunt.registerTask('forceOn', 'turns the --force option ON',
    function () {
        if (!grunt.option('force')) {
            grunt.config.set('forceStatus', true);
            grunt.option('force', true);
        }
    });
    //to not force a run
    grunt.registerTask('forceOff', 'turns the --force option Off',
      function () {
          if (grunt.config.get('forceStatus')) {
              grunt.option('force', false);
          }
      });

    //Generate all documentation for the app
    grunt.registerTask('docs', [            
        'docco',                                //Add source code as part of the documentation
        'karma:unitHtml',                       //Generate Unit Tests in Html 
        'karma:unitCoverage',                   //Generate Coverage for the Unit Tests in Html 
        'ngdocs'                                //Generate documentation in the front-end
    ]);

    grunt.registerTask('devDependencies', [
        'fileblocks:dev',                       //inject application dependencies
        'wiredep'                               //inject bower dependencies

    ]);

    //Configuração padrão para
    grunt.registerTask('default', [
        'devDependencies'
    ]);

    /* -- TAREFAS DE TESTE ------------------------------------------------ */

    grunt.registerTask('test', [
        'karma'
    ]);

};

