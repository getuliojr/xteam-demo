(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name shared.services.service:sponsor
     *
     * @description
     *
     * This service is responsable to generate a random ad from 16 possible available
     *
     */
    angular.module('shared.services.sponsor', [])
        .service('sponsorService', sponsorService);

    //Create the service
    function sponsorService() {
        //save last id, so the service never sends two identical ones
        var lastId;

        //Public API
        this.getSponsorURL = getSponsorURL

        /**
         * @ngdoc function
         * @name getSponsorURL
         * @methodOf shared.services.service:sponsor
         *
         * @description
         *
         * This a public API that return a random url of an sponsor ad. It never sends the same url twice.
         */
        function getSponsorURL(){
            var id = Math.floor(Math.random()*16);

            //While id is the same as the lastId, generates a new one
            while(id == lastId ){
                id = Math.floor(Math.random()*16);
            }
            //update last Id
            lastId = id;

            //return source of the ad
            return '/ad/?r=' + id;
        }
    }
})()