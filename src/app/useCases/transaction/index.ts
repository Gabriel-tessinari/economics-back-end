import { PrismaTransactionRepo } from "../../repositories/implementations/prisma/prisma-transaction-repo";
import { CreateTransactionController } from "./create/create-transaction-controller";
import { CreateTransactionUseCase } from "./create/create-transaction-usecase";
import { FindByAccountIdAndDateMonthYearController } from "./findByAccountIdAndDateMonthYear/find-by-accountid-and-datemonthyear-controller";
import { FindByAccountIdAndDateMonthYearUseCase } from "./findByAccountIdAndDateMonthYear/find-by-accountid-and-datemonthyear-usecase";

const repo = new PrismaTransactionRepo;

const createTransactionUseCase = new CreateTransactionUseCase(repo);
const createTransactionController = new CreateTransactionController(createTransactionUseCase);

const findByAccountIdAndDateMonthYearUseCase = new FindByAccountIdAndDateMonthYearUseCase(repo);
const findByAccountIdAndDateMonthYearController = new FindByAccountIdAndDateMonthYearController(findByAccountIdAndDateMonthYearUseCase);

export {
  createTransactionController, createTransactionUseCase,
  findByAccountIdAndDateMonthYearController, findByAccountIdAndDateMonthYearUseCase
}