'use strict';

var myApp = angular.module('escalasModule',[]);


myApp.controller('ListServicosController',['$scope','$http','$rootScope','dataFactory', function($scope,$http,$rootScope,dataFactory) {

	var chooseDate = new Date();
	$scope.chooseDate = chooseDate;


	var addDays = function( days , chooseDate)
	{

		var dat = new Date(chooseDate.valueOf());
		dat.setDate(dat.getDate() + days);
		return dat;
	}


	var show = 7;
	$scope.dias = Array();
	for(var i = 0; i< show; i++) {
		$scope.dias.push({data: addDays(i, chooseDate)});
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
			$scope.dataa = data;
		})
		.error(function (data, status) {
			alert("Erro aceder Web Service: " + urlFinal + "Status: "+ status);
		});
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
		getServiceEscalas($scope.chooseDate);
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
	//inicializa lista
	getServiceEscalas(chooseDate);
}]);