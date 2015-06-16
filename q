SELECT max(Data) , Id  FrOM gestaoescalas.ServicoPessoa AS SP 
WHERE Servico_Id = '1' AND DATA < '2015-05-22'
GROUP BY SP.Pessoa_Id
ORDER BY SP.Data ASC;


SELECT * FROM gestaoescalas.HabilitaServico AS HS
	INNER JOIN (SELECT Id FROM gestaoescalas.pessoa where Ativo = '1' )  AS P
	ON HS.Pessoa_Id=P.Id
	where TipoServico_Id = '1';

	SELECT max(Data) as d , Id, Pessoa_Id  FROM gestaoescalas.ServicoPessoa
WHERE Servico_Id = '1' AND Data < '2015-07-22'
GROUP BY Pessoa_Id
ORDER BY d ASC;


SELECT max(S.Data) as Data , S.Pessoa_Id,  N.Apelido  FROM gestaoescalas.ServicoPessoa AS S
RIGHT JOIN (SELECT * FROM gestaoescalas.pessoa AS P
				INNER JOIN (SELECT Pessoa_Id FROM gestaoescalas.HabilitaServico where TipoServico_Id = '1')  AS HS
			ON P.Id=HS.Pessoa_Id
			where Ativo = '1') AS N
ON S.Pessoa_Id = N.Id
WHERE Servico_Id = '1' AND Data < '2015-07-22'
GROUP BY Pessoa_Id
ORDER BY Data ASC;
 

 SELECT * FROM gestaoescalas.pessoa AS P
	INNER JOIN (SELECT HS.Pessoa_Id, S.Data FROM gestaoescalas.HabilitaServico AS HS
		LEFT JOIN (SELECT max(Data) as Data , Pessoa_Id FROM gestaoescalas.ServicoPessoa WHERE Servico_Id = '1' AND Data < '2015-07-22' GROUP BY Pessoa_Id) AS S
                ON S.Pessoa_Id = HS.Pessoa_Id
		where HS.TipoServico_Id = '1') AS N
	ON P.Id=N.Pessoa_Id
	where Ativo = '1'
ORDER BY Data ASC;