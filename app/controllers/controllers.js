//var url = 'http://servicesazure.cloudapp.net/ServicesEscalas.svc';
/*var url = 'http://localhost:3167/ServicesEscalas.svc';

app.controller('PessoasController', function ($scope, $http, $routeParams) {
    $scope.orderName = "Id";

    
    var urlServicos = url+'/servico';

    var urlPessoas = url + '/gnr';

    var reqPessoas = {
        method: 'GET',
        url: urlPessoas
    }

    $scope.newOrder=function(name)
        {
            $scope.orderName = name;
        }
    $scope.pessoas = [];

    $http(reqPessoas)
        .success(function (data, status) {
            $scope.pessoas = data;
        })
        .error(function (data, status) {
            alert("Erro aceder Web Service: " + urlPessoas);
        });

    $scope.deletePessoa = function (id) {

        var urlPessoas = url + '/gnr' + id;
        var reqPessoas = {
            method: 'DELETE',
            url: urlPessoas
        }

        $http(reqPessoas)
            .success(function (data, status) {
                $scope.resultado = data;
            })
            .error(function (data, status) {
                alert("Erro aceder Web Service: " + urlPessoas+status);
            });
    }
});

app.controller('PessoasControllerEdit', function ($scope, $http, $routeParams) {

    $scope.pessoa = "";
    var urlPessoas = url + '/gnr/' + $routeParams.pessoaID;

    var reqPessoas = {
        method: 'GET',
        url: urlPessoas
    }

    $http(reqPessoas)
        .success(function (data, status) {
            //data.DataNasc = new Date(parseInt(data.DataNasc.replace('/Date(', '')));
            $scope.pessoa = data;
        })
        .error(function (data, status) {
            alert("Erro aceder Web Service: " + urlPessoas);
        });

    $scope.putPessoa = function () {
        var urlPessoas = url + '/gnr';

        var reqPessoas = {
            method: 'PUT',
            url: urlPessoas,
            data: $scope.pessoa
        }

        $http(reqPessoas)
            .success(function (data, status) {
                $scope.resultado = data;
            })
            .error(function (data, status) {
                alert("Erro aceder Web Service: " + urlPessoas);
            });
    }
});

app.controller('PessoasControllerNew', function ($scope, $http) {
    var urlPessoas = url + '/gnr';
    $scope.pessoa = { Id: "", PNome: "", UNome: "", Numero: "", DataNasc: "", Ativo: "" };

    $scope.postPessoa = function () {
        var reqPessoas = {
            method: 'POST',
            url: urlPessoas,
            data: $scope.pessoa
        }

        $http(reqPessoas)
            .success(function (data, status) {
                $scope.resultado = data;
            })
            .error(function (data, status) {
                alert("Erro aceder Web Service: " + urlPessoas);
            });
    }
});
*/
app.controller('EscalasController', function ($scope, $routeParams) {
    $scope.name="Tiago";
/*
    var urlServicos = url + '/servico';

    var urlPessoas = url + '/gnr';

    var urlTipoServico = url + '/tiposervico';

    $scope.tipoPrefixo = "Rapido";
    
    $scope.getTipoPrefixo=function(idPrefixo)
    {
        $scope.tipoPrefixo = "MT Rapido";
        for (var i = 0, len = $scope.tipoServicos.length; i < len; i++) {
            
        
            if($scope.tipoServicos[i].TipoServicoId==idPrefixo)
            {
                $scope.tipoPrefixo = $scope.tipoServicos[i].PrefixoServico;
            }
        }
    }
    var reqPessoas = {
        method: 'GET',
        url: urlPessoas
    }

    var reqServico = {
        method: 'GET',
        url: urlServicos
    }

    var reqTipoServico = {
        method: 'GET',
        url: urlTipoServico
    }

    $scope.pessoas = [];

    $http(reqPessoas)
        .success(function (data, status) {
            $scope.pessoas = data;
        })
        .error(function (data, status) {
            alert("Erro aceder Web Service: " + urlPessoas);
        });

    $scope.servicos = [];

    $http(reqServico)
        .success(function (data, status) {
            $scope.servicos = data;
        })
        .error(function (data, status) {
            alert("Erro aceder Web Service: " + urlServicos);
        });

    $scope.tipoServicos = [];

    $http(reqTipoServico)
        .success(function (data, status) {
            $scope.tipoServicos = data;
        })
        .error(function (data, status) {
            alert("Erro aceder Web Service: " + urlTipoServico);
        });
*/
});