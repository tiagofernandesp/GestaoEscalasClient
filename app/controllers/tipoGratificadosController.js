'use strict';

angular.module('appControllers').controller('tipoGratificadosController',['$scope','$http','$rootScope','dataFactory','$controller', function($scope,$http,$rootScope,dataFactory,$controller) {

	$scope.dataTipoGratificados="";
	$scope.selectedTipoGratificado="";

	function getServiceTipoGratificados(){
		dataFactory.getTipoGratificados()
		.success(function (data, status) {
			$scope.dataTipoGratificados = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	getServiceTipoGratificados();

	$scope.defineTipoGratificado= function(lineId)
	{
		$scope.selectedTipoGratificado=angular.copy($scope.dataTipoGratificados[lineId]);
	}

	$scope.saveTipoGratificado=function(tipoGratificado){
		if ($scope.selectedTipoGratificado.id!=null) {
			editTipoGratificado(tipoGratificado);
		}
		else{addTipoGratificado(tipoGratificado)};
		$scope.selectedTipoGratificado={};
	}

	$scope.startNewTipoGratificado=function(){
		$scope.selectedTipoGratificado="";
	}
	$scope.removeTipoGratificado = function(){
		deleteTipoGratificado($scope.selectedTipoGratificado);
	}
	function addTipoGratificado(tipoGratificado){
		dataFactory.postTipoGratificado(tipoGratificado)
		.success(function (data, status) {
			getServiceTipoGratificados();
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function editTipoGratificado(tipoGratificado){
		dataFactory.putTipoGratificado(tipoGratificado)
		.success(function (data, status) {
			getServiceTipoGratificados();
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function deleteTipoGratificado(tipoGratificado){
		dataFactory.deleteTipoGratificado(tipoGratificado.id)
		.success(function (data, status) {
			getServiceTipoGratificados();
			$scope.selectedTipoGratificado={};
		})
		.error(function (data, status) {
			if (status == 500) {
				alert("Impossivel finalizar a operação. Poderá conter gratificados que estejam a utilizar a TipoGratificado em causa.");
			} else{
				alert("Erro aceder Servidor. " + "Status: "+ status);
			};
		});
	}
}]);