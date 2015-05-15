'use strict';

var myFactory = angular.module('servicosFactory', []);
myFactory.factory('dataFactory', ['$http', function($http)
    {
        var urlBase='http://localhost:8080/gestao.escalas-0.0.1-SNAPSHOT/';
        var urlFinal='http://localhost:8080/gestao.escalas-0.0.1-SNAPSHOT/servicopessoa';
        var dataFactory={};
        var request = { method: 'GET', url: urlFinal };

        dataFactory.getRoles=function()
        {
            return $http.get(urlFinal);
            //return 'Ola getRoles';
        };

        return dataFactory;
    }]);

