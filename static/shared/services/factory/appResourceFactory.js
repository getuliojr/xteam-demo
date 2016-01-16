(function () {

    'use strict';

    angular.module('shared.services.factory.appResource', [
    ])

    .factory('appResourceFactory', appResourceFactory);

    //Injeta dependencias
    appResourceFactory.$inject = ['$resource', '$q', '$rootScope', '$httpBackend', 'constEventosDb',  'mediatorService', 'hubService'];

    function appResourceFactory($resource, $q, $rootScope, $httpBackend, constEventosDb,  mediatorService, hubService) {

        //Variáveis Privadas
        var _cache = {};
        var baseUrl = "api/";

        return function (recurso, surrogateKey) {

            //Definição das variaveis
            var service = {};

            var webService = createResource(recurso);

            //Api Pública
            service.load = load;            //Carregar dados de um ou mais registros
            service.clearCache = clearCache;      //Remove qualquer registro do cache
            return service;



            //Funções

            //Load New Data
            //Optional Accepted Params:
            //applyScope : true             //It will force an applyScope after the item has been loaded and processed
            //loadOne    : true             //It will force a request to return a single record, even if it has no surrogateKey
            //action     : value            //To instantiate a specific action in a resource
            function load(params) {
                var deferred = $q.defer();
                var queryParams = _parseParams(params);

                if (queryParams.hasOwnProperty("loadOne")) {
                    //Passou a chave primária, então carrega apenas um registro

                    webService.get(queryParams).$promise.then(function (data) {
                        deferred.resolve(data);
                    }, function (err) {
                        deferred.reject(err);
                    });
                } else {
                    //Não foi passado a chave primária, então efetua uma busca por todos os parâmetros (Pesquisar)
                    webService.getAll(queryParams).then(function (data) {
                        deferred.resolve(data);
                    }, function (err) {
                        deferred.reject(err);
                    });
                }


                return deferred.promise;
            };


            //Clear any cache an resource might have
            function clearCache() {
                return webService.clearCache();
            };


            //***************************
            // Funções auxiliares
            //***************************

            function createResource(recurso) {

                //$resource(url[, paramDefaults][, actions]);
                //{action1: {method:?, params:?, isArray:?},
                //- `action` – {string} – The name of action. This name becomes the name of the method on your resource object.
                //- `method` – {string} – HTTP request method. Valid methods are: `GET`, `POST`, `PUT`, `DELETE`, and `JSONP`
                //- `params` – {object=} – Optional set of pre-bound parameters for this action.
                //- isArray – {boolean=} – If true then the returned object for this action is an array
                var resource = $resource(baseUrl + recurso + '/:action/:id',
                        {}, {
                            update: { method: 'PUT', params: { id: '@id' } }
                              , save: { method: 'POST' }
                              , remove: { method: 'DELETE', params: { id: '@id' } }
                              , get: { method: 'GET', params: { id: '@id' } }
                              , query: { method: 'GET', isArray: true }
                        });

                //Responsavel por limpar o cache do recurso em questao
                resource.clearCache = function () {
                    var key = 'api/' + recurso;
                    for (var c in _cache) {
                        if (c.indexOf(key) > -1)
                            delete _cache[c];
                    }
                }

                //Retorna um Array com DADOS, opção para manter em cache
                resource.getAll = function (params) {

                    var deferred = $q.defer(); //Cria uma promessa

                    //Se solicitou que seja feito um cache, chama o método para resolver o mesmo
                    if (params && params["cache"] !== undefined && params["cache"] === true) {
                        var key = 'api/' + recurso;

                        //Se algum outro parâmetro fora o cache foi passado, reconstroi a chamada
                        for (var p in params) {
                            if (Object.prototype.toString.call(params[p]) === '[object Array]') {
                                //Transforma arrays em strings com virgula
                                var fixedCollection = "";
                                for (var arvalue = 0; arvalue < params[p].length; arvalue++) {
                                    if (arvalue > 0)
                                        fixedCollection += ",";
                                    fixedCollection += params[p][arvalue];
                                }
                                params[p] = fixedCollection;
                            }
                            if (p !== "cache") {
                                key += "&" + p + "=" + params[p];
                            }
                        }

                        if (_cache[key]) { //Se existe em cache, retorna o resultado
                            deferred.resolve(_cache[key]);
                            return deferred.promise;
                        }
                    }

                    //Se chegou aqui não está em cache, busca os dados
                    resource.query(params).$promise.then(function (result) {
                        if (key) {
                            _cache[key] = result; //Salva em cache
                        }
                        deferred.resolve(result); //Envia para o usuario
                    }, function (err) {
                        deferred.reject(err);
                    });

                    
                    //Retorna promessa
                    return deferred.promise;
                }

                return resource;
            }

            //Remove all undefined, null, empty values and functions
            //parse data do be in ISO format
            function _parseParams(params) {
                var parsedParams = {}
                for (var i in params) {
                    if ((params[i] !== undefined) && (params[i] !== "") && (typeof (params[i]) != 'function')) {
                        if (angular.isDate(params[i])) {
                            parsedParams[i] = new Date(params[i] - (params[i].getTimezoneOffset() * 60 * 1000)).toISOString();
                        } else {
                            parsedParams[i] = params[i];
                        }
                    }
                }

                delete parsedParams.viewInfo; //Informações de ViewState
                return parsedParams;

            }

        }

    }

})();
    

