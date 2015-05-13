'use strict';

var myApp = angular.module('escalasModule',[]);

myApp.controller('ListServicosController', ['$scope', function($scope, Servicos) {
  $scope.nome='Tiago';
  $scope.servicos= Servicos.getAll();
}]);