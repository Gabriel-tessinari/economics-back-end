import { Router } from "express";
import { 
  createTransactionController, 
  deleteTransactionByIdController, 
  findByAccountIdAndDateMonthYearController 
} from "../app/useCases/transaction";

const transactionRouter = Router();

transactionRouter.post('/', (req, res) => {
  return createTransactionController.execute(req, res);
});

transactionRouter.delete('/:id', (req, res) => {
  return deleteTransactionByIdController.execute(req, res);
});

transactionRouter.get('/account/:accountId/month/:month/year/:year', (req, res) => {
  return findByAccountIdAndDateMonthYearController.execute(req, res);
});

export { transactionRouter }