'use strict';

angular.module('appControllers').controller('panelEscalasController',['$scope','$http','$rootScope','dataFactory','sharedProperties', function($scope,$http,$rootScope,dataFactory,sharedProperties) {
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
	function getServiceEscalas(dat){
		dataFactory.getEscalas(formatDate(dat))
		.success(function (data, status) {
			$scope.dataListaEscalas = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function getTabelaServicosMinimos(dat){
		dataFactory.getTabelaServicosMinimos(formatDate(dat))
		.success(function (data, status) {
			$scope.dataListaServicosMinimos = data;
			constructStringWarning();
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
		getServiceEscalas($scope.chooseDate);
		getTabelaServicosMinimos($scope.chooseDate);
		getTabelaPrioridade();
	}
	$scope.changeWithDate= function(dt)
	{
		updateChooseDate(dt);
		initializeArrayDays(dt);
		getServiceEscalas($scope.chooseDate);
		getTabelaServicosMinimos($scope.chooseDate);
		getTabelaPrioridade();
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

	getServiceEscalas($scope.chooseDate);
	getTabelaServicosMinimos($scope.chooseDate);
	initializeArrayDays($scope.chooseDate);
	function constructStringWarning(){
		var str = "";
		$scope.stringWarning = new Array(7);
		var lenLin = $scope.dataListaServicosMinimos.length;
		for(var i=0;i<lenLin;i++){
			$scope.stringWarning[i] = "";
			var lenCol = $scope.dataListaServicosMinimos[i].length;
			for(var j=0;j<lenCol;j++){
				$scope.stringWarning[i] = $scope.stringWarning[i] + $scope.dataListaServicosMinimos[i][j].nome;
				if(j+1!=lenCol){
					$scope.stringWarning[i] = $scope.stringWarning[i] + ", ";
				}
				else{
					$scope.stringWarning[i] = $scope.stringWarning[i] + ".";
				}
			}
		}
	}
	/*
	* Lista Proridades
	*/
	$scope.selectedTipoServico="";
	$scope.dataTabelaPrioridade ="";
	$scope.dataTipoServicos="";

	$scope.updateTipoServico = function (){
		getTabelaPrioridade();
	}
	function getServiceTipoServicos(){
		dataFactory.getTipoServicos()
		.success(function (data, status) {
			$scope.dataTipoServicos = data;
			if($scope.dataTipoServicos!="" && $scope.selectedTipoServico==""){
				$scope.selectedTipoServico = $scope.dataTipoServicos[0];
				getTabelaPrioridade();
			}
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	getServiceTipoServicos();

	function getTabelaPrioridade(){
		dataFactory.getTabelaPrioridade(formatDate($scope.chooseDate),$scope.selectedTipoServico.id)
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

	function getServiceServicoDate(dat){
		dataFactory.getServicosByDate(formatDate(dat))
		.success(function (data, status) {
			$scope.dataServicos = data;
			for (var i = $scope.dataServicos.length - 1; i >= 0; i--) {
				if ($scope.selectedServicoId==$scope.dataServicos[i].id) {$scope.selectedServico=$scope.dataServicos[i]};
			};
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	$scope.dataServicos="";
	$scope.selectedServico="";
	$scope.selectedPerson="";
	$scope.selectedServicoId="";
	$scope.selectedDate="";
	$scope.selectedServicoPessoa="";
	$scope.updateModal = function(nDays,linePerson){
		$scope.selectedServico="";
		$scope.selectedServicoId="";
		$scope.selectedServicoPessoa="";
		$scope.selectedDate=addDays(nDays);
		getServiceServicoDate($scope.selectedDate);
		$scope.selectedPerson=$scope.dataListaEscalas[linePerson];
		if($scope.dataListaEscalas[linePerson].escalas[nDays].servico!=null){
			$scope.selectedServicoId=$scope.dataListaEscalas[linePerson].escalas[nDays].servico.id;
			$scope.selectedServicoPessoa=$scope.dataListaEscalas[linePerson].escalas[nDays];
		}
	}
	function postServicoPessoa (objServicoPessoa){
		dataFactory.postServicoPessoa(objServicoPessoa)
		.success(function (data, status) {
			getServiceEscalas($scope.chooseDate);
			getTabelaServicosMinimos($scope.chooseDate);
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function putServicoPessoa (objServicoPessoa){
		dataFactory.putServicoPessoa(objServicoPessoa)
		.success(function (data, status) {
			getServiceEscalas($scope.chooseDate);
			getTabelaServicosMinimos($scope.chooseDate);
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	$scope.saveServicoPessoa = function(){
		var objServicoPessoa = 
		{
			"id":$scope.selectedServicoPessoa.id,
			"servico":{"id":$scope.selectedServico.id},
			"pessoa":{"id":$scope.selectedPerson.pessoa.id},
			"erro":"",
			"data":$scope.selectedDate,
			"status":1
		};
		if(objServicoPessoa.id>=0){
			putServicoPessoa (objServicoPessoa);
		}
		else{
			postServicoPessoa (objServicoPessoa);
		}
	}
}]);