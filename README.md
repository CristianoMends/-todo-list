# Todo List com Docker, Angular, Java e PostgreSQL

Este repositório contém o código-fonte de uma aplicação de gerenciamento de tarefas, desenvolvida utilizando Docker, Angular, Java, e PostgreSQL. O objetivo deste projeto é aprender e aplicar conceitos de Docker na disciplina de Gerência de Configuração do curso de Engenharia de Software da Universidade Federal do Ceará (UFC).

## Tecnologias Utilizadas

- **Docker:** Para contêinerização da aplicação e bancos de dados.
- **Angular:** Para o desenvolvimento do frontend.
- **Java (Spring Boot):** Para o desenvolvimento do backend.
- **PostgreSQL:** Banco de dados utilizado para persistência das informações.
  
## Funcionalidades

- **Cadastro de Tarefas:** Adicionar novas tarefas com título, descrição, e data de vencimento.
- **Edição e Conclusão:** Modificar informações das tarefas e marcar como concluídas.
- **Filtros de Busca:** Buscar tarefas por data de criação, data de vencimento, título, descrição, e status.
- **Persistência de Dados:** Utilização de PostgreSQL para armazenar informações das tarefas.

## Objetivo

O principal objetivo deste projeto é aprender sobre Docker e como utilizá-lo na construção de aplicações de software, além de integrar tecnologias modernas de backend e frontend para desenvolvimento de sistemas.

## Como Rodar o Projeto

### Pré-requisitos

- Docker
- Docker Compose

### Passos para Executar

1. Clone o repositório:
```bash
git clone https://github.com/CristianoMends/todo-list
cd todo-list
```
2. Construa e inicie os contêineres com o Docker Compose:

```bash
docker-compose up --build
```

3. Acesse a aplicação:
```bash
http://localhost:4200
```