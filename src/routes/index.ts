import { Router } from "express";
import { accountRouter } from "./account.routes";
import { reportRouter } from "./report.routes";
import { categoryRouter } from "./category.routes";
import { transactionRouter } from "./transaction.routes";

const routes = Router();

routes.use('/account', accountRouter);
routes.use('/category', categoryRouter);
routes.use('/report', reportRouter);
routes.use('/transaction', transactionRouter);

export { routes }