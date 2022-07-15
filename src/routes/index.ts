import { Router } from "express";
import { transactionRouter } from "./transaction.routes";

const routes = Router();

routes.use('/transaction', transactionRouter);

export { routes }