import { Router } from "express";
import { createAccountController, findAllAccountController } from "../app/useCases/account";

const accountRouter = Router();

accountRouter.get('/', (req, res) => {
  return findAllAccountController.execute(req, res);
});

accountRouter.post('/', (req, res) => {
  return createAccountController.execute(req, res);
});

export { accountRouter }