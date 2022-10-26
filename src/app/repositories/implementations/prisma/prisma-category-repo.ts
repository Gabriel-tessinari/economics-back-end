import { PrismaClient } from "@prisma/client";
import { TransactionCategory } from "../../../entities/transaction-category";
import { ApiError } from "../../../utils/api-error";
import { ICategoryRepo } from "../../i-category-repo";
import { PrismaToEntity } from "./mappers/prismaToEntity";

const prisma = new PrismaClient;

export class PrismaCategoryRepo implements ICategoryRepo {
  async create(category: TransactionCategory): Promise<void> {
    try {
      await prisma.category.create({
        data: {
          id: category.id,
          description: category.description
        }
      });
    } catch(err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await prisma.category.delete({
        where: {
          id: id
        }
      });
    } catch(err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }
  
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
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async findById(id: string): Promise<TransactionCategory | null> {
    try {
      const response = await prisma.category.findFirst({
        where: {
          id: id
        }
      });

      if(response) return PrismaToEntity.category(response);
      return null;
    } catch(err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }
}
