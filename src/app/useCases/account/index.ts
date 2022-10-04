import { PrismaAccountRepo } from "../../repositories/implementations/prisma-account-repo";
import { CreateAccountController } from "./create/create-account-controller";
import { CreateAccountUseCase } from "./create/create-account-usecase";
import { DeleteAccountByIdController } from "./delete/delete-account-by-id-controller";
import { DeleteAccountByIdUseCase } from "./delete/delete-account-by-id-usecase";
import { FindAllAccountController } from "./findAll/find-all-account-controller";
import { FindAllAccountUseCase } from "./findAll/find-all-account-usecase";

const repo = new PrismaAccountRepo;

const createAccountUseCase = new CreateAccountUseCase(repo);
const createAccountController = new CreateAccountController(createAccountUseCase);

const deleteAccountByIdUseCase = new DeleteAccountByIdUseCase(repo);
const deleteAccountByIdController = new DeleteAccountByIdController(deleteAccountByIdUseCase);

const findAllAccountUseCase = new FindAllAccountUseCase(repo);
const findAllAccountController = new FindAllAccountController(findAllAccountUseCase);

export {
  createAccountController, createAccountUseCase,
  deleteAccountByIdController, deleteAccountByIdUseCase,
  findAllAccountController, findAllAccountUseCase
}