(function () {

    'use strict';

    //Define the module
    angular.module('shared.services.service.product', [
        'shared.services.factory.appResource'
        ])
        .service('productService', productService);

    //Inject dependencies
    productService.$inject = ['$http', '$q'];

    //Create the service
    function productService($http, $q) {

        this.load = load;

        function load(params){
            var deferred = $q.defer();

            $http.get('/api/products', {
                    params: params,

                    transformResponse: function (data, headers) {
                        //Since the server is sending the response as mal-formed json, there is the need to modify it
                        var responseData = [];
                        //Split it on line breaks
                        var splitedData = data.split("\n");
                        //Get length to avoid checking it on each loope
                        var length = splitedData.length -1;
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