import { PrismaTransactionCategoryRepo } from "../../repositories/implementations/prisma/prisma-transaction-category-repo";
import { FindAllTransactionCategoryController } from "./findAll/find-all-transaction-category-controller";
import { FindAllTransactionCategoryUseCase } from "./findAll/find-all-transaction-category-usecase";

const repo = new PrismaTransactionCategoryRepo;

const findAllTransactionCategoryUseCase = new FindAllTransactionCategoryUseCase(repo);
const findAllTransactionCategoryController = new FindAllTransactionCategoryController(findAllTransactionCategoryUseCase);

export {
  findAllTransactionCategoryController, findAllTransactionCategoryUseCase
}