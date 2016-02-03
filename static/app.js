'use strict';

angular.module('App', ['ngAnimate', 'components', 'shared', 'ngMaterial', 'md.data.table'])

//Angular material theme
.config(function($mdThemingProvider) {
    //placeholder/foreground color
    $mdThemingProvider.theme('default').foregroundPalette[3] = "rgba(0,0,0,0.67)";
});
