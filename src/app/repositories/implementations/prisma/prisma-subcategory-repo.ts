import { PrismaClient } from "@prisma/client";
import { Subcategory } from "../../../entities/subcategory";
import { ApiError } from "../../../utils/api-error";
import { ISubcategoryRepo } from "../../i-subcategory-repo";
import { PrismaToEntity } from "./mappers/prismaToEntity";

const prisma = new PrismaClient();

export class PrismaSubcategoryRepo implements ISubcategoryRepo {
  async create(subcategory: Subcategory): Promise<void> {
    try {
      await prisma.subcategory.create({
        data: {
          id: subcategory.id,
          description: subcategory.description,
          categoryId: subcategory.categoryId,
        },
      });
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await prisma.subcategory.delete({
        where: {
          id: id,
        },
      });
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async findAll(): Promise<Subcategory[]> {
    let subcategories: Subcategory[] = [];

    try {
      const response = await prisma.subcategory.findMany({
        orderBy: [{ categoryId: "asc" }, { description: "asc" }],
        include: {
          category: true,
        },
      });

      if (response) {
        response.forEach((subcategory) => {
          subcategories.push(
            PrismaToEntity.subcategory(subcategory, subcategory.category)
          );
        });
      }

      return subcategories;
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async findByCategoryId(categoryId: string): Promise<Subcategory[]> {
    let subcategories: Subcategory[] = [];

    try {
      const response = await prisma.subcategory.findMany({
        where: {
          categoryId: categoryId,
        },
        orderBy: { description: "asc" },
        include: {
          category: true,
        },
      });

      if (response) {
        response.forEach((subcategory) => {
          subcategories.push(
            PrismaToEntity.subcategory(subcategory, subcategory.category)
          );
        });
      }

      return subcategories;
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async findByDescription(description: string): Promise<Subcategory | null> {
    try {
      const response = await prisma.subcategory.findFirst({
        where: {
          description: description,
        },
      });

      if (response) return PrismaToEntity.subcategory(response);
      return null;
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }

  async findById(id: string): Promise<Subcategory | null> {
    try {
      const response = await prisma.subcategory.findFirst({
        where: {
          id: id,
        },
      });

      if (response) return PrismaToEntity.subcategory(response);
      return null;
    } catch (err: any) {
      console.log(err);
      throw ApiError.errorToAccessDB();
    }
  }
}
