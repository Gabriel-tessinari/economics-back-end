import { DeleteAccountByIdService } from "./delete-account-by-id.service";
import { InMemoryAccountRepo } from "../../../repositories/implementations/in-memory/in-memory-account-repo";
import { Account } from "../../../entities/account";
import { InMemoryTransactionRepo } from "../../../repositories/implementations/in-memory/in-memory-transaction-repo";
import { FindTransactionByAccountIdService } from "../../transaction/find/find-transaction-by-accountid.service";
import { ApiError } from "../../../utils/api-error";
import { Transaction } from "../../../entities/transaction";

describe("Delete account by id", () => {
  let repo: InMemoryAccountRepo;
  let service: DeleteAccountByIdService;
  let transactionRepo: InMemoryTransactionRepo;
  let transactionService: FindTransactionByAccountIdService;
  let id: string | undefined;

  beforeAll(() => {
    repo = new InMemoryAccountRepo();
    transactionRepo = new InMemoryTransactionRepo();
    transactionService = new FindTransactionByAccountIdService(transactionRepo);
    service = new DeleteAccountByIdService(repo, transactionService);
  });

  beforeEach(async () => {
    const account1 = new Account({
      description: "toStay",
      total: 18.02,
    });

    const account2 = new Account({
      description: "toDelete",
      total: 18.02,
    });

    await repo.create(account1);
    await repo.create(account2);

    id = (await repo.findAll())[1].id;
  });

  afterEach(() => {
    repo.setAccountsEmpty();
    transactionRepo.setTransactionsEmpty();
  });

  it("should be able to delete a account", async () => {
    const spy = jest.spyOn(repo, "findById");
    const spy2 = jest.spyOn(transactionService, "execute");

    if (id) {
      expect((await repo.findAll()).length).toBe(2);
      expect(await service.execute(id)).toBeUndefined();
      expect(spy).toBeCalledTimes(1);
      expect(spy2).toBeCalledTimes(1);
    }

    const response = await repo.findAll();
    expect(response.length).toBe(1);
    expect(response[0].description).toBe("toStay");

    spy.mockRestore();
    spy2.mockRestore();
  });

  it("should return undefined when do not find by id", async () => {
    const spy = jest.spyOn(repo, "deleteById");
    const spy2 = jest.spyOn(transactionService, "execute");
    const id = "notAnIdInTheList";

    expect((await repo.findAll()).length).toBe(2);
    expect(await service.execute(id)).toBeUndefined();
    expect(spy).toBeCalledTimes(0);
    expect(spy2).toBeCalledTimes(0);
    expect((await repo.findAll()).length).toBe(2);

    spy.mockRestore();
    spy2.mockRestore();
  });

  it("should throw error if exists transaction of the account", async () => {
    let transaction = Transaction.fake();
    if (id) {
      transaction.accountId = id;
      transactionRepo.create(transaction);

      try {
        await service.execute(id);
        throw ApiError.testError();
      } catch (err: any) {
        expect(err.status).toBe(422);
        expect(err.message).toBe(
          "Existe transação dessa conta. Não é possível deletá-la."
        );
      }
    }
  });
});
