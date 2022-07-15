import { Router } from "express";
import { createTransactionController } from "../app/useCases/transaction";

const transactionRouter = Router();

transactionRouter.post('/', (req, res) => {
  return createTransactionController.execute(req, res);
});

export { transactionRouter }