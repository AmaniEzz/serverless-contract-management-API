# Serverles Contract Managment API

Simple Contract Managment serverless application

## Installation

You will need the following packages installed locally,

- AWS CLI
- NodeJS (14.18.0 or higher)
- NPM

## Local Development

First, run the following commands

```bash
npm install -g serverless
npm install
serverless dynamodb install
```

To start lambda functions and DynamoDB locally in the offline mode use the following command:

`npm run dev:start`

To deploy the lambda functions to AWS run the following command:

`npm run deploy`

#### Local Endpoints

##### Authentication

> For POST requests make sure to include `"Content-Type": "application/json" in the header.

`POST signup -`
[http://localhost:3000/dev/signup](http://localhost:3000/dev/signup)

Example request body:

```
{
    "username": "testUser",
    "email": "testuser@gmail.com",
    "password": "testPassword"
}
```

`POST login -`
[http://localhost:3000/dev/login](http://localhost:3000/dev/login)

Example request body:

```
{
    "email": "testuser@gmail.com",
    "password": "testPassword"
}
```

##### Contract Managment

`POST create contract -`
[http://localhost:3000/dev/contract/create](http://localhost:3000/dev/task/create)

Example request body:

```
{
    "userId": “123rfedwsf3w45r342w”,
    "name: “Contract Name”,
    "templateId": “123rfedwsf3w45r342w”
}
```

`GET get contracts ids -`
[http://localhost:3000/dev/contract](http://localhost:3000/dev/contract)

`GET get contract by id -`
[http://localhost:3000/dev/contract/{id}](http://localhost:3000/dev/contract/{id})

## Run Unit Tests

To run tests

`npm run test`

> > I added only few unit tests due to time constrains and the simplicty of the project.
> > Future work is to add more tests and even integration tests.
