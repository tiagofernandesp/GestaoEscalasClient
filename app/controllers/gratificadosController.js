'use strict';

angular.module('appControllers').controller('gratificadosController',['$scope','$http','$rootScope','dataFactory','$controller','sharedProperties', function($scope,$http,$rootScope,dataFactory,$controller,sharedProperties) {
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
	var formatTime = function(dat)
	{

		var h = dat.getHours();
		var m = dat.getMinutes();

		if(h<10) {
			h='0'+h
		}

		if(m<10) {
			m='0'+m
		}

		dat = h + ":" + m + ":00";
		return dat;
	}
	$scope.changeDate= function(days)
	{
		var size = $scope.dias.length;
		updateChooseDate(addDays(days));
		initializeArrayDays($scope.chooseDate);
		getServiceGratificadoDate($scope.chooseDate);
	}
	$scope.changeWithDate= function(dt)
	{
		updateChooseDate(dt);
		initializeArrayDays(dt);
		getServiceGratificadoDate($scope.chooseDate);
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

	initializeArrayDays($scope.chooseDate);
	$scope.dataGratificados="";
	$scope.dataTipoGratificados="";
	$scope.dataViaturas="";

	function getServiceGratificadoDate(dat){
		dataFactory.getGratificadosByDate(formatDate(dat))
		.success(function (data, status) {
			$scope.dataGratificados = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function getServiceViaturas(){
		dataFactory.getViaturas()
		.success(function (data, status) {
			$scope.dataViaturas = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function getServiceTipoGratificados(){
		dataFactory.getTipoGratificados()
		.success(function (data, status) {
			$scope.dataTipoGratificados = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	getServiceGratificadoDate($scope.chooseDate);
	getServiceViaturas();
	getServiceTipoGratificados();
	$scope.defineGratificado= function(lineId)
	{
		$scope.selectedGratificado=angular.copy($scope.dataGratificados[lineId]);
		for (var i = $scope.dataTipoGratificados.length - 1; i >= 0; i--) {
			if($scope.dataTipoGratificados[i].id==$scope.selectedGratificado.tipoGratificado.id)
			{
				$scope.selectedGratificado.tipoGratificado=$scope.dataTipoGratificados[i];
				i=0;
			}
		};
		for (var i = $scope.dataViaturas.length - 1; i >= 0; i--) {
			if($scope.dataViaturas[i].id==$scope.selectedGratificado.viatura.id)
			{
				$scope.selectedGratificado.viatura=$scope.dataViaturas[i];
				i=0;
			}
		};
		$scope.selectedGratificado.newDataInic="";
		$scope.selectedGratificado.newDataFim="";
		var s = $scope.selectedGratificado.dataInicio + " " + $scope.selectedGratificado.horaInicio;
		var bits = s.split(/\D/);
		$scope.selectedGratificado.newDataInic = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);

		var s = $scope.selectedGratificado.dataFim + " " + $scope.selectedGratificado.horaFim;
		var bits = s.split(/\D/);
		$scope.selectedGratificado.newDataFim = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
	}

	$scope.saveGratificado=function(gratificado){
		$scope.selectedGratificado.dataInicio=formatDate($scope.selectedGratificado.newDataInic);
		$scope.selectedGratificado.horaInicio=formatTime($scope.selectedGratificado.newDataInic);
		$scope.selectedGratificado.dataFim=formatDate($scope.selectedGratificado.newDataFim);
		$scope.selectedGratificado.horaFim=formatTime($scope.selectedGratificado.newDataFim);
		if ($scope.selectedGratificado.id!=null) {
			editGratificado(gratificado);
		}
		else{addGratificado(gratificado)};
	}

	$scope.startNewGratificado=function(){
		$scope.selectedGratificado={};
		$scope.selectedGratificado.newDataInic="";
		$scope.selectedGratificado.newDataFim="";
		$scope.selectedGratificado.newDataInic=angular.copy($scope.chooseDate);
		$scope.selectedGratificado.newDataInic.setHours(0,0,0,0);
		$scope.selectedGratificado.newDataFim=angular.copy($scope.chooseDate);
		$scope.selectedGratificado.newDataFim.setHours(0,0,0,0);
	}

	$scope.removeGratificado = function(){
		deleteGratificado($scope.selectedGratificado);
	}
	function addGratificado(gratificado){
		dataFactory.postGratificado(gratificado)
		.success(function (data, status) {
			getServiceGratificadoDate($scope.chooseDate);
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function editGratificado(gratificado){
		dataFactory.putGratificado(gratificado)
		.success(function (data, status) {
			getServiceGratificadoDate($scope.chooseDate);
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function deleteGratificado(gratificado){
		dataFactory.deleteGratificado(gratificado)
		.success(function (data, status) {
			getServiceGratificadoDate($scope.chooseDate);
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
}]);