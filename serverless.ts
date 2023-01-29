import type { AWS } from "@serverless/typescript";

import {
  createContract,
  getContract,
  getContractsIds,
  signUp,
  logIn,
  verifyToken,
} from "./resources/functions";

const serverlessConfiguration: AWS = {
  service: "serverless-contract-management-api",
  frameworkVersion: "3",
  functions: {
    verifyToken,
    createContract,
    getContract,
    getContractsIds,
    signUp,
    logIn,
  },
  package: { individually: true },

  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-dotenv-plugin",
    "serverless-offline",
  ],

  custom: {
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev",
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },

  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "${opt:stage,'dev'}",
    region: "eu-west-1",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      CONTRACT_TABLE: "contract_table",
      USER_TABLE: "user_table",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:PutItem",
              "dynamodb:GetItem",
              "dynamodb:Query",
              "dynamodb:Scan",
            ],
            Resource: [
              "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.CONTRACT_TABLE}",
              "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USER_TABLE}",
            ],
          },
        ],
      },
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
  },

  resources: {
    Resources: {
      contractTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:provider.environment.CONTRACT_TABLE}",
          AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
          KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
      UserTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:provider.environment.USER_TABLE}",
          AttributeDefinitions: [
            { AttributeName: "email", AttributeType: "S" },
          ],
          KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
