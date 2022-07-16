import { Router } from "express";
import { findAllTransactionCategoryController } from "../app/useCases/transactionCategory";

const transactionCategoryRouter = Router();

transactionCategoryRouter.get('/', (req, res) => {
  return findAllTransactionCategoryController.execute(req, res);
});

export { transactionCategoryRouter }