import { Router } from "express";
import { reportRouter } from "./report.routes";
import { transactionCategoryRouter } from "./transaction-category.routes";
import { transactionRouter } from "./transaction.routes";

const routes = Router();

routes.use('/transaction', transactionRouter);
routes.use('/category', transactionCategoryRouter);
routes.use('/report', reportRouter);

export { routes }