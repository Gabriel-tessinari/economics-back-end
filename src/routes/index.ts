import { Router } from "express";
import { transactionCategoryRouter } from "./transaction-category.routes";
import { transactionRouter } from "./transaction.routes";

const routes = Router();

routes.use('/transaction', transactionRouter);
routes.use('/category', transactionCategoryRouter);

export { routes }