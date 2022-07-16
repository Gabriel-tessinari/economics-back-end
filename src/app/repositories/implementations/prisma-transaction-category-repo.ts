import { Category, PrismaClient } from "@prisma/client";
import { TransactionCategory } from "../../entities/transaction-category";
import { ApiError } from "../../utils/api-error";
import { ITransactionCategoryRepo } from "../i-transaction-category-repo";

const prisma = new PrismaClient;

export class PrismaTransactionCategoryRepo implements ITransactionCategoryRepo {
  async findAll(): Promise<TransactionCategory[]> {
    let categories: TransactionCategory[] = [];

    try {
      const response = await prisma.category.findMany({
        orderBy: {
          description: "asc"
        }
      });

      if(response) {
        response.forEach(category => {
          categories.push(this.mapper(category));
        });
      }

      return categories;
    } catch(err: any) {
      throw ApiError.DBAccessError;
    }
  }

  private mapper(categoryDB: Category): TransactionCategory {
    return new TransactionCategory(
      {
        description: categoryDB.description
      },
      categoryDB.id
    );
  }
}
