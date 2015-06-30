'use strict';

angular.module('App', [
	'ngRoute',
	'appControllers',
	'servicosFactory',
    'checklist-model'
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
    .when('/pessoas',
    {
                //templateUrl: 'app/views/teste.html',
                templateUrl: 'app/views/pessoas.html',
                controller: 'pessoasController'
            })
    .otherwise({ redirectTo: '/escalas' });
});


