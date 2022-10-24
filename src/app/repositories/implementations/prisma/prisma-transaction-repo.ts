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

  async deleteById(id: string) {
    try {
      await prisma.transaction.delete({
        where: {
          id: id
        }
      });
    } catch(err: any) {
      console.log(err);
      throw new ApiError(500, "Erro de acesso ao Banco de Dados.");
    }
  }

  async findByAccountIdAndDateMonthYear(accountId: string, monthYear: string): Promise<Transaction[]> {
    let transactions: Transaction[] = [];

    try {
      const response = await prisma.transaction.findMany({
        where: {
          accountId: accountId,
          date: { contains: monthYear }
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

  async findById(id: string): Promise<Transaction | null> {
    try {
      const response = await prisma.transaction.findFirst({
        where: {
          id: id
        },
        include: {
          account: true,
          category: true,
          subcategory: true
        }
      });

      if(response) {
        return PrismaToEntity.transaction(
          response,
          response.account,
          response.category,
          response.subcategory
        )
      }

      return null;
    } catch(err: any) {
      console.log(err);
      throw new ApiError(500, "Erro de acesso ao Banco de Dados.");
    }
  }
}