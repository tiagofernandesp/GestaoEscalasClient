'use strict';

angular.module('App', [
	'ngRoute',
	'appControllers',
	'servicosFactory'
    ])
.config(function ($routeProvider) {
    $routeProvider
    .when('/escalas',
    {
                //templateUrl: 'app/views/teste.html',
                templateUrl: 'app/views/panelEscalas.html',
                controller: 'panelEscalasController'
            })
    .when('/servicos',
    {
                //templateUrl: 'app/views/teste.html',
                templateUrl: 'app/views/servicos.html',
                controller: 'servicosController'
            })
    .otherwise({ redirectTo: '/escalas' });
});


