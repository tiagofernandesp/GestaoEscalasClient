'use strict';

var myFactory = angular.module('servicosFactory', []);
myFactory.factory('Servicos', function($resource){
    var data = $resource('http://localhost:8080/gestao.escalas-0.0.1-SNAPSHOT/servico/:id', {id: '@id'},
        {getAll:{
            method :'GET'
        }
        });
return data;
});

