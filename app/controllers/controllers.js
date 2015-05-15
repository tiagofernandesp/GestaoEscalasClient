'use strict';

var myApp = angular.module('escalasModule',[]);


myApp.controller('ListServicosController',['$scope','$http','$rootScope','dataFactory', function($scope,$http,$rootScope,dataFactory) {

        	dataFactory.getRoles()
	        .success(function (data, status) {
	            $scope.dataa = data;
	        })
	        .error(function (data, status) {
	            alert("Erro aceder Web Service: " + urlFinal + "Status: "+ status);
	        });
 }]);