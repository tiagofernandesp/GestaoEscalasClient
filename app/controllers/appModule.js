'use strict';

angular.module('appControllers',[]);

angular.module('appControllers').controller('servicosController',['$scope','$http','$rootScope','dataFactory', function($scope,$http,$rootScope,dataFactory) {
	$scope.ola="FUNCONA!!";
}]);