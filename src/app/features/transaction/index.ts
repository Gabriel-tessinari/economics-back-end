import { PrismaTransactionRepo } from "../../repositories/implementations/prisma/prisma-transaction-repo";
import { CreateTransactionController } from "./create/create-transaction.controller";
import { CreateTransactionService } from "./create/create-transaction.service";
import { DeleteTransactionByIdController } from "./delete/delete-transaction-by-id.controller";
import { DeleteTransactionByIdService } from "./delete/delete-transaction-by-id.service";
import { FindTransactionByAccountIdMonthYearController } from "./find/find-transaction-by-accountid-month-year.controller";
import { FindTransactionByAccountIdMonthYearService } from "./find/find-transaction-by-accountid-month-year.service";
import { FindTransactionByAccountIdService } from "./find/find-transaction-by-accountid.service";
import { FindTransactionByCategoryIdService } from "./find/find-transaction-by-categoryid.service";

const repo = new PrismaTransactionRepo();

const createTransactionService = new CreateTransactionService(repo);
const createTransactionController = new CreateTransactionController(
  createTransactionService
);

const deleteTransactionByIdService = new DeleteTransactionByIdService(repo);
const deleteTransactionByIdController = new DeleteTransactionByIdController(
  deleteTransactionByIdService
);

const findTransactionByAccountIdMonthYearService =
  new FindTransactionByAccountIdMonthYearService(repo);
const findTransactionByAccountIdMonthYearController =
  new FindTransactionByAccountIdMonthYearController(
    findTransactionByAccountIdMonthYearService
  );

const findTransactionByAccountIdService = new FindTransactionByAccountIdService(
  repo
);
const findTransactionByCategoryId = new FindTransactionByCategoryIdService(
  repo
);

export {
  createTransactionController,
  createTransactionService,
  deleteTransactionByIdController,
  deleteTransactionByIdService,
  findTransactionByAccountIdMonthYearController,
  findTransactionByAccountIdMonthYearService,
  findTransactionByAccountIdService,
  findTransactionByCategoryId,
};
