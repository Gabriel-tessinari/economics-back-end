import { TransactionType } from "../../../entities/enums/transaction-type";
import { Transaction } from "../../../entities/transaction";
import { InMemoryTransactionRepo } from "../../../repositories/implementations/in-memory/in-memory-transaction-repo";
import { FindTransactionByAccountIdMonthYearService } from "./find-transaction-by-accountid-month-year.service";

describe("Find transaction by account id and date month year", () => {
  let repo: InMemoryTransactionRepo;
  let service: FindTransactionByAccountIdMonthYearService;
  let accountId = "accountIdTest";
  let month = "10";
  let year = 2022;
  let monthYear = "/" + month + "/" + year;
  let date = "24" + monthYear;

  beforeAll(() => {
    repo = new InMemoryTransactionRepo();
    service = new FindTransactionByAccountIdMonthYearService(repo);
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
      date: date,
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

  it("should be able to find a transaction by account id and date month year", async () => {
    const response = await service.execute(accountId, month, year);

    expect(response.length).toBe(1);
    expect(response[0].date).toBe(date);
    expect(response[0].accountId).toBe(accountId);
  });

  it("should be able to find empty list", async () => {
    repo.setTransactionsEmpty();
    const response = await service.execute(accountId, month, year);

    expect(response.length).toBe(0);
  });

  it("should not be able to find a transaction if account id does not exist but date month year exists", async () => {
    let id = "differentId";
    const response = await service.execute(id, month, year);

    expect(response.length).toBe(0);
  });

  it("should not be able to find a transaction if date month does not exist but account id exists", async () => {
    let dateMonth = "12";
    const response = await service.execute(accountId, dateMonth, year);

    expect(response.length).toBe(0);
  });

  it("should not be able to find a transaction if date year does not exist but account id exists", async () => {
    let dateYear = 2023;
    const response = await service.execute(accountId, month, dateYear);

    expect(response.length).toBe(0);
  });
});
