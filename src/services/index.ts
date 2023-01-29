import dynamoMapper from "../utils/dynamoDB-mapper";
import JWTService from "./jwt-service";
import ContractServerice from "./contract-service";
import { UserService } from "./user-service";
import { AwsPolicyGeneratorService } from "./aws-policy-generator-service";

export const jwtService = new JWTService();
export const awsPolicyService = new AwsPolicyGeneratorService();
export const contractService = new ContractServerice(dynamoMapper);
export const userService = new UserService(dynamoMapper, jwtService);
