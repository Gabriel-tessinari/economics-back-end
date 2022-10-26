import { Router } from "express";
import { createCategoryController } from "../app/features/category";
import { 
  createTransactionCategoryController, 
  deleteTransactionCategoryByIdController, 
  findAllTransactionCategoryController 
} from "../app/useCases/transactionCategory";

const transactionCategoryRouter = Router();

transactionCategoryRouter.post('/', (req, res) => {
  return createCategoryController.execute(req, res);
});

transactionCategoryRouter.delete('/:id', (req, res) => {
  return deleteTransactionCategoryByIdController.execute(req, res);
});

transactionCategoryRouter.get('/', (req, res) => {
  return findAllTransactionCategoryController.execute(req, res);
});

export { transactionCategoryRouter }