import { TransactionType } from "../../../entities/enums/transaction-type";
import { Transaction } from "../../../entities/transaction";
import { InMemoryTransactionRepo } from "../../../repositories/implementations/in-memory/in-memory-transaction-repo";
import { FindTransactionBySubcategoryIdService } from "./find-transaction-by-subcategoryid.service";

describe("Find transaction by subcategory id", () => {
  let repo: InMemoryTransactionRepo;
  let service: FindTransactionBySubcategoryIdService;
  let subcategoryId = "subcategoryIdTest";

  beforeAll(() => {
    repo = new InMemoryTransactionRepo();
    service = new FindTransactionBySubcategoryIdService(repo);
  });

  beforeEach(async () => {
    const transaction1 = new Transaction({
      description: "Test",
      date: "18/02/2022",
      type: TransactionType.DEBIT,
      value: 18.02,
      accountId: "accountIdTest",
      categoryId: "categoryIdTest",
      subcategoryId: "anySubcategoryId",
    });

    const transaction2 = new Transaction({
      description: "Test",
      date: "18/02/2022",
      type: TransactionType.DEBIT,
      value: 18.02,
      accountId: "accountIdTest",
      categoryId: "categoryIdTest",
      subcategoryId: subcategoryId,
    });

    const transaction3 = new Transaction({
      description: "Test",
      date: "18/02/2022",
      type: TransactionType.DEBIT,
      value: 18.02,
      accountId: "accountIdTest",
      categoryId: "categoryIdTest",
    });

    await repo.create(transaction1);
    await repo.create(transaction2);
    await repo.create(transaction3);
  });

  afterEach(() => {
    repo.setTransactionsEmpty();
  });

  it("should be able to find transactions only with same subcategory id", async () => {
    const response = await service.execute(subcategoryId);

    expect(response.length).toBe(1);
    expect(response[0].subcategoryId).toBe(subcategoryId);
  });

  it("should be able to find empty list", async () => {
    repo.setTransactionsEmpty();
    const response = await service.execute(subcategoryId);

    expect(response.length).toBe(0);
  });
});
