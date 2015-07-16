'use strict';

var myFactory = angular.module('servicosFactory', []);
myFactory.factory('dataFactory', ['$http', function($http)
    {
        //var urlBase='http://localhost:8080/gestao.escalas-0.0.1-SNAPSHOT/';
        var urlBase='http://localhost:8080/gestao.escalas/';
        var dataFactory={};

        /*Servico Pessoa*/
        dataFactory.getServicosPessoaByDate=function(dat)
        {
            var request = { method: 'GET', url: urlBase+ "servicopessoa/date/"+dat, headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
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

        /*Gratificado Pessoa*/
        dataFactory.postGratificadoPessoa=function(gratificadoPessoa)
        {
            var request = { method: 'POST', url: urlBase+ "gratificadopessoa", data: gratificadoPessoa ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.putGratificadoPessoa=function(gratificadoPessoa)
        {
            var request = { method: 'PUT', url: urlBase+ "gratificadopessoa", data: gratificadoPessoa ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };

        /*Tabela Escalas*/
        dataFactory.getTabelaPrioridade=function(date, id)
        {
        	var request = { method: 'GET', url: urlBase+ "tabelaescalas/"+date +"/" + id ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.getTabelaServicosMinimos=function(date)
        {
            var request = { method: 'GET', url: urlBase+ "tabelaescalas/sminimo/"+date  ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.getEscalas=function(date)
        {
            var request = { method: 'GET', url: urlBase +"tabelaescalas/"+date ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.getTabelaPrioridadeGratificados=function(date, id)
        {
            var request = { method: 'GET', url: urlBase+ "tabelaescalas/gratificado/"+date +"/" + id ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.getEscalasGratificados=function(date)
        {
            var request = { method: 'GET', url: urlBase +"tabelaescalas/gratificado/"+date ,headers: {'Content-Type': 'application/json'}};
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

        /*Gratificados*/
        dataFactory.getGratificadosByDate=function(date)
        {
            var request = { method: 'GET', url: urlBase+ "gratificado/date/"+date ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.putGratificado=function(gratificado)
        {
            var request = { method: 'PUT', url: urlBase+ "gratificado", data: gratificado ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.postGratificado=function(gratificado)
        {
            var request = { method: 'POST', url: urlBase+ "gratificado", data: gratificado ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.deleteGratificado=function(gratificado)
        {
            var request = { method: 'DELETE', url: urlBase+ "gratificado", data: gratificado.id ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };

        /*Categorias*/
        dataFactory.getCategorias=function()
        {
            var request = { method: 'GET', url: urlBase+ "categoria" ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.putCategoria=function(categoria)
        {
            var request = { method: 'PUT', url: urlBase+ "categoria", data: categoria ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.postCategoria=function(categoria)
        {
            var request = { method: 'POST', url: urlBase+ "categoria", data: categoria ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.deleteCategoria=function(categoria)
        {
            var request = { method: 'DELETE', url: urlBase+ "categoria", data: categoria ,headers: {'Content-Type': 'application/json'}};
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
        dataFactory.putTipoServicos=function(tiposervico)
        {
            var request = { method: 'PUT', url: urlBase+ "tiposervico", data: tiposervico ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.postTipoServicos=function(tiposervico)
        {
            var request = { method: 'POST', url: urlBase+ "tiposervico", data: tiposervico ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.deleteTipoServicos=function(tiposervico)
        {
            var request = { method: 'DELETE', url: urlBase+ "tiposervico", data: tiposervico ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };

        /*Tipo Gratificado*/
        dataFactory.getTipoGratificados=function()
        {
            var request = { method: 'GET', url: urlBase+ "tipogratificado" ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.putTipoGratificado=function(tipogratificado)
        {
            var request = { method: 'PUT', url: urlBase+ "tipogratificado", data: tipogratificado ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.postTipoGratificado=function(tipogratificado)
        {
            var request = { method: 'POST', url: urlBase+ "tipogratificado", data: tipogratificado ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.deleteTipoGratificado=function(tipogratificado)
        {
            var request = { method: 'DELETE', url: urlBase+ "tipogratificado", data: tipogratificado ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        
        /*Viaturas*/
        dataFactory.getViaturas=function()
        {
            var request = { method: 'GET', url: urlBase+ "viatura" ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.putViatura=function(viatura)
        {
            var request = { method: 'PUT', url: urlBase+ "viatura", data: viatura ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.postViatura=function(viatura)
        {
            var request = { method: 'POST', url: urlBase+ "viatura", data: viatura ,headers: {'Content-Type': 'application/json'}};
            return $http(request);
        };
        dataFactory.deleteViatura=function(viatura)
        {
            var request = { method: 'DELETE', url: urlBase+ "viatura", data: viatura ,headers: {'Content-Type': 'application/json'}};
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

