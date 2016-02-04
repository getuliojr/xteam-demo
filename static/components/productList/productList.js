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
     * It will generate the table and control de flow of data and infinite scroll
     *
     * @example
       <pre>
        <gr-product-list page-size="pageSize"><gr-product-list />
       </pre>
     */
    angular
        .module('components.productList', [
            'shared.services.product'
        ])

        .directive('grProductList', productListDirective)
        .controller('ProductListController', ProductListController);


    /**
     * @ngdoc directive
     * @name components.productList.directive:grProductList
     * @restrict 'E'
     *
     * @param {int=} page-size How many records to return each time it goes to the backend. Defaults to 15.
     *
     * @description
     *
     * This directive will render a table with data of the products. It is also responsable to control
     * order by of itens and infinite scroll
     *
     */
    function productListDirective() {
        return {
            restrict: 'E',
            controller: 'ProductListController',
            templateUrl: 'components/productList/productList.html',
            controllerAs: 'productList',
            scope: {},
            bindToController:{
                pageSize: '='
            },

            //Responsable for the infinite-scroll feature
            link: function(scope, element, attrs, controller) {
                //Set visible height of the page, to check scrolling
                var heightDifferenceToGetMoreRecords = 100;

                //To check only on scrolldown, optimizing things
                var previousScroll = 0;

                function checkVisibleHeight() {
                    //Get scroll position TOP for the window
                    var scrollTop = $(window).scrollTop();

                    //User is scrolling down
                    if (scrollTop  > previousScroll) {
                        //Get scroll position BOTTOM for the window
                        var scrollBottom = scrollTop + $(window).height();

                        //Gets height position where element start
                        var elementTop = element.offset().top;

                        //Get height position where element ends
                        var elementBottom = elementTop + element.find('table').outerHeight();

                        var visibleTop = elementTop < scrollTop ? scrollTop : elementTop;

                        //Get element height position where element is (at bottom)
                        var visibleBottom = elementBottom > scrollBottom ? scrollBottom : elementBottom;

                        //If the visible part is near the heightDifference to get more records, call function
                        //to load more
                        if (elementBottom - visibleBottom <= heightDifferenceToGetMoreRecords) {
                            scope.productList.showMore();
                        }
                    }
                    //set its value so we know when the user is scrolling down or up
                    previousScroll = scrollTop;

                }

                //bind scroll function to Element
                element.scroll(checkVisibleHeight);

                //bind scroll function to Window
                $(window).scroll(checkVisibleHeight);

            }
        }
    }

    //Inject Dependencies
    ProductListController.$inject = ['$scope', 'productService'];

    /**
     * @ngdoc controller
     * @name components.productList.controller:ProductListController
     *
     * @requires shared.services.service:product
     *
     * @description
     *
     * It has all the logic for the component productList
     *
     */
    function ProductListController ($scope, productService) {

        //Private vars
        var _skip = 0;
        var _nextBatch;
        var _showMore = false;
        var _sort = ""

        //Public API of the component
        var vm = this;
        vm.showMore = showMore;
        vm.onOrderChange = onOrderChange;
        vm.loading = false;
        vm.existsMoreData = true;

        //init component
        init();

        /**
         * @ngdoc function
         * @name onOrderChange
         * @methodOf components.productList.controller:ProductListController
         * @param {string} orderBy The name of the field to sort the itens
         *
         * @description
         *
         * This is a public function that tells the component that the order of the list has been changed by the user
         * It restart the list with the new values
         */
        function onOrderChange(orderBy){
            //On order change, reset gridsize
            _skip=0;
            vm.products = [];
            //Do not try to get recors on desc order
            _sort = orderBy.replace('-','');
            init();
        }

        /**
         * @ngdoc function
         * @name showMore
         * @methodOf components.productList.controller:ProductListController
         *
         * @description
         *
         * This a public function that tells the component to render a new batch of files.
         */
        function showMore(){
            //Set variable to show more records to the user
            _showMore = true;
            //If data is already available, merge
            if (_nextBatch != undefined){
                mergeRecords();
            }
            return true;
        }

        /**
         * @ngdoc function
         * @name mergeRecords
         * @methodOf components.productList.controller:ProductListController
         *
         * @description
         *
         * This is a private function that is responsible to check if it is required to merge the new batch
         * of products to the current list
         *
         * It also loads a new batch as soon as it merges the data successfully
         */
        function mergeRecords(){
            //If the user has asked to show more records, check if they are available and merge data
            if (_showMore == true){
                //Merge new data in the current list
                vm.products.push.apply( vm.products, _nextBatch);
                //reset the variables
                _showMore = false;
                _nextBatch = undefined;

                //Pre-Loads next batch if there is more
                if (vm.existsMoreData == true) {
                    loadMore();
                }
            }
        }

        /**
         * @ngdoc function
         * @name loadMore
         * @methodOf components.productList.controller:ProductListController
         *
         * @description
         *
         * This is a private function and it is responsable to load a new batch of records.
         * It is not responsible to show in the screen, only load
         */
        function loadMore(){
            //Only tries to load new records once, to avoid hitting the database more than necessary
            if (vm.loading == false){
                //Tell the application that it is already loading next batch
                vm.loading = true;

                //Load next batch
                var params = {limit: vm.pageSize, skip: _skip + vm.pageSize};
                if (!!_sort){
                    params.sort = _sort;
                }
                productService.load(params).then(function(data){
                    //set next values
                    _skip += vm.pageSize;
                    //Tell the application if there is more records available or not
                    if (data.length < vm.pageSize){
                        //end of records
                        vm.existsMoreData = false;
                    }else{
                        //there are more records in the server
                        vm.existsMoreData = true;
                    }
                    //tell the application data is ready
                    _nextBatch = data;
                    vm.loading = false;
                    //Check if merge is required
                    mergeRecords();
                })
            }
        }

        /**
         * @ngdoc function
         * @name init
         * @methodOf components.productList.controller:ProductListController
         *
         * @description
         *
         * This is a private function that is called when the controller is initialized and everytime the orderBy changes
         */
        function init(){
            vm.pageSize = vm.pageSize || 15; //Set default value if not set

            var params = {limit: vm.pageSize, skip: _skip};
            if (!!_sort){
                params.sort = _sort;
            }

            vm.loading = true;
            //First records
            productService.load(params).then(function(data){
                //add data to the list
                vm.products = data;
                vm.loading = false;
                //Load next batch of records after finishing the first
                loadMore();
            });
        }
    }
})();