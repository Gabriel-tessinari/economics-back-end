import { Router } from "express";
import {
  createAccountController,
  deleteAccountByIdController,
  findAllAccountController,
} from "../app/features/account";

const accountRouter = Router();

accountRouter.delete("/:id", (req, res) => {
  return deleteAccountByIdController.execute(req, res);
});

accountRouter.get("/", (req, res) => {
  return findAllAccountController.execute(req, res);
});

accountRouter.post("/", (req, res) => {
  return createAccountController.execute(req, res);
});

export { accountRouter };
