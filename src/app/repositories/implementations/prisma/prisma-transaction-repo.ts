import { PrismaClient } from "@prisma/client";
import { Transaction } from "../../../entities/transaction";
import { ApiError } from "../../../utils/api-error";
import { ITransactionRepo } from "../../i-transaction-repo";
import { PrismaToEntity } from "./mappers/prismaToEntity";

const prisma = new PrismaClient;

export class PrismaTransactionRepo implements ITransactionRepo {
  async create(transaction: Transaction): Promise<void> {
    try {
      await prisma.transaction.create({
        data: {
          id: transaction.id,
          description: transaction.description,
          value: transaction.value,
          date: transaction.date,
          type: transaction.type,
          accountId: transaction.accountId,
          categoryId: transaction.categoryId,
          subcategoryId: transaction.subcategoryId
        }
      });
    } catch(err: any) {
      console.log(err);
      throw new ApiError(500, "Erro de acesso ao Banco de Dados.");
    }
  }

  async findByAccountIdAndDateMonth(accountId: string, dateMonth: string): Promise<Transaction[]> {
    let transactions: Transaction[] = [];
    let dateSearch = "/" + dateMonth + "/";

    try {
      const response = await prisma.transaction.findMany({
        where: {
          accountId: accountId,
          date: { contains: dateSearch }
        },
        orderBy: [
          { date: 'asc' },
          { type: 'asc' }

        ] ,
        include: {
          account: true,
          category: true,
          subcategory: true
        }
      });

      if(response) {
        response.forEach(transaction => {
          transactions.push(
            PrismaToEntity.transaction(
              transaction,
              transaction.account,
              transaction.category,
              transaction.subcategory
            )
          );
        });
      }

      return transactions;
    } catch(err: any) {
      console.log(err);
      throw new ApiError(500, "Erro de acesso ao Banco de Dados.");
    }
  }
}