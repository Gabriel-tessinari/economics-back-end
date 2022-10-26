import { PrismaTransactionCategoryRepo } from "../../repositories/implementations/prisma/prisma-transaction-category-repo";
import { FindAllTransactionCategoryController } from "./find/find-all-transaction-category-controller";
import { FindAllTransactionCategoryUseCase } from "./find/find-all-transaction-category-usecase";

const repo = new PrismaTransactionCategoryRepo;

const findAllTransactionCategoryUseCase = new FindAllTransactionCategoryUseCase(repo);
const findAllTransactionCategoryController = new FindAllTransactionCategoryController(findAllTransactionCategoryUseCase);

export {
  findAllTransactionCategoryController, findAllTransactionCategoryUseCase
}