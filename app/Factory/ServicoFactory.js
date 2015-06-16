'use strict';

var myFactory = angular.module('servicosFactory', []);
myFactory.factory('dataFactory', ['$http', function($http)
    {
        var urlBase='http://localhost:8080/gestao.escalas-0.0.1-SNAPSHOT/';
        var dataFactory={};
        
        dataFactory.getTabelaPrioridade=function(date, id)
        {
        	var request = { method: 'GET', url: urlBase+ "tabelaescalas/"+date +"/" + id };
            return $http(request);
        };
        dataFactory.getEscalas=function(date)
        {
        	var request = { method: 'GET', url: urlBase +"tabelaescalas/"+date};
            return $http(request);
        };

        dataFactory.getTipoServicos=function()
        {
        	var request = { method: 'GET', url: urlBase+ "tiposervico" };
            return $http(request);
        };

        
        return dataFactory;
    }]);

