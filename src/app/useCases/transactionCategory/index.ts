import { PrismaTransactionCategoryRepo } from "../../repositories/implementations/prisma/prisma-transaction-category-repo";
import { CreateTransactionCategoryController } from "./create/create-transaction-category-controller";
import { CreateTransactionCategoryUseCase } from "./create/create-transaction-category-usecase";
import { DeleteTransactionCategoryByIdController } from "./delete/delete-transaction-category-by-id-controller";
import { DeleteTransactionCategoryByIdUseCase } from "./delete/delete-transaction-category-by-id-usecase";
import { FindAllTransactionCategoryController } from "./find/find-all-transaction-category-controller";
import { FindAllTransactionCategoryUseCase } from "./find/find-all-transaction-category-usecase";

const repo = new PrismaTransactionCategoryRepo;

const createTransactionCategoryUseCase = new CreateTransactionCategoryUseCase(repo);
const createTransactionCategoryController = new CreateTransactionCategoryController(createTransactionCategoryUseCase);

const deleteTransactionCategoryByIdUseCase = new DeleteTransactionCategoryByIdUseCase(repo);
const deleteTransactionCategoryByIdController = new DeleteTransactionCategoryByIdController(deleteTransactionCategoryByIdUseCase);

const findAllTransactionCategoryUseCase = new FindAllTransactionCategoryUseCase(repo);
const findAllTransactionCategoryController = new FindAllTransactionCategoryController(findAllTransactionCategoryUseCase);

export {
  createTransactionCategoryController, createTransactionCategoryUseCase,
  deleteTransactionCategoryByIdController, deleteTransactionCategoryByIdUseCase,
  findAllTransactionCategoryController, findAllTransactionCategoryUseCase
}