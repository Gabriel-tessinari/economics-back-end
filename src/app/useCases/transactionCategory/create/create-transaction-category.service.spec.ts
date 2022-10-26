import { TransactionCategory } from "../../../entities/transaction-category";
import { InMemoryTransactionCategoryRepo } from "../../../repositories/implementations/in-memory/in-memory-transaction-category-repo";
import { CreateTransactionCategoryUseCase } from "./create-transaction-category-usecase";

describe('Create category', () => {
  let repo: InMemoryTransactionCategoryRepo;
  let useCase: CreateTransactionCategoryUseCase;

  beforeAll(() => {
    repo = new InMemoryTransactionCategoryRepo();
    useCase = new CreateTransactionCategoryUseCase(repo);
  });

  it('should be able to create a category', async () => {
    const category = new TransactionCategory({
      description: 'Test'
    });

    expect((await repo.findAll()).length).toBe(0);
    expect(await useCase.execute(category)).toBeUndefined();

    let response = await repo.findAll();
    expect(response.length).toBe(1);
    expect(response[0]).toHaveProperty('_id');
  });
});