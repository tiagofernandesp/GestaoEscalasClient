'use strict';

angular.module('appControllers').controller('categoriasController',['$scope','$http','$rootScope','dataFactory','$controller', function($scope,$http,$rootScope,dataFactory,$controller) {

	$scope.dataCategorias="";
	$scope.selectedCategoria="";

	function getServiceCategorias(){
		dataFactory.getCategorias()
		.success(function (data, status) {
			$scope.dataCategorias = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	getServiceCategorias();

	$scope.defineCategoria= function(lineId)
	{
		$scope.selectedCategoria=angular.copy($scope.dataCategorias[lineId]);
	}

	$scope.saveCategoria=function(categoria){
		if ($scope.selectedCategoria.id!=null) {
			editCategoria(categoria);
		}
		else{addCategoria(categoria)};
		$scope.selectedCategoria={};
	}

	$scope.startNewCategoria=function(){
		$scope.selectedCategoria="";
	}
	$scope.removeCategoria = function(){
		deleteCategoria($scope.selectedCategoria);
	}
	function addCategoria(categoria){
		dataFactory.postCategoria(categoria)
		.success(function (data, status) {
			getServiceCategorias();
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function editCategoria(categoria){
		dataFactory.putCategoria(categoria)
		.success(function (data, status) {
			getServiceCategorias();
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function deleteCategoria(categoria){
		dataFactory.deleteCategoria(categoria.id)
		.success(function (data, status) {
			getServiceCategorias();
			$scope.selectedCategoria={};
		})
		.error(function (data, status) {
			if (status == 500) {
				alert("Impossivel finalizar a operação. Poderá conter pessoas que estejam a utilizar a Categoria em causa.");
			} else{
				alert("Erro aceder Servidor. " + "Status: "+ status);
			};
		});
	}
}]);