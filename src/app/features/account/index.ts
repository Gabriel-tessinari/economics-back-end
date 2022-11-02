import { PrismaAccountRepo } from "../../repositories/implementations/prisma/prisma-account-repo";
import { findTransactionByAccountIdService } from "../transaction";
import { CreateAccountController } from "./create/create-account.controller";
import { CreateAccountService } from "./create/create-account.service";
import { DeleteAccountByIdController } from "./delete/delete-account-by-id.controller";
import { DeleteAccountByIdService } from "./delete/delete-account-by-id.service";
import { FindAllAccountController } from "./find/find-all-account.controller";
import { FindAllAccountService } from "./find/find-all-account.service";

const repo = new PrismaAccountRepo();

const createAccountService = new CreateAccountService(repo);
const createAccountController = new CreateAccountController(
  createAccountService
);

const deleteAccountByIdService = new DeleteAccountByIdService(
  repo,
  findTransactionByAccountIdService
);
const deleteAccountByIdController = new DeleteAccountByIdController(
  deleteAccountByIdService
);

const findAllAccountService = new FindAllAccountService(repo);
const findAllAccountController = new FindAllAccountController(
  findAllAccountService
);

export {
  createAccountController,
  createAccountService,
  deleteAccountByIdController,
  deleteAccountByIdService,
  findAllAccountController,
  findAllAccountService,
};
