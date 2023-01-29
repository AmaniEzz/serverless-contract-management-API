import { DataMapper } from "@aws/dynamodb-data-mapper";
import { errorDomain } from "src/utils/error-domain";
import HTTPError from "src/utils/error";

import { Contract } from "../model/contract-model";

export class ContractService {
  /**
   *
   * @param mapper
   */
  constructor(private mapper: DataMapper) {}

  /**
   * A function that returns an array of contracts ids
   * @param
   * @returns Promise<String[]>
   */
  async getContractsIds(): Promise<String[]> {
    try {
      const ids: string[] = [];

      for await (const item of this.mapper.scan(Contract)) {
        ids.push(item?.id);
      }
      return ids;
    } catch (error) {
      throw new HTTPError(
        400,
        "Failed to fetch some contracts",
        errorDomain.UNKNOWN,
        error
      );
    }
  }

  /**
   *
   * @param contract
   * @returns Promise<Contract>
   */
  async createContract(contract: Contract): Promise<Contract> {
    if (!contract) {
      throw new HTTPError(400, "missing input", errorDomain.CREATION_ERROR);
    }
    try {
      const contractToSave = Object.assign(new Contract(), contract);
      return await this.mapper.put(contractToSave);
    } catch (error) {
      throw new HTTPError(
        400,
        "Failed to create the contract",
        errorDomain.CREATION_ERROR,
        error
      );
    }
  }

  /**
   *
   * @param id
   * @returns Promise<Contract>
   */
  async getContract(id: string): Promise<Contract> {
    try {
      const contract = await this.mapper.get(
        Object.assign(new Contract(), { id: id })
      );
      return contract as Contract;
    } catch (error) {
      throw new HTTPError(
        400,
        "contract not found",
        errorDomain.NOT_FOUND,
        error
      );
    }
  }
}
