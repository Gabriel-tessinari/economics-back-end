import { Router } from "express";
import { 
  createTransactionCategoryController, 
  deleteTransactionCategoryByIdController, 
  findAllTransactionCategoryController 
} from "../app/useCases/transactionCategory";

const transactionCategoryRouter = Router();

transactionCategoryRouter.post('/', (req, res) => {
  return createTransactionCategoryController.execute(req, res);
});

transactionCategoryRouter.delete('/:id', (req, res) => {
  return deleteTransactionCategoryByIdController.execute(req, res);
});

transactionCategoryRouter.get('/', (req, res) => {
  return findAllTransactionCategoryController.execute(req, res);
});

export { transactionCategoryRouter }