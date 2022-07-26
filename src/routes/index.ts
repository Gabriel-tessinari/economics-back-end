import { Router } from "express";
import { accountRouter } from "./account.routes";
import { reportRouter } from "./report.routes";
import { transactionCategoryRouter } from "./transaction-category.routes";
import { transactionRouter } from "./transaction.routes";

const routes = Router();

routes.use('/account', accountRouter);
routes.use('/category', transactionCategoryRouter);
routes.use('/report', reportRouter);
routes.use('/transaction', transactionRouter);

export { routes }