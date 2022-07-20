import { PrismaClient } from "@prisma/client";
import { TransactionCategory } from "../../entities/transaction-category";
import { ApiError } from "../../utils/api-error";
import { ITransactionCategoryRepo } from "../i-transaction-category-repo";
import { PrismaToEntity } from "./mappers/prismaToEntity";

const prisma = new PrismaClient;

export class PrismaTransactionCategoryRepo implements ITransactionCategoryRepo {
  async findAll(): Promise<TransactionCategory[]> {
    let categories: TransactionCategory[] = [];

    try {
      const response = await prisma.category.findMany({
        orderBy: { description: "asc" }
      });

      if(response) {
        response.forEach(category => {
          categories.push(PrismaToEntity.category(category));
        });
      }

      return categories;
    } catch(err: any) {
      throw new ApiError(500, "Erro de acesso ao Banco de Dados.");
    }
  }
}
