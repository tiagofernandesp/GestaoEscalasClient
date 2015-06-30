'use strict';

angular.module('appControllers').controller('pessoasController',['$scope','$http','$rootScope','dataFactory','$controller', function($scope,$http,$rootScope,dataFactory,$controller) {
	$scope.dataPessoas="";
	$scope.dataCategorias="";
	var formatDate = function(dat)
	{

		var dd = dat.getDate();
		var mm = dat.getMonth()+1; //January is 0!
		var yyyy = dat.getFullYear();

		if(dd<10) {
			dd='0'+dd
		}

		if(mm<10) {
			mm='0'+mm
		}

		dat = yyyy+'-'+mm+'-'+dd;
		return dat;
	}
	function getPessoas(){
		dataFactory.getPessoas()
		.success(function (data, status) {
			$scope.dataPessoas=data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function getCategoria(){
		dataFactory.getCategorias()
		.success(function (data, status) {
			$scope.dataCategorias=data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	getPessoas();
	getCategoria();
	$scope.definePessoa= function(lineId)
	{
		$scope.selectedPessoa=angular.copy($scope.dataPessoas[lineId]);
		for (var i = $scope.dataCategorias.length - 1; i >= 0; i--) {
			if($scope.dataCategorias[i].id==$scope.selectedPessoa.categoria.id)
			{
				$scope.selectedPessoa.categoria=$scope.dataCategorias[i];
				i=0;
			}
		};
		$scope.selectedPessoa.newDataIngresso="";
		$scope.selectedPessoa.newDataIngresso = new Date($scope.selectedPessoa.dataIngresso);
	}

	$scope.savePessoa=function(pessoa){
		$scope.selectedPessoa.dataIngresso = formatDate($scope.selectedPessoa.newDataIngresso);
		if ($scope.selectedPessoa.id!=null) {
			editPessoa(pessoa);
		}
		else{addPessoa(pessoa)};
	}

	$scope.startNewPessoa=function(){
		$scope.selectedPessoa="";
	}

	$scope.removePessoa = function(){
		deletePessoa($scope.selectedPessoa.id);
	}

	function addPessoa(pessoa){
		dataFactory.postPessoa(pessoa)
		.success(function (data, status) {
			getPessoas();
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function editPessoa(pessoa){
		dataFactory.putPessoa(pessoa)
		.success(function (data, status) {
			getPessoas();
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function deletePessoa(pessoa){
		dataFactory.deletePessoa(pessoa)
		.success(function (data, status) {
			getPessoas();
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	$scope.userTipoServicos="";
	function getHServicoByPessoa_Id(id){
		dataFactory.getHabilitaServicosByPessoaId(id)
		.success(function (data, status) {
			$scope.userTipoServicos=data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	$scope.allTipoServicos="";
	function getTipoServicos(){
		dataFactory.getTipoServicos()
		.success(function (data, status) {
			$scope.allTipoServicos=data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}

	function updateHServicoByPessoa_Id(id, lista){
		dataFactory.updateHabilitaServicosByPessoaId(id, lista)
		.success(function (data, status) {
			$scope.dataHabilitaServicos=data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	$scope.getServiceHSByPerson = function(lineId){
		$scope.selectedPessoa=angular.copy($scope.dataPessoas[lineId]);
		$scope.allTipoServicos="";
		$scope.userTipoServicos="";
		getHServicoByPessoa_Id($scope.selectedPessoa.id);
		getTipoServicos();
	}
	$scope.updateServiceHSByPerson = function(){
		updateHServicoByPessoa_Id($scope.selectedPessoa.id,$scope.userTipoServicos);
	}
	$scope.checkAll = function() {
	$scope.userTipoServicos="";
    $scope.userTipoServicos = angular.copy($scope.allTipoServicos);
  };
}]);