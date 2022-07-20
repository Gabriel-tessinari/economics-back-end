import { Router } from "express";
import { createTransactionController, findByAccountIdAndDateMonthController } from "../app/useCases/transaction";

const transactionRouter = Router();

transactionRouter.post('/', (req, res) => {
  return createTransactionController.execute(req, res);
});

transactionRouter.get('/account/:accountId/month/:month', (req, res) => {
  return findByAccountIdAndDateMonthController.execute(req, res);
});

export { transactionRouter }