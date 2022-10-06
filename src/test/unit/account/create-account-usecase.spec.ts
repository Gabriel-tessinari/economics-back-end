import { Account } from "../../../app/entities/account";
import { InMemoryAccountRepo } from "../../../app/repositories/implementations/in-memory/in-memory-account-repo";
import { CreateAccountUseCase } from "../../../app/useCases/account/create/create-account-usecase";
import { ApiError } from "../../../app/utils/api-error";

describe('Create account', () => {
  let repo: InMemoryAccountRepo;
  let useCase: CreateAccountUseCase;

  beforeAll(() => {
    repo = new InMemoryAccountRepo();
    useCase = new CreateAccountUseCase(repo);
  });

  it('should be able to create an account', async () => {
    const account = new Account({
      description: 'Test',
      total: 18.02
    });

    expect((await repo.findAll()).length).toBe(0);
    expect(await useCase.execute(account)).toBeUndefined();
    expect((await repo.findAll()).length).toBe(1);
  });

  it('should not be able to create an existing account', async () => {
    const account = new Account({
      description: 'Test Existing',
      total: 18.02
    });

    await useCase.execute(account);

    await expect(useCase.execute(account)).rejects
    .toEqual(new ApiError(422, "Conta já existente."));
  });
});