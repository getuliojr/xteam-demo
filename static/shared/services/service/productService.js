(function () {

    'use strict';

    //Define the module
    angular.module('shared.services.service.product', [
        'shared.services.factory.appResource'
        ])
        .service('productService', productService);

    //Inject dependencies
    productService.$inject = ['appResourceFactory'];

    //Create the service
    function productService(appResourceFactory) {

        //Create the service, by passing the API resource name and the surrogate key name
        var service = appResourceFactory("products", "id");

        return service;
    }
})()