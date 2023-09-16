# Test Dev Asksuite

Hey! Glad you're here.
I'm going to explain exactly what you'll have to implement in this test and what we expect as outcome.

First of all, we have this nice express.js boilerplate project to assist you so you don't have to create everything from scratch.

## Briefing

The traveller comes to our bot and asks for "Price quotation". Then the bot asks for the dates the traveller wants to
stay at the bot's hotel.
At the moment the traveller fills the requested information the bot needs to search the prices for each room available in the check-in/check-out
timeframe.

You will have to implement the API responsible for doing the searching part.
The necessary information for the crawler is under the [Assets](#assets) session

## What you'll need to do:

- Create a POST endpoint "/search"

  - The expected payload is:

      <pre>
      {
          "checkin": "YYYY-MM-DD", // Check-in date
          "checkout": "YYYY-MM-DD" // Check-out date
      }
      </pre>

    Example

      <pre>
      {
          "checkin": "2021-07-01", 
          "checkout": "2021-07-03"
      }
      </pre>

  - The expected result is an array of rooms:

      <pre>
      [{
          "name": string, // Room name
          "description": string,  // Room description
          "price": string, // Room daily price
          "image": string, // Room main photo
      }]
      </pre>

    Example

      <pre>
      [{
          "name": "STUDIO CASAL",
          "description": "Apartamentos localizados no prédio principal do Resort, próximos a recepção e a área de convivência, com vista para área de estacionamento não possuem varanda. Acomoda até 1 adulto e 1 criança ou 2 adultos", 
          "price": "R$ 1.092,00",
          "image": "https://letsimage.s3.amazonaws.com/letsbook/193/quartos/30/fotoprincipal.jpg"
      },
      {
          "name": "CABANA",
          "description": "Apartamentos espalhados pelos jardins do Resort, com vista jardim possuem varanda. Acomoda até 4 adultos ou 3 adultos e 1 criança ou 2 adultos e 2 criança ou 1 adulto e 3 crianças, em duas camas casal.", 
          "price": "R$ 1.321,00",
          "image": "https://letsimage.s3.amazonaws.com/letsbook/193/quartos/32/fotoprincipal.jpg"
      }]
      </pre>

To achieve this result you may:

- With puppeteer, go to the [given URL](#assets)
- Retrieve the needed information to assemble the payload using web crawling methods

## Environment

- Node 10+
- Dotenv setup

Already installed: `express` `puppeteer` `dotenv`

**_Feel free to add any lib you find relevant to your test._**

## Running

- Install dependencies with: `npm install`
- Run as dev: `npm run start`

Default port is set to `8080`

## Assets

- Crawl URL sample (change dates):
<pre>https://pratagy.letsbook.com.br/D/Reserva?checkin=21%2F06%2F2022&checkout=25%2F06%2F2022&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=6%2F14%2F2022</pre>
- Help images:
  ![sample_1](assets/sample_1.png)

## Test rating

What do we evaluate with this test?

- Dev's capacity of:
  - Self-learning
  - Working with node
  - Understanding an existent project
- Dev's code quality:
  - Clear and maintainable code
  - Coding structure
  - Changes that don't break easily

## Descrição

Aksuite Node.js - Scrapping

## Desenvolvimento

Desenvolvimento conta com API Rest, testes Unitários, testes E2E, validação de JSON e docker. Desenvolvido utilizando Node.js, Typescript, Nest.js, Jest, Supertest, Zod, Swagger, Docker.

## Pré-requisitos

```bash
- Node.js
- npm ou yarn
- Docker
```

## Instalação dos pacotes

```bash
# npm
$ npm install
  ou
# yarn
$ yarn install
```

### Instruções para iniciar a aplicação

A API pode ser iniciada de duas maneiras, podendo ser acessada em um container via Docker(1°) ou localmente(2°).

## 1° - Execução com Docker

Na raiz do projeto execute o comando para a criação do container Docker com a API e banco de dados

```bash
# comando para criação do container em background
$ docker-compose up -d
  ou
# comando para criação do container(desta forma o terminar é utilizado e travado pelo Docker)
$ docker-compose up
```

O container será criado e basta aguardar a subida da API e ela estará acessível em:

```bash
$ http://localhost:8080

```

## 2° - Execução Local

Na raiz do projeto execute o comando abaixo para iniciar a aplicação:

```bash
# npm
$ npm run start
  ou
# yarn
$ yarn start
```

A API será iniciada e estara disponível em:

```bash
$ http://localhost:8080

```

## Collections para acessar a API - Insomnia/Postman

Na raiz do projeto na pasta API-collections está disponível 2 documentos com o seguinte nome:

```bash
# Collection da API para Insomnia
$ COLLECTION-Insomnia-AKSUITE
  e
# Collection da API para Postman
$ COLLECTION-Postman-AKSUITE
```

## Testes

Para realizar a execução dos testes, na raiz do projeto execute os comandos a seguir:

```bash
# testes unitários
$ npm run test
  ou
$ yarn test

# testes e2e
$ npm run test:e2e
  ou
$ yarn test:e2e

```
