import { PrismaClient } from "@prisma/client";
import { Category } from "../../../entities/category";
import { ApiError } from "../../../utils/api-error";
import { ICategoryRepo } from "../../i-category-repo";
import { PrismaToEntity } from "./mappers/prismaToEntity";

const prisma = new PrismaClient();

export class PrismaCategoryRepo implements ICategoryRepo {
  async create(category: Category): Promise<Category> {
    let created: Category;

    try {
      const response = await prisma.category.create({
        data: {
          id: category.id,
          description: category.description,
        },
        include: {
          subcategories: true,
        },
      });

      if (response) {
        created = PrismaToEntity.category(response, response.subcategories);
        return created;
      }

      throw ApiError.businessLogicError("Erro ao adicionar categoria.");
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await prisma.category.delete({
        where: {
          id: id,
        },
      });
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async existsByDescription(description: string): Promise<boolean> {
    try {
      return !!(await prisma.category.findFirst({
        where: {
          description: description,
        },
      }));
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async existsById(id: string): Promise<boolean> {
    try {
      return !!(await prisma.category.findFirst({
        where: {
          id: id,
        },
      }));
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async findAll(): Promise<Category[]> {
    let categories: Category[] = [];

    try {
      const response = await prisma.category.findMany({
        orderBy: { description: "asc" },
        include: {
          subcategories: true,
        },
      });

      if (response) {
        response.forEach((category) => {
          categories.push(
            PrismaToEntity.category(category, category.subcategories)
          );
        });
      }

      return categories;
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async hasSubcategory(id: string): Promise<boolean> {
    try {
      const response = await prisma.category.findFirst({
        where: {
          id: id,
        },
        include: {
          subcategories: true,
        },
      });

      if (response) return response.subcategories.length > 0;
      return false;
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }
}
