import { PrismaTransactionCategoryRepo } from "../../repositories/implementations/prisma/prisma-transaction-category-repo";
import { CreateCategoryController } from "./create/create-category.controller";
import { CreateCategoryService } from "./create/create-category.service";

const repo = new PrismaTransactionCategoryRepo;

const createCategoryService = new CreateCategoryService(repo);
const createCategoryController = new CreateCategoryController(createCategoryService);

export {
  createCategoryController, createCategoryService
}