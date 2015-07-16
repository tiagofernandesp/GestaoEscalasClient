'use strict';

angular.module('appControllers').controller('printServicosController',['$scope','$http','$rootScope','dataFactory','$controller','sharedProperties', function($scope,$http,$rootScope,dataFactory,$controller,sharedProperties) {

	$scope.nomeComandante="";
	$scope.nota="";
	$scope.chooseDate=sharedProperties.getChooseDate();

	var updateChooseDate  = function(date){
		$scope.chooseDate=date;
		sharedProperties.setChooseDate(date);
	}

	$scope.printPDF = function(){
		html2canvas(document.querySelector("#content"), {
			onrendered: function(canvas) {
				var imgData = canvas.toDataURL('image/jpeg');
				var doc = new jsPDF('p', 'mm');
				doc.addImage(imgData, 'JPEG', 0, 0);
				doc.save(formatDate($scope.chooseDate)+'.pdf');
			}
		});
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
		getServiceServicoDate($scope.chooseDate);
		getServiceServicoPessoaByDate($scope.chooseDate);
	}
	$scope.changeWithDate= function(dt)
	{
		var size = $scope.dias.length;
		updateChooseDate(dt);
		initializeArrayDays(dt);
		getServiceServicoDate($scope.chooseDate);
		getServiceServicoPessoaByDate($scope.chooseDate);
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
	$scope.getNumberDay = function(dat)
	{
		return dat.getDate();
	}
	$scope.getNumberYear = function(dat)
	{
		return dat.getFullYear();
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

	$scope.formatDateNameMonth = function(dat)
	{
		var months = new Array(12);
		months[0]=  "Janeiro";
		months[1] = "Fevereiro";
		months[2] = "Março";
		months[3] = "Abril";
		months[4] = "Maio";
		months[5] = "Junho";
		months[6] = "Julho";
		months[7] = "Agosto";
		months[8] = "Setembro";
		months[9] = "Outobro";
		months[10] = "Novembro";
		months[11] = "Dezembro";
		return months[dat.getMonth()];
	}

	initializeArrayDays($scope.chooseDate);

	$scope.dataServicos="";
	$scope.dataTipoServicos="";
	$scope.dataServicosPessoa="";

	function getServiceServicoPessoaByDate(dat){
		dataFactory.getServicosPessoaByDate(formatDate(dat))
		.success(function (data, status) {
			$scope.dataServicosPessoa = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Servidor. " + "Status: "+ status);
		});
	}
	function getServiceServicoDate(dat){
		dataFactory.getServicosByDate(formatDate(dat))
		.success(function (data, status) {
			$scope.dataServicos = data;
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
	getServiceTipoServicos();
	getServiceServicoPessoaByDate($scope.chooseDate);

}]);