(function () {

    'use strict';

     /**
     * @ngdoc overview
     * @name components.sponsor
     * @description
     *
     * # sponsor - Component #
     *
     * This module is responsible to insert and Ad from a sponsor.
     *
     * @example
       <pre>
        <gr-sponsor></ gr-sponsor>
       </pre>
     */
    angular
        .module('components.sponsor', [
            'shared.services.sponsor'
        ])

        .directive('grSponsor', sponsorDirective)
        .controller('SponsorController', SponsorController);

    /**
     * @ngdoc directive
     * @name components.sponsor.directive:grSponsor
     * @restrict 'E'
     *
     * @description
     *
     * This directive will render and Ad from a sponsor
     *
     */
    function sponsorDirective() {
        return {
            restrict: 'E',
            controller: 'SponsorController',
            templateUrl: 'components/sponsor/sponsor.html',
            controllerAs: 'sponsor',
            scope: {},
            bindToController: {
            }
        }
    }

    //Inject Dependencies
    SponsorController.$inject = ['sponsorService'];

    /**
     * @ngdoc controller
     * @name components.sponsor.controller:SponsorController
     *
     * @requires shared.services.service:sponsor
     *
     * @description
     *
     * It has all the logic for the component ad
     *
     */
    function SponsorController (sponsorService) {

        var vm = this;

        //Just load the url of the ad in the controller
        vm.src = sponsorService.getSponsorURL();
    }
})();