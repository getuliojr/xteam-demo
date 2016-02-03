(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name shared.services.service:product
     *
     * @description
     *
     * This service is responsable to return products from the server
     *
     */
    angular.module('shared.services.product', [

        ])
        .service('productService', productService);

    //Inject dependencies
    productService.$inject = ['$http', '$q'];

    //Create the service
    function productService($http, $q) {

        //public API
        this.load = load;

        /**
         * @ngdoc function
         * @name load
         * @methodOf shared.services.service:product
         *
         * @param {object=} params It accepts params with the following options:
         *
         * <ul>
         *     <li> limit - {int=} - How many records to return.</li>
         *     <li> skip - {int=} - How many records to skip in query. </li>
         *     <li> sort - {string=} - The name of the field to sort the records ascendenting</li>
         * </ul>
         *
         * @description
         *
         * This a public API that return a list of products. It accepts an object with some params:
         */
        function load(params){
            var deferred = $q.defer();

            $http.get('/api/products', {
                    params: params,
                    cache: true,

                    transformResponse: function (data, headers) {
                        //Since the server is sending the response as mal-formed json, there is the need to modify it
                        var responseData = [];
                        //Split it on line breaks
                        var splitedData = data.split("\n");
                        //Get length to avoid checking it on each loope
                        var length = splitedData.length-1;
                        for (var a=0; a<length;a++){
                            //add to result set, converting it to a real json format
                            responseData.push(angular.fromJson(splitedData[a]));
                        }
                        //return response
                        return responseData;

                    }
                })
                .then(function(response){
                    //resolve data
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    //throw exception
                    deferred.reject(error);
            })

            return deferred.promise;
        }
    }
})()