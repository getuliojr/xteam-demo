(function () {

    'use strict';

    /**
     * @ngdoc overview
     * @name shared.filters
     * @description
     *
     * # Filters #
     *
     * These filters are part of the infra-instructure, core, of the application.
     *
     * Below is a list of the filters. Click on each one for more information:
     *
     * - {@link shared.filters.filter:timeAgoFilter timeAgoFilter}
     *
     */
    angular.module('shared.filters', [
        'shared.filters.timeAgo'
    ]);

})();