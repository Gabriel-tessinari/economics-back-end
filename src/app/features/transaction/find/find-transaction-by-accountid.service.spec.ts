import { TransactionType } from "../../../entities/enums/transaction-type";
import { Transaction } from "../../../entities/transaction";
import { InMemoryTransactionRepo } from "../../../repositories/implementations/in-memory/in-memory-transaction-repo";
import { FindTransactionByAccountIdService } from "./find-transaction-by-accountid.service";

describe("Find transaction by account id", () => {
  let repo: InMemoryTransactionRepo;
  let service: FindTransactionByAccountIdService;
  let accountId = "accountIdTest";

  beforeAll(() => {
    repo = new InMemoryTransactionRepo();
    service = new FindTransactionByAccountIdService(repo);
  });

  beforeEach(async () => {
    const transaction1 = new Transaction({
      description: "Test",
      date: "18/02/2022",
      type: TransactionType.DEBIT,
      value: 18.02,
      accountId: "otherAccountId",
      categoryId: "categoryIdTest",
    });

    const transaction2 = new Transaction({
      description: "Test",
      date: "18/02/2022",
      type: TransactionType.DEBIT,
      value: 18.02,
      accountId: accountId,
      categoryId: "categoryIdTest",
    });

    await repo.create(transaction1);
    await repo.create(transaction2);
  });

  afterEach(() => {
    repo.setTransactionsEmpty();
  });

  it("should be able to find transactions only with same account id", async () => {
    const response = await service.execute(accountId);

    expect(response.length).toBe(1);
    expect(response[0].accountId).toBe(accountId);
  });

  it("should be able to find empty list", async () => {
    repo.setTransactionsEmpty();
    const response = await service.execute(accountId);

    expect(response.length).toBe(0);
  });
});
