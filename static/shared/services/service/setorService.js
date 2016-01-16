(function () {

    'use strict';

    //Define o módulo
    angular.module('shared.services.service.setor', [
        'shared.services.factory.appResource'
        ])
        .service('setorService', setorService);

    //Injeta dependencias
    setorService.$inject = ['appResourceFactory'];

    //Cria o serviço
    function setorService(appResourceFactory) {

        var service = appResourceFactory("setor", "intIdSetor");

        return service;
    }
})()