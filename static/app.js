'use strict';

angular.module('App', ['ngAnimate', 'ngResource', 'ngSanitize', 'components', 'shared',
    'ui.router', 'ngMaterial', 'md.data.table'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {


        //url padrão para todos os casos que nao encontrar nada
        $urlRouterProvider.otherwise("/");

        // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
        $urlRouterProvider.rule(function ($injector, $location) {

            var re = /(.+)(\/+)(\?.*)?$/;
            var path = $location.url();

            if (path && re.test(path)) {
                return path.replace(re, '$1$3');
            }

            return false;
        });

        // configura para funcionar como html5, necessário regras de rewrite no web.config
        $locationProvider.html5Mode(true).hashPrefix('!');

    }
])

//Angular material theme
.config(function($mdThemingProvider) {
    //placeholder/foreground color
    $mdThemingProvider.theme('default').foregroundPalette[3] = "rgba(0,0,0,0.67)";
})

;
