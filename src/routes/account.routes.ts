import { Router } from "express";
import { findAllAccountController } from "../app/useCases/account";

const accountRouter = Router();

accountRouter.get('/', (req, res) => {
  return findAllAccountController.execute(req, res);
});

export { accountRouter }