import { TransactionType } from "../../../entities/enums/transaction-type";
import { Transaction } from "../../../entities/transaction";
import { InMemoryTransactionRepo } from "../../../repositories/implementations/in-memory/in-memory-transaction-repo";
import { FindTransactionByCategoryIdService } from "./find-transaction-by-categoryid.service";

describe("Find transaction by category id", () => {
  let repo: InMemoryTransactionRepo;
  let service: FindTransactionByCategoryIdService;
  let categoryId = "categoryIdTest";

  beforeAll(() => {
    repo = new InMemoryTransactionRepo();
    service = new FindTransactionByCategoryIdService(repo);
  });

  beforeEach(async () => {
    const transaction1 = new Transaction({
      description: "Test",
      date: "18/02/2022",
      type: TransactionType.DEBIT,
      value: 18.02,
      accountId: "accountIdTest",
      categoryId: "otherCategoryIdTest",
    });

    const transaction2 = new Transaction({
      description: "Test",
      date: "18/02/2022",
      type: TransactionType.DEBIT,
      value: 18.02,
      accountId: "accountIdTest",
      categoryId: categoryId,
    });

    await repo.create(transaction1);
    await repo.create(transaction2);
  });

  afterEach(() => {
    repo.setTransactionsEmpty();
  });

  it("should be able to find transactions only with same category id", async () => {
    const response = await service.execute(categoryId);

    expect(response.length).toBe(1);
    expect(response[0].categoryId).toBe(categoryId);
  });

  it("should be able to find empty list", async () => {
    repo.setTransactionsEmpty();
    const response = await service.execute(categoryId);

    expect(response.length).toBe(0);
  });
});
