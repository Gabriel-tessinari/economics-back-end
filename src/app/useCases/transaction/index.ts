import { PrismaTransactionRepo } from "../../repositories/implementations/prisma-transaction-repo";
import { CreateTransactionController } from "./create/create-transaction-controller";
import { CreateTransactionUseCase } from "./create/create-transaction-usecase";

const repo = new PrismaTransactionRepo;

const createTransactionUseCase = new CreateTransactionUseCase(repo);
const createTransactionController = new CreateTransactionController(createTransactionUseCase);

export {
  createTransactionController, createTransactionUseCase
}