(function () {

    'use strict';

     /**
     * @ngdoc overview
     * @name components.productList
     * @description
     *
     * # productList - Component #
     *
     * This module is responsible to get the list of products and list it to the user to buy.
     *
     * @example
       <pre>
        <gr-product-list><gr-product-list />
       </pre>
     */
    angular
        .module('components.productList', [
            'shared.services.service.product'
        ])

        .directive('grProductList', productListDirective)
        .controller('ProductListController', ProductListController);

    //Inject Dependencies
    //productListDirective.$inject = [];

    /**
     * @ngdoc directive
     * @name components.productList.directive:grProductList
     * @restrict 'E'
     *
     * @description
     *
     * This directive will render a list of products available
     *
     */
    function productListDirective() {
        return {
            restrict: 'E',
            controller: 'ProductListController',
            templateUrl: 'components/productList/productList.html',
            controllerAs: 'productList',
            scope: {},
            bindToController: {
            }
        }
    }

    //Inject Dependencies
    ProductListController.$inject = ['$scope', 'productService'];

    /**
     * @ngdoc controller
     * @name components.productList.controller:ProductListController
     * @description
     *
     * It has all the logic for the component productList
     *
     */
    function ProductListController ($scope, productService) {

        var vm = this;

        //config for component: dataList
        vm.config = {
            enableFilter: false,
            enableRowSelection: false,
            columns: [{ field: 'id', isNumeric: true, displayName: 'Id' },
                { field: 'size', isNumeric: false, displayName: 'Size' },
                { field: 'price', isNumeric: true, displayName: 'Price' },
                { field: 'date', isNumeric: false, displayName: 'Date' }
            ]
        };

        init();

        //Init the controller, load inicial data
        function init(){
            productService.load().then(function(data){
                vm.products = data;
            })
        }
    }
})();