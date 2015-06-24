'use strict';

angular.module('appControllers').controller('servicosController',['$scope','$http','$rootScope','dataFactory','$controller', function($scope,$http,$rootScope,dataFactory,$controller) {
/*
	* Tabela
	*/
	var today = new Date();
	$scope.chooseDate = today;

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
		$scope.chooseDate = addDays(days, $scope.chooseDate);
		if(days === -1) {
			$scope.dias.unshift({data: addDays(days, $scope.dias[0].data)});
			$scope.dias.pop();
		} else {
			$scope.dias.push({data: addDays(days, $scope.dias[size-1].data)});	
			$scope.dias.shift();
		}
		getServiceServicoDate($scope.chooseDate);
	}
	$scope.changeWithDate= function(dt)
	{
		var size = $scope.dias.length;
		$scope.chooseDate = dt;
		initializeArrayDays(dt);
		getServiceServicoDate($scope.chooseDate);
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
	$scope.dataServicos="";
	$scope.dataTipoServicos="";
	$scope.dataViaturas="";

	function getServiceServicoDate(dat){
		dataFactory.getServicosByDate(formatDate(dat))
		.success(function (data, status) {
			$scope.dataServicos = data;
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
	function getServiceTipoServicos(){
		dataFactory.getTipoServicos()
		.success(function (data, status) {
			$scope.dataTipoServicos = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	getServiceServicoDate($scope.chooseDate);
	getServiceViaturas();
	getServiceTipoServicos();
	$scope.defineServico= function(lineId)
	{
		$scope.selectedServico=angular.copy($scope.dataServicos[lineId]);
		for (var i = $scope.dataTipoServicos.length - 1; i >= 0; i--) {
			if($scope.dataTipoServicos[i].id==$scope.selectedServico.tipoServico.id)
			{
				$scope.selectedServico.tipoServico=$scope.dataTipoServicos[i];
				i=0;
			}
		};
		for (var i = $scope.dataViaturas.length - 1; i >= 0; i--) {
			if($scope.dataViaturas[i].id==$scope.selectedServico.viatura.id)
			{
				$scope.selectedServico.viatura=$scope.dataViaturas[i];
				i=0;
			}
		};
		$scope.selectedServico.newDataInic="";
		$scope.selectedServico.newDataFim="";
		var s = $scope.selectedServico.dataInicio + " " + $scope.selectedServico.horaInicio;
		var bits = s.split(/\D/);
		$scope.selectedServico.newDataInic = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);

		var s = $scope.selectedServico.dataFim + " " + $scope.selectedServico.horaFim;
		var bits = s.split(/\D/);
		$scope.selectedServico.newDataFim = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
	}

	$scope.saveServico=function(servico){
		if ($scope.selectedServico.id!=null) {
			editServico(servico);
		}
		else{addServico(servico)};
	}

	$scope.startNewServico=function(){
		$scope.selectedServico={data:''};
	}
	$scope.updateDateIniFim=function(){
		$scope.selectedServico.newDataInic="";
		$scope.selectedServico.newDataFim="";
		$scope.selectedServico.newDataInic=angular.copy($scope.chooseDate);
		$scope.selectedServico.newDataInic.setHours(0,0,0,0);
		$scope.selectedServico.newDataFim=angular.copy($scope.chooseDate);
		$scope.selectedServico.newDataFim.setHours(0,0,0,0);
		$scope.selectedServico.newDataInic.setSeconds(60*60*$scope.selectedServico.tipoServico.horaInicio);
		$scope.selectedServico.newDataFim.setSeconds(60*60*$scope.selectedServico.tipoServico.horaFim);
		$scope.selectedServico.dataInicio=formatDate($scope.selectedServico.newDataInic);
		$scope.selectedServico.horaInicio=formatTime($scope.selectedServico.newDataInic);
		$scope.selectedServico.dataFim=formatDate($scope.selectedServico.newDataFim);
		$scope.selectedServico.horaFim=formatTime($scope.selectedServico.newDataFim);
		$scope.selectedServico.data=formatDate($scope.chooseDate);
	}
	$scope.removeServico = function(){
		deleteServico($scope.selectedServico);
	}
	function addServico(servico){
		dataFactory.postServico(servico)
		.success(function (data, status) {
			getServiceServicoDate($scope.chooseDate);
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function editServico(servico){
		dataFactory.putServico(servico)
		.success(function (data, status) {
			getServiceServicoDate($scope.chooseDate);
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function deleteServico(servico){
		dataFactory.deleteServico(servico)
		.success(function (data, status) {
			getServiceServicoDate($scope.chooseDate);
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
}]);