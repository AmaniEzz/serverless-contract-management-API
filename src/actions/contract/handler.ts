import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { contractService } from "../../services";
import { Contract } from "src/model/contract-model";

/**
 * @param {}
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const getContractsIds = middyfy(
  async (): Promise<APIGatewayProxyResult> => {
    const ids = await contractService.getContractsIds();
    return formatJSONResponse(200, { ids });
  }
);

/**
 * @param {event} any
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const createContract = middyfy(
  async (event: any): Promise<APIGatewayProxyResult> => {
    try {
      const newContract = event.body as Contract;
      const contract = await contractService.createContract(newContract);
      return formatJSONResponse(200, { contract });
    } catch (e) {
      return formatJSONResponse(e.statusCode, { error: e });
    }
  }
);

/**
 * @param {event} APIGatewayProxyEvent
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const getContract = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const contract = await contractService.getContract(id);
      return formatJSONResponse(200, { contract });
    } catch (e) {
      return formatJSONResponse(e.statusCode, { error: e });
    }
  }
);
