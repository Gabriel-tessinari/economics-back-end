import { Router } from "express";
import {
  createTransactionController,
  deleteTransactionByIdController,
  findTransactionByAccountIdMonthYearController,
} from "../app/features/transaction";

const transactionRouter = Router();

transactionRouter.post("/", (req, res) => {
  return createTransactionController.execute(req, res);
});

transactionRouter.delete("/:id", (req, res) => {
  return deleteTransactionByIdController.execute(req, res);
});

transactionRouter.get(
  "/account/:accountId/month/:month/year/:year",
  (req, res) => {
    return findTransactionByAccountIdMonthYearController.execute(req, res);
  }
);

export { transactionRouter };
