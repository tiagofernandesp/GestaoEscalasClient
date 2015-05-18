'use strict';

var myFactory = angular.module('servicosFactory', []);
myFactory.factory('dataFactory', ['$http', function($http)
    {
        var urlBase='http://localhost:8080/gestao.escalas-0.0.1-SNAPSHOT/';
        var urlFinal='http://localhost:8080/gestao.escalas-0.0.1-SNAPSHOT/tabelaescalas/';
        var dataFactory={};

        dataFactory.getEscalas=function(date)
        {
        	var request = { method: 'GET', url: urlFinal +date};
            return $http(request);
        };

        return dataFactory;
    }]);

