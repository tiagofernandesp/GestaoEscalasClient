'use strict';

var myFactory = angular.module('servicosFactory', []);
myFactory.factory('dataFactory', ['$http', function($http)
    {
        //var urlBase='http://localhost:8080/gestao.escalas-0.0.1-SNAPSHOT/';
        var urlBase='http://localhost:8080/gestao.escalas/';
        var dataFactory={};

        /*Servico Pessoa*/
        dataFactory.postServicoPessoa=function(servicoPessoa)
        {
        	var request = { method: 'POST', url: urlBase+ "servicopessoa", data: servicoPessoa ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.putServicoPessoa=function(servicoPessoa)
        {
        	var request = { method: 'PUT', url: urlBase+ "servicopessoa", data: servicoPessoa ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };

        /*Tabela Escalas*/
        dataFactory.getTabelaPrioridade=function(date, id)
        {
        	var request = { method: 'GET', url: urlBase+ "tabelaescalas/"+date +"/" + id ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.getEscalas=function(date)
        {
            var request = { method: 'GET', url: urlBase +"tabelaescalas/"+date ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };

        /*Servicos*/
        dataFactory.getServicosByDate=function(date)
        {
        	var request = { method: 'GET', url: urlBase+ "servico/date/"+date ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.putServico=function(servico)
        {
            var request = { method: 'PUT', url: urlBase+ "servico", data: servico ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.postServico=function(servico)
        {
            var request = { method: 'POST', url: urlBase+ "servico", data: servico ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.deleteServico=function(servico)
        {
            var request = { method: 'DELETE', url: urlBase+ "servico", data: servico ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };

        /*Categorias*/
        dataFactory.getCategorias=function()
        {
            var request = { method: 'GET', url: urlBase+ "categoria" ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };

        /*Pessoas*/
        dataFactory.getPessoas=function()
        {
            var request = { method: 'GET', url: urlBase+ "pessoa" ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.putPessoa=function(pessoa)
        {
            var request = { method: 'PUT', url: urlBase+ "pessoa", data: pessoa ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.postPessoa=function(pessoa)
        {
            var request = { method: 'POST', url: urlBase+ "pessoa", data: pessoa ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.deletePessoa=function(pessoa)
        {
            var request = { method: 'DELETE', url: urlBase+ "pessoa", data: pessoa ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };

        /*Tipo Servico*/
        dataFactory.getTipoServicos=function()
        {
        	var request = { method: 'GET', url: urlBase+ "tiposervico" ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };

        /*Viaturas*/
        dataFactory.getViaturas=function()
        {
            var request = { method: 'GET', url: urlBase+ "viatura" ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };

        /*HabilitaServicos*/
        dataFactory.getHabilitaServicosByPessoaId=function(id)
        {
            var request = { method: 'GET', url: urlBase+ "habilitaservico/pessoa/" + id ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.updateHabilitaServicosByPessoaId=function(id,lista)
        {
            var request = { method: 'PUT', url: urlBase+ "habilitaservico/pessoa/" + id , data: lista ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };


        return dataFactory;
    }]);

