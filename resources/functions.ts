import { handlerPath } from "@libs/handler-resolver";

export const verifyToken = {
  handler: `${handlerPath(__dirname)}/handlers.verifyToken`,
};

export const signUp = {
  handler: `${handlerPath(__dirname)}/handlers.signUp`,
  events: [
    {
      http: {
        method: "post",
        path: "signup",
      },
    },
  ],
};

export const logIn = {
  handler: `${handlerPath(__dirname)}/handlers.logIn`,
  events: [
    {
      http: {
        method: "post",
        path: "login",
      },
    },
  ],
};

export const getContractsIds = {
  handler: `${handlerPath(__dirname)}/handlers.getContractsIds`,
  events: [
    {
      http: {
        method: "get",
        path: "contract",
        cors: true,
        authorizer: {
          name: `verifyToken`,
          identitySource: "method.request.header.Authorization",
          resultTtlInSeconds: 3600,
        },
      },
    },
  ],
};

export const createContract = {
  handler: `${handlerPath(__dirname)}/handlers.createContract`,
  events: [
    {
      http: {
        method: "post",
        path: "contract/create",
        cors: true,
        authorizer: {
          name: `verifyToken`,
          identitySource: "method.request.header.Authorization",
          resultTtlInSeconds: 3600,
        },
      },
    },
  ],
};

export const getContract = {
  handler: `${handlerPath(__dirname)}/handlers.getContract`,
  events: [
    {
      http: {
        method: "get",
        path: "contract/{id}",
        cors: true,
        authorizer: {
          name: `verifyToken`,
          identitySource: "method.request.header.Authorization",
          resultTtlInSeconds: 3600,
        },
      },
    },
  ],
};
