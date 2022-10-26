import { Router } from "express";
import { 
  createCategoryController, 
  deleteCategoryByIdController 
} from "../app/features/category";
import {
  findAllTransactionCategoryController 
} from "../app/useCases/transactionCategory";

const categoryRouter = Router();

categoryRouter.post('/', (req, res) => {
  return createCategoryController.execute(req, res);
});

categoryRouter.delete('/:id', (req, res) => {
  return deleteCategoryByIdController.execute(req, res);
});

categoryRouter.get('/', (req, res) => {
  return findAllTransactionCategoryController.execute(req, res);
});

export { categoryRouter }