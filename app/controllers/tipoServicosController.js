'use strict';

angular.module('appControllers').controller('tipoServicosController',['$scope','$http','$rootScope','dataFactory','$controller', function($scope,$http,$rootScope,dataFactory,$controller) {

	$scope.dataTipoServicos="";
	$scope.selectedTipoServico="";

	function getServiceTipoServicos(){
		dataFactory.getTipoServicos()
		.success(function (data, status) {
			$scope.dataTipoServicos = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	getServiceTipoServicos();

	$scope.defineTipoServico= function(lineId)
	{
		$scope.selectedTipoServico=angular.copy($scope.dataTipoServicos[lineId]);
	}

	$scope.saveTipoServico=function(tipoServico){
		if ($scope.selectedTipoServico.id!=null) {
			editTipoServico(tipoServico);
		}
		else{addTipoServico(tipoServico)};
	}

	$scope.startNewTipoServico=function(){
		$scope.selectedTipoServico="";
	}
	$scope.removeTipoServico = function(){
		deleteTipoServico($scope.selectedTipoServico);
	}
	function addTipoServico(tipoServico){
		dataFactory.postTipoServicos(tipoServico)
		.success(function (data, status) {
			getServiceTipoServicos();
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function editTipoServico(tipoServico){
		dataFactory.putTipoServicos(tipoServico)
		.success(function (data, status) {
			getServiceTipoServicos();
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function deleteTipoServico(tipoServico){
		dataFactory.deleteTipoServicos(tipoServico.id)
		.success(function (data, status) {
			getServiceTipoServicos();
		})
		.error(function (data, status) {
			if (status == 500) {
				alert("Impossivel finalizar a operação. Poderá conter serviços que estejam a utilizar o Tipo de Serviço em causa.");
			} else{
				alert("Erro aceder Servidor. " + "Status: "+ status);
			};
			
		});
	}
}]);