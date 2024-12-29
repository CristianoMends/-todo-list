# Todo List com Docker, Angular, Java e PostgreSQL

Este repositório contém o código-fonte de uma aplicação de gerenciamento de tarefas, desenvolvida utilizando Docker, Angular, Java, e PostgreSQL. O objetivo deste projeto é aprender e aplicar conceitos de Docker na disciplina de Gerência de Configuração do curso de Engenharia de Software da Universidade Federal do Ceará (UFC).

<div>
    <a href="#tech">Tecnologias</a> ◽ 
    <a href="#func">Funcionalidades</a> ◽ 
    <a href="#obj">Objetivo</a> ◽ 
    <a href="#how">Como rodar</a> ◽ 
    <a href="#stru">Estrutura</a> ◽ 
    <a href="#demo">Demonstração</a> 
</div>

<h2 id="tech"> Tecnologias Utilizadas </h2>

<input type="checkbox" checked="true">
<strong>Docker</strong>: Para contêinerização da aplicação e bancos de dados.

<input type="checkbox" checked="true">
<strong>Angular:</strong> Para o desenvolvimento do frontend.

<input type="checkbox" checked="true">
<strong>Java</strong>: Para o desenvolvimento do backend.

<input type="checkbox" checked="true">
<strong>PostgreSQL</strong>: Banco de dados utilizado para persistência das informações.
  
<h2 id="func"> Funcionalidades </h2>

- **Cadastro de Tarefas:** Adicionar novas tarefas com título, descrição, e data de vencimento.
- **Edição e Conclusão:** Modificar informações das tarefas e marcar como concluídas.
- **Filtros de Busca:** Buscar tarefas por data de criação, data de vencimento, título, descrição, e status.
- **Persistência de Dados:** Utilização de PostgreSQL para armazenar informações das tarefas.

<h2 id="obj"> Objetivo </h2>

O principal objetivo deste projeto é aprender sobre Docker e como utilizá-lo na construção de aplicações de software, além de integrar tecnologias modernas de backend e frontend para desenvolvimento de sistemas.

<h2 id="how"> Como Rodar o Projeto </h2>

### Pré-requisitos

- Docker
- Docker Compose

### Passos para Executar

1. Clone o repositório:
```bash
git clone https://github.com/CristianoMends/todo-list
cd todo-list
```
2. Configure as variaveis de ambiente

Crie um arquivo .env no diretório raiz do projeto e adicione as seguintes variáveis:
```properties
DB_PASSWORD=sua_senha
DB_USERNAME=seu_usuario
DB_URL=jdbc:postgresql://db:5432/todo_db
```
2. Construa e inicie os contêineres com o Docker Compose:

```bash
docker-compose up
```

3. Acesse a aplicação:
```bash
http://localhost:4200
```

### Testando Persistência de Dados

1. Adicione algumas tarefas na aplicação.

2. Pare os contêineres:

```bash
docker-compose down
```
3. Reinicie os contêineres:

```bash
docker-compose up
```

4. Verifique se os dados das tarefas adicionadas ainda estão lá.

<h2 id="stru"> Estrutura do Projeto </h2>

- todo-backend/: Código-fonte do backend em Java (Spring Boot).

- todo-frontend/: Código-fonte do frontend em Angular.

- docker-compose.yml: Configuração dos contêineres.

### Dockerfile:

#### Backend:
---

O backend da aplicação é construído utilizando Gradle e executado em um contêiner baseado no `Eclipse Temurin` (JRE). O processo de construção e execução da aplicação segue os passos descritos no Dockerfile:

1. **Build da Aplicação**:

   Utiliza a imagem base do Gradle com JDK 21 e 23 para construir o projeto Java. O comando `gradle clean build -x test` compila o código e gera o arquivo `.jar`, ignorando a execução dos testes.

   Comando principal: ``gradle clean build -x test``.

2. **Construção do Contêiner de Runtime**:

   A imagem final é baseada no `Eclipse Temurin`, que contém o JRE necessário para rodar a aplicação. O arquivo `.jar` gerado na etapa de build é copiado para o contêiner de runtime.

3. **Exposição da Porta**:

   O contêiner expõe a porta 8080, que pode ser mapeada para a máquina local no Docker Compose ou em qualquer outro ambiente que esteja rodando o contêiner.

4. **Execução**:

   O comando ``ENTRYPOINT ["java", "-jar", "app.jar"]`` é utilizado para iniciar a aplicação Java, executando o arquivo `.jar` dentro do contêiner.

Esse Dockerfile é estruturado em duas etapas principais: a primeira etapa realiza o build do projeto e a segunda, o executa no ambiente de runtime, garantindo uma separação clara entre a construção e a execução da aplicação.


#### Frontend:
---

O frontend do aplicativo é construído utilizando Angular e é servido por um contêiner baseado em Nginx. O processo de construção do aplicativo segue os passos descritos no Dockerfile:

1. Build da Aplicação:

Utiliza a imagem base do Node.js para instalar as dependências e construir os arquivos estáticos do Angular.

Comando principal: ``npm run build``.

2. Servindo o Frontend:

A imagem final é baseada no `Nginx` para servir os arquivos estáticos localizados no diretório ``/app/dist/todo-app/browser``.

Configurações adicionais, como o nginx.conf e o mime.types, são copiadas para personalizar o servidor.

3. Exposição da Porta:

O contêiner expõe a porta 80, que é mapeada para a máquina local através do Docker Compose.

4. Execução:

O comando ``CMD ["nginx" ,"-g","daemon off;"]`` mantém o contêiner ativo servindo o aplicativo.

---

<h2 id="demo"> Demonstração do Projeto </h2>

Confira o funcionamento completo da aplicação no vídeo abaixo:

[![Assista ao vídeo](https://img.youtube.com/vi/SEU_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=SEU_VIDEO_ID)