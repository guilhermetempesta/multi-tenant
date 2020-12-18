# Projeto Multi-Tenant


## Descrição do Projeto
<p align="left"> API Backend desenvolvido com Node JS, PostgreSQL e Express, utilizando uma abordagem multi-tenant (múltiplos locatários), mantendo um schema padrão do PostgreSQL para controlar novas inscições na API e isolando os dados de cada locatário em um schema específico. </p>


<h4 align="center"> 
	🚧  Em desenvolvimento...  🚧
</h4>


### Features

- [x] SIGNUP
	- [x] inscrever-se (Account)
	- [x] criar schema (PostgreSQL)
	- [x] criar Usuário (User) 
- [ ] Login, autorização e autenticação
- [ ] CRUD de Usuário (User)
- [ ] Listar Municípios (City)
- [ ] Listar Bancos (Bank)


### Pré-requisitos

Antes de começar, é preciso instalar em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [PostgreSQL](https://www.postgresql.org/) 
Além disto, tenha editor para trabalhar com o código, como por exemplo o [VSCode](https://code.visualstudio.com/)


### Configurando o Projeto

```bash
# Clone este repositório
$ git clone <https://github.com/guilhermetempesta/muti-tenant.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd multi-tenant

# Vá para a pasta do backend
$ cd backend

# Execute o comando para inicializar o projeto
$ npm init -y

# Instale o nodemon (em modo de desenvolvimento)
$ npm i --save-dev nodemon

# Instale as dependências
$ npm i
```


### Configurando o Banco de Dados

- Baixe e instale a última versão do postgreSQL

- Crie o arquivo .env, com as configurações da conexão, seguindo como exemplo as informações contidas no arquivo <i> env_file </i> 

- Execute a sequencia abaixo no terminal: 

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd multi-tenant

# Vá para a pasta do backend
$ cd backend

# Execute o comando para criar o banco de dados default
$ npx sequelize db:create

# Execute as migrations para criar a estrutura do banco de dados
$ npx sequelize db:migrate
```


### Rodando o Backend (servidor)

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd multi-tenant

# Vá para a pasta do backend
$ cd backend

# Execute a aplicação (em modo de desenvolvimento)
$ npm start

# O servidor inciará na porta:3330
```


### 🛠 Tecnologias

As seguintes ferramentas foram usadas no desenvolvimento do projeto:

- [Node.js] (https://nodejs.org/en/)
- [nodemon] : launcher utilizado em desenvolvimento 
- [bcrypt-nodejs] : criptografia de dados
- [body-parser] : interpretar o body da requisição
- [consign] : injeção de dependencias
- [cors] : disponibilidade para outra aplicação
- [date-fns] : biblioteca para trabalhar com datas
- [express]	: framework web
- [jwt-simple] : estrategia de autenticação - json web token
- [passport] : middleware para autenticação
- [passport-jwt] : framework do passport para jwt
- [pg] :  banco de dados postgresql
- [pm2] : launcher utilizado em produção
- [sequelize] : ORM para banco de dados
- [sequelize-cli] : interface de linhas de comando do sequelize


### Licença
Este projeto está sob a licença MIT (http://escolhaumalicenca.com.br/licencas/mit/).
