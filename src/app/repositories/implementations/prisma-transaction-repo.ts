import { PrismaClient } from "@prisma/client";
import { Transaction } from "../../entities/transaction";
import { ApiError } from "../../utils/api-error";
import { ITransactionRepo } from "../i-transaction-repo";

const prisma = new PrismaClient;

export class PrismaTransactionRepo implements ITransactionRepo {
  async create(transaction: Transaction): Promise<void> {
    try {
      await prisma.transaction.create({
        data: {
          id: transaction.id,
          value: transaction.value,
          date: transaction.date,
          type: transaction.type,
          accountId: transaction.accountId,
          categoryId: transaction.categoryId,
          subcategoryId: transaction.subcategoryId
        }
      });
    } catch(err: any) {
      throw ApiError.DBAccessError;
    }
  }
}