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
                templateUrl: 'app/views/panelEscalas.html',
                controller: 'panelEscalasController'
            })
    .when('/servicos',
    {
                templateUrl: 'app/views/servicos.html',
                controller: 'servicosController'
            })
    .when('/escalasgratificados',
    {
                templateUrl: 'app/views/panelEscalasGratificados.html',
                controller: 'panelGratificadosController'
            })
    .when('/gratificados',
    {
                templateUrl: 'app/views/gratificados.html',
                controller: 'gratificadosController'
            })
    .when('/pessoas',
    {
                templateUrl: 'app/views/pessoas.html',
                controller: 'pessoasController'
            })
    .when('/tiposervicos',
    {
                templateUrl: 'app/views/tiposervicos.html',
                controller: 'tipoServicosController'
            })
    .when('/tipogratificados',
    {
                templateUrl: 'app/views/tipogratificados.html',
                controller: 'tipoGratificadosController'
            })
    .when('/viaturas',
    {
                templateUrl: 'app/views/viaturas.html',
                controller: 'viaturasController'
            })
    .when('/categorias',
    {
                templateUrl: 'app/views/categorias.html',
                controller: 'categoriasController'
            })
    .when('/printservicos',
    {
                templateUrl: 'app/views/printServicos.html',
                controller: 'printServicosController'
            })
    .otherwise({ redirectTo: '/escalas' });
});


