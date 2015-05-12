var app = angular.module('escalasApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/escalas',
            {
                controller: 'EscalasController',
                templateUrl: 'app/views/panelEscalas.html'
            })
        .otherwise({ redirectTo: '/escalas' });
}]);


