'use strict';

var myApp = angular.module('escalasModule',[]);


myApp.controller('ListServicosController',['$scope','$http','$rootScope','dataFactory', function($scope,$http,$rootScope,dataFactory) {
     $scope.nome ='Tiago';


     var urlFinal='http://localhost:8080/gestao.escalas-0.0.1-SNAPSHOT/tiposervico';
     var request = { method: 'GET', url: urlFinal };

        	dataFactory.getRoles()
	        .success(function (data, status) {
	            $scope.dataa = data;
	        })
	        .error(function (data, status) {
	            alert("Erro aceder Web Service: " + urlFinal + "Status: "+ status);
	        });
 }]);