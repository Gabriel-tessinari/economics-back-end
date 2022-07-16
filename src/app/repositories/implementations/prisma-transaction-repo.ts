import { PrismaClient } from "@prisma/client";
import { Transaction } from "../../entities/transaction";
import { ApiError } from "../../utils/api-error";
import { ITransactionRepo } from "../i-transaction-repo";

const prisma = new PrismaClient;

export class PrismaTransactionRepo implements ITransactionRepo {
  async create(transaction: Transaction): Promise<void> {
    try {
      console.log(transaction);
    } catch(err: any) {
      throw ApiError.DBAccessError;
    }
  }
}