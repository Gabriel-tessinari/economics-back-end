import { Account } from "../../../../app/entities/account";
import { InMemoryAccountRepo } from "../../../../app/repositories/implementations/in-memory/in-memory-account-repo";
import { CreateAccountService } from "../../../../app/features/account/create/create-account.service";
import { ApiError } from "../../../../app/utils/api-error";

describe("Create account", () => {
  let repo: InMemoryAccountRepo;
  let service: CreateAccountService;
  let reference = new Account({
    description: "Test",
    total: 18.02,
  });

  beforeAll(() => {
    repo = new InMemoryAccountRepo();
    service = new CreateAccountService(repo);
  });

  beforeEach(() => {
    repo.setAccountsEmpty();
  });

  it("should be able to create an account", async () => {
    const account = new Account({
      description: reference.description,
      total: 18.02,
    });

    expect((await repo.findAll()).length).toBe(0);
    expect(await service.execute(account)).toBeUndefined();

    let response = await repo.findAll();
    expect(response.length).toBe(1);
    expect(response[0]).toHaveProperty("_id");
    expect(response[0].description).not.toBe(reference.description);
    expect(response[0].description).toBe(reference.description.toUpperCase());
  });

  it("should not be able to create an existing account", async () => {
    const account = new Account({
      description: reference.description.toUpperCase(),
      total: 18.02,
    });

    await repo.create(account);
    account.description = reference.description;

    try {
      await service.execute(account);
      throw ApiError.testError();
    } catch (err: any) {
      expect(err.status).toBe(422);
      expect(err.message).toBe("Conta já existente.");
    }
  });
});
