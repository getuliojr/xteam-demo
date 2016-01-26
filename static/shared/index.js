(function () {

    'use strict';

    //Define o módulo
    angular
        .module('shared', [
            'shared.services',
            'shared.filters.timeAgo'
        ]);
})();