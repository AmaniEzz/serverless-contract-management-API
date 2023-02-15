# Serverles Contract Managment API

This project is a Serverless Contract Management API built with Node.js, TypeScript, Serverless Framework, AWS Lambda, and DynamoDB. The API allows users to create and read contracts in a secure way using JWT Authorization to ensures that only authorized users can access the Lambda functions.
The project includes unit tests with Mocha and Chai to ensure code reliability and correctness.

The Serverless Framework handles all server management and scaling.

## Installation

You will need the following packages installed locally,

- AWS CLI
- NodeJS (14.18.0 or higher)
- NPM

## Local Development

First, run the following commands in the same order

```bash
npm install -g serverless
npm install
npm run dynamodb:install
```

To start lambda functions and DynamoDB locally in the offline mode use the following command:

`npm run sls:offline`

To deploy the lambda functions to AWS run the following command:

`npm run deploy`

To remove all resources created on AWS run the following command:

`npm run remove`

## Run in Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/12743195-0a493b19-c466-49bd-932a-dac00eca2bfe?action=collection%2Ffork&collection-url=entityId%3D12743195-0a493b19-c466-49bd-932a-dac00eca2bfe%26entityType%3Dcollection%26workspaceId%3D9f27b61e-2dd3-4e6b-ae03-e5d56be30c1f)

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
[http://localhost:3000/dev/contracts/create](http://localhost:3000/dev/task/create)

Example request body:

```
{
    "userId": “123rfedwsf3w45r342w”,
    "name: “Contract Name”,
    "templateId": “123rfedwsf3w45r342w”
}
```

`GET get contracts ids -`
[http://localhost:3000/dev/contracts](http://localhost:3000/dev/contract)

`GET get contract by id -`
[http://localhost:3000/dev/contracts/{id}](http://localhost:3000/dev/contract/{id})

## Run Unit Tests

To run tests

`npm run test`

> > I added only few unit tests due to time constrains and the simplicty of the project.
> > Future work is to add more tests and even integration tests.
