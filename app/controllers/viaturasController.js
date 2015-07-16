'use strict';

angular.module('appControllers').controller('viaturasController',['$scope','$http','$rootScope','dataFactory','$controller', function($scope,$http,$rootScope,dataFactory,$controller) {

	$scope.dataViaturas="";
	$scope.selectedViatura="";

	function getServiceViaturas(){
		dataFactory.getViaturas()
		.success(function (data, status) {
			$scope.dataViaturas = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	getServiceViaturas();

	$scope.defineViatura= function(lineId)
	{
		$scope.selectedViatura=angular.copy($scope.dataViaturas[lineId]);
	}

	$scope.saveViatura=function(viatura){
		if ($scope.selectedViatura.id!=null) {
			editViatura(viatura);
		}
		else{addViatura(viatura)};
		$scope.selectedViatura={};
	}

	$scope.startNewViatura=function(){
		$scope.selectedViatura="";
	}
	$scope.removeViatura = function(){
		deleteViatura($scope.selectedViatura);
	}
	function addViatura(viatura){
		dataFactory.postViatura(viatura)
		.success(function (data, status) {
			getServiceViaturas();
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function editViatura(viatura){
		dataFactory.putViatura(viatura)
		.success(function (data, status) {
			getServiceViaturas();
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function deleteViatura(viatura){
		dataFactory.deleteViatura(viatura.id)
		.success(function (data, status) {
			getServiceViaturas();
			$scope.selectedViatura={};
		})
		.error(function (data, status) {
			if (status == 500) {
				alert("Impossivel finalizar a operação. Poderá conter serviços ou gratificados que estejam a utilizar a Viatura em causa.");
			} else{
				alert("Erro aceder Servidor. " + "Status: "+ status);
			};
		});
	}
}]);