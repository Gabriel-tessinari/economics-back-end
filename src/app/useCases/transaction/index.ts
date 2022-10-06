import { PrismaTransactionRepo } from "../../repositories/implementations/prisma/prisma-transaction-repo";
import { CreateTransactionController } from "./create/create-transaction-controller";
import { CreateTransactionUseCase } from "./create/create-transaction-usecase";
import { FindByAccountIdAndDateMonthController } from "./findByAccountIdAndDateMonth/find-by-accountid-and-datemonth-controller";
import { FindByAccountIdAndDateMonthUseCase } from "./findByAccountIdAndDateMonth/find-by-accountid-and-datemonth-usecase";

const repo = new PrismaTransactionRepo;

const createTransactionUseCase = new CreateTransactionUseCase(repo);
const createTransactionController = new CreateTransactionController(createTransactionUseCase);

const findByAccountIdAndDateMonthUseCase = new FindByAccountIdAndDateMonthUseCase(repo);
const findByAccountIdAndDateMonthController = new FindByAccountIdAndDateMonthController(findByAccountIdAndDateMonthUseCase);

export {
  createTransactionController, createTransactionUseCase,
  findByAccountIdAndDateMonthController, findByAccountIdAndDateMonthUseCase
}