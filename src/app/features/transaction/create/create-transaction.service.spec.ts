import { TransactionType } from "../../../entities/enums/transaction-type";
import { Transaction } from "../../../entities/transaction";
import { InMemoryTransactionRepo } from "../../../repositories/implementations/in-memory/in-memory-transaction-repo";
import { CreateTransactionService } from "./create-transaction.service";

describe("Create transaction", () => {
  let repo: InMemoryTransactionRepo;
  let service: CreateTransactionService;

  beforeAll(() => {
    repo = new InMemoryTransactionRepo();
    service = new CreateTransactionService(repo);
  });

  it("should be able to create a transaction", async () => {
    const accountId: string = "accountIdTest";
    const monthYear: string = "10/2022";
    const transaction = new Transaction({
      description: "Test",
      date: "23/" + monthYear,
      type: TransactionType.DEBIT,
      value: 18.02,
      accountId: accountId,
      categoryId: "categoryIdTest",
    });

    expect(
      (await repo.findByAccountIdMonthYear(accountId, monthYear)).length
    ).toBe(0);
    expect(await service.execute(transaction)).toBeUndefined();
    expect(
      (await repo.findByAccountIdMonthYear(accountId, monthYear)).length
    ).toBe(1);
  });
});
