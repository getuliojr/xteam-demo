(function () {

    'use strict';

    /**
     * @ngdoc overview
     * @name shared.services
     * @description
     *
     * # Services #
     *
     * These services are part of the infra-instructure, core, of the application.
     *
     * Below is a list of the services. Click on each one for more information:
     *
     * - {@link shared.services.service:product product}
     *
     * - {@link shared.services.service:sponsor sponsor}
     *
     */
    angular.module('shared.services', [
        'shared.services.product',
        'shared.services.sponsor'
    ]);

})();