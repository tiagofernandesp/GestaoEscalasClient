'use strict';

angular.module('appControllers').controller('panelGratificadosController',['$scope','$http','$rootScope','dataFactory','sharedProperties', function($scope,$http,$rootScope,dataFactory,sharedProperties) {

	
	/*
	* Tabela
	*/
	$scope.chooseDate=sharedProperties.getChooseDate();

	var updateChooseDate  = function(date){
		$scope.chooseDate=date;
		sharedProperties.setChooseDate(date);
	}

	var addDays = function( days)
	{

		var dat = new Date($scope.chooseDate.valueOf());
		dat.setDate(dat.getDate() + days);
		return dat;
	}

	function initializeArrayDays(date){var show = 7;
		$scope.dias = Array();
		for(var i = 0; i< show; i++) {
			$scope.dias.push({data: addDays(i, date)});
		}
	}

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

	function getServiceGratificados(dat){
		dataFactory.getEscalasGratificados(formatDate(dat))
		.success(function (data, status) {
			$scope.dataListaEscalas = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	$scope.changeDate= function(days)
	{
		var size = $scope.dias.length;
		updateChooseDate(addDays(days));
		initializeArrayDays($scope.chooseDate);
		getServiceGratificados($scope.chooseDate);
		getTabelaPrioridadeGratificados();
	}
	$scope.changeWithDate= function(dt)
	{
		var size = $scope.dias.length;
		updateChooseDate(dt);
		initializeArrayDays(dt);
		getServiceGratificados($scope.chooseDate);
		getTabelaPrioridadeGratificados();
	}
	
	$scope.formatDateName = function(dat)
	{
		var weekday = new Array(7);
		weekday[0]=  "Domingo";
		weekday[1] = "Segunda";
		weekday[2] = "Terça";
		weekday[3] = "Quarta";
		weekday[4] = "Quinta";
		weekday[5] = "Sexta";
		weekday[6] = "Sábado";
		return weekday[dat.getDay()];
	}
	getServiceGratificados($scope.chooseDate);
	initializeArrayDays($scope.chooseDate);
	/*
	* Lista Proridades
	*/
	$scope.selectedTipoGratificado="";
	$scope.dataTabelaPrioridade ="";
	$scope.dataTipoGratificados="";

	$scope.updateTipoGratificado = function (){
		getTabelaPrioridadeGratificados();
	}
	function getServiceTipoGratificado(){
		dataFactory.getTipoGratificados()
		.success(function (data, status) {
			$scope.dataTipoGratificados = data;
			if($scope.dataTipoGratificados!="" && $scope.selectedTipoGratificado==""){
				$scope.selectedTipoGratificado = $scope.dataTipoGratificados[0];
				getTabelaPrioridadeGratificados();
			}
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	getServiceTipoGratificado();

	function getTabelaPrioridadeGratificados(){
		dataFactory.getTabelaPrioridadeGratificados(formatDate($scope.chooseDate),$scope.selectedTipoGratificado.id)
		.success(function (data, status) {
			$scope.dataTabelaPrioridade = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	
	/*
	* Modal
	*/

	function getServiceGratificadoDate(dat){
		dataFactory.getGratificadosByDate(formatDate(dat))
		.success(function (data, status) {
			$scope.dataGratificado = data;
			for (var i = $scope.dataGratificado.length - 1; i >= 0; i--) {
				if ($scope.selectedGratificadoId==$scope.dataGratificado[i].id) {$scope.selectedGratificado=$scope.dataGratificado[i]};
			};
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	$scope.dataGratificado="";
	$scope.selectedGratificado="";
	$scope.selectedPerson="";
	$scope.selectedGratificadoId="";
	$scope.selectedDate="";
	$scope.selectedGratificadoPessoaId="";
	$scope.updateModal = function(nDays,linePerson){
		$scope.selectedGratificado="";
		$scope.selectedGratificadoId="";
		$scope.selectedGratificadoPessoaId="";
		$scope.selectedDate=addDays(nDays);
		getServiceGratificadoDate($scope.selectedDate);
		$scope.selectedPerson=$scope.dataListaEscalas[linePerson];
		if($scope.dataListaEscalas[linePerson].escalas[nDays].gratificado!=null){
			$scope.selectedGratificadoId=$scope.dataListaEscalas[linePerson].escalas[nDays].gratificado.id;
			$scope.selectedGratificadoPessoaId=$scope.dataListaEscalas[linePerson].escalas[nDays].id;
		}
	}
	function postGratificadoPessoa (objGratificadoPessoa){
		dataFactory.postGratificadoPessoa(objGratificadoPessoa)
		.success(function (data, status) {
			getServiceGratificados($scope.chooseDate);
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function putGratificadoPessoa (objGratificadoPessoa){
		dataFactory.putGratificadoPessoa(objGratificadoPessoa)
		.success(function (data, status) {
			getServiceGratificados($scope.chooseDate);
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	$scope.saveGratificadoPessoa = function(){
		var objGratificadoPessoa = 
		{
			"id":$scope.selectedGratificadoPessoaId,
			"gratificado":{"id":$scope.selectedGratificado.id},
			"pessoa":{"id":$scope.selectedPerson.pessoa.id},
			"erro":"",
			"data":$scope.selectedDate,
			"status":1
		};
		if(objGratificadoPessoa.id==""){
			postGratificadoPessoa (objGratificadoPessoa);
		}
		else{
			putGratificadoPessoa (objGratificadoPessoa);
		}
	}
}]);