import { PrismaTransactionCategoryRepo } from "../../repositories/implementations/prisma/prisma-transaction-category-repo";
import { CreateCategoryController } from "./create/create-category.controller";
import { CreateCategoryService } from "./create/create-category.service";
import { DeleteCategoryByIdController } from "./delete/delete-category-by-id.controller";
import { DeleteCategoryByIdService } from "./delete/delete-category-by-id.service";

const repo = new PrismaTransactionCategoryRepo;

const createCategoryService = new CreateCategoryService(repo);
const createCategoryController = new CreateCategoryController(createCategoryService);

const deleteCategoryByIdService = new DeleteCategoryByIdService(repo);
const deleteCategoryByIdController = new DeleteCategoryByIdController(deleteCategoryByIdService);


export {
  createCategoryController, createCategoryService,
  deleteCategoryByIdController, deleteCategoryByIdService
}