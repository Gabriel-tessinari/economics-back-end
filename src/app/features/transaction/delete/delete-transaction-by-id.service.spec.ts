import { TransactionType } from "../../../entities/enums/transaction-type";
import { Transaction } from "../../../entities/transaction";
import { InMemoryTransactionRepo } from "../../../repositories/implementations/in-memory/in-memory-transaction-repo";
import { DeleteTransactionByIdService } from "./delete-transaction-by-id.service";

describe("Create transaction", () => {
  let repo: InMemoryTransactionRepo;
  let service: DeleteTransactionByIdService;
  let id: string;
  let month = "02";
  let year = 2022;
  let monthYear = "/" + month + "/" + year;
  let date = "18" + monthYear;
  let accountId = "accountId";

  beforeAll(() => {
    repo = new InMemoryTransactionRepo();
    service = new DeleteTransactionByIdService(repo);
  });

  beforeEach(async () => {
    const transaction1 = new Transaction({
      description: "toStay",
      date: date,
      type: TransactionType.DEBIT,
      value: 18.02,
      accountId: accountId,
      categoryId: "categoryIdTest",
    });

    const transaction2 = new Transaction({
      description: "toDelete",
      date: date,
      type: TransactionType.DEBIT,
      value: 18.02,
      accountId: accountId,
      categoryId: "categoryIdTest",
    });

    await repo.create(transaction1);
    await repo.create(transaction2);

    id = (await repo.findByAccountIdMonthYear(accountId, monthYear))[1].id;
  });

  afterEach(() => {
    repo.setTransactionsEmpty();
  });

  it("should be able to delete a transaction", async () => {
    const spy = jest.spyOn(repo, "findById");

    expect(
      (await repo.findByAccountIdMonthYear(accountId, monthYear)).length
    ).toBe(2);
    expect(await service.execute(id)).toBeUndefined();
    expect(spy).toBeCalledTimes(1);

    const response = await repo.findByAccountIdMonthYear(accountId, monthYear);
    expect(response.length).toBe(1);
    expect(response[0].description).toBe("toStay");

    spy.mockRestore();
  });

  it("should return undefined when do not find by id", async () => {
    const spy = jest.spyOn(repo, "deleteById");
    const id = "notAnIdInTheList";

    expect(
      (await repo.findByAccountIdMonthYear(accountId, monthYear)).length
    ).toBe(2);
    expect(await service.execute(id)).toBeUndefined();
    expect(spy).toBeCalledTimes(0);
    expect(
      (await repo.findByAccountIdMonthYear(accountId, monthYear)).length
    ).toBe(2);

    spy.mockRestore();
  });
});
