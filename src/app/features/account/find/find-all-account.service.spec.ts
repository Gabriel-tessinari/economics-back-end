import { FindAllAccountService } from "./find-all-account.service";
import { InMemoryAccountRepo } from "../../../repositories/implementations/in-memory/in-memory-account-repo";
import { Account } from "../../../entities/account";

describe("Find all accounts", () => {
  let repo: InMemoryAccountRepo;
  let service: FindAllAccountService;

  beforeAll(() => {
    repo = new InMemoryAccountRepo();
    service = new FindAllAccountService(repo);
  });

  beforeEach(async () => {
    const account = new Account({
      description: "Test",
      total: 18.02,
    });

    await repo.create(account);
  });

  afterEach(() => {
    repo.setAccountsEmpty();
  });

  it("should be able to find 1 and after post find 2", async () => {
    const account = new Account({
      description: "Test2",
      total: 19.93,
    });

    expect((await service.execute()).length).toBe(1);

    await repo.create(account);

    expect((await service.execute()).length).toBe(2);
  });

  it("should be able to find empty list", async () => {
    repo.setAccountsEmpty();

    expect((await service.execute()).length).toBe(0);
  });
});
