import { PrismaAccountRepo } from "../../repositories/implementations/prisma-account-repo";
import { FindAllAccountController } from "./findAll/find-all-account-controller";
import { FindAllAccountUseCase } from "./findAll/find-all-account-usecase";

const repo = new PrismaAccountRepo;

const findAllAccountUseCase = new FindAllAccountUseCase(repo);
const findAllAccountController = new FindAllAccountController(findAllAccountUseCase);

export {
  findAllAccountController, findAllAccountUseCase
}