'use strict';

angular.module('App', [
	'ngRoute',
	'escalasModule',
	'servicosFactory'
])
.config(function ($routeProvider) {
    $routeProvider
        .when('/escalas',
            {
                templateUrl: 'app/views/teste.html',
                controller: 'ListServicosController'
            })
        .otherwise({ redirectTo: '/escalas' });
});


