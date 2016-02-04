'use strict';

module.exports = function (config) {
  config.set({
    basePath: '.',

    frameworks: ['jasmine'],

    files: [

      // Third party libs, should be added automatically by grunt: devDependencies
      // bower:js
      'static/libs/jquery/dist/jquery.js',
      'static/libs/es5-shim/es5-shim.js',
      'static/libs/angular/angular.js',
      'static/libs/angular-animate/angular-animate.js',
      'static/libs/angular-resource/angular-resource.js',
      'static/libs/angular-sanitize/angular-sanitize.js',
      'static/libs/angular-ui-router/release/angular-ui-router.js',
      'static/libs/angular-aria/angular-aria.js',
      'static/libs/angular-messages/angular-messages.js',
      'static/libs/angular-material/angular-material.js',
      'static/libs/angular-material-data-table/dist/md-data-table.min.js',
      'static/libs/angular-mocks/angular-mocks.js',
      // endbower

      // nossa aplicação e testes
      'static/*.js',
      'static/components/**/*.js',
      'static/shared/**/*.js',

      // templates
      'static/components/**/*.{html, htm}'

    ],
    // lista de arquivos para excluir
    exclude: [

    ],

    autoWatch: true,
    singleRun: false,
    colors: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    //captureTimeout: 8000,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_ERROR,

    reporters: ['dots'],

    preprocessors: {
        //Converter os templates em modulos para os testes
        'static/components/**/*.{htm,html}': ['ng-html2js']
    },


    //Configuration to generate an html report for the unit tests
    htmlReporter: {
        outputDir: 'static/content/docs/generated/tests/', // where to put the reports
        templatePath: null, // set if you moved jasmine_template.html
        focusOnFailures: true, // reports show failures on start
        namedFiles: false, // name files instead of creating sub-directories
        pageTitle: "Discount Ascii Warehouse", // page title for reports; browser info by default
        urlFriendlyName: true, // simply replaces spaces with _ for files/dirs
        reportName: 'unit', // report summary filename; browser info by default


        // experimental
        preserveDescribeNesting: true, // folded suites stay folded 
        foldAll: false, // reports start folded (only with preserveDescribeNesting)
    },

    //Configure templates so it can be used in the tests
    ngHtml2JsPreprocessor: {
        // setting this option will create only a single module that contains templates
        // from all the files, so you can load them all with module('templates')
        moduleName: 'templates',


      // strip this from the file path
      stripPrefix: 'static/',
      // prepend this to the
      //prependPrefix: ''

      // or define a custom transform function
      //, cacheIdFromPath: function (filepath) {
      //    return filepath;
      //}

      
    }
  });
};
