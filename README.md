<h1># serverTestTriider</h1> 

<p align="center">
  <img width="600" height="150" src="https://user-images.githubusercontent.com/42190220/75618561-115be300-5b4f-11ea-8968-8296ff4127ed.png">
</p>
</br></br>

<p align="center">
Este é um repositório temporário que contém todos os arquivos necessários para executar o servidor de backend utilizado para solucionar o teste do processo seletivo da empresa Triider.
</p>

</br></br></br></br>

<h3>Pré-requisitos:</h3>

* Docker
* Docker-compose


<h3>Como executar:</h3>

1. Clone o repositório
2. Navegue até a raiz do projeto pelo terminal
3. Execute o comando: 
```sh
$ docker-compose up
```
4. Aguarde a configuração do ambiente...

Ok, neste ponto o servidor já deve estar disponível para desenvolvimento e teste.
O Docker irá disponibilizar 3 containers com as seguintes imagens:</br>
* Alpine: para rodar o Node e o Express.
* Postgres: para rodar uma instância do banco (Contém uma base dev e outra de test)
* PgAdmin4: para configurar as conexões e acessar os bancos de forma visual e não apenas pelo terminal(psql)

***
<!> **OPCIONAL:** _Opcionalmente mas fortemente recomendado que você execute um load inicial na base de dados para facilitar o uso em desenvolvimento, para isso basta executar(apenas uma vez) o seguinte comando na raiz do projeto:_ 
```sh
$ docker exec -it gql-triider yarn sequelize db:seed:all
```
***

</br></br>

# Helpers

* [Postman e Graphiql](#desenvolvimento) </br>
* [Testes e cobertura](#testes) </br>
* [Modelagem do sistema](#modelagem) </br>
* [Arquitetura do projeto](#arquitetura) </br>

</br>

# Desenvolvimento

<h3>Postman</h3>

A coleção e as variáveis do Postman estão incorporadas ao projeto e disponíveis para uso, basta importar para o Postman.
</br></br>
**Acesse:**</br>
_./postman/apiGraphql.postman_collection.json_ </br>
_./postman/apiGraphql.postman_environment.json_ </br>
</br> Após, importe os arquivos acima no Postman.

<h3>Graphiql</h3>

Por padrão, Graphiql já está habilitado no modo de desenvolvimento. Para usar, apenas:

* Certifique-se de que o servidor está rodando
* Abra o browse e acesse: http://localhost:4005/graphql

Você tera acesso ao playground, poderá visualizar todo o schema Graphql e executar as consultas que quiser.

</br></br>

# Testes

<h3>Testes automatizados</h3>

Para executar os testes basta executar na raiz do projeto o comando:
```sh
$ docker exec -it gql-triider yarn test
```
<h3>Cobertura dos testes</h3>

Para verificar o nível de cobertura dos testes basta executar na raiz do projeto o comando:
```sh
$ docker exec -it gql-triider yarn coverage
```

</br></br>

# Modelagem

<h3>Modelagem da aplicação</h3>

</br></br>

# Arquitetura

<h3>Arquitetura do sistema</h3>
