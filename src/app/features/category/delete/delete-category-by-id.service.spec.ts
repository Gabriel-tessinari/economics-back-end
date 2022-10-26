import { DeleteCategoryByIdService } from "./delete-category-by-id.service";
import { InMemoryCategoryRepo } from "../../../repositories/implementations/in-memory/in-memory-category-repo";
import { TransactionCategory } from "../../../entities/transaction-category";

describe('Delete category by id', () => {
  let repo: InMemoryCategoryRepo;
  let service: DeleteCategoryByIdService;
  let id: string | undefined;

  beforeAll(() => {
    repo = new InMemoryCategoryRepo();
    service = new DeleteCategoryByIdService(repo);
  });

  beforeEach(async () => {
    const category1 = new TransactionCategory({
      description: 'toStay'
    });

    const category2 = new TransactionCategory({
      description: 'toDelete'
    });

    await repo.create(category1);
    await repo.create(category2);

    id = (await repo.findAll())[1].id;
  });

  afterEach(() => {
    repo.setCategoriesEmpty();
  });

  it('should be able to delete a category', async () => {
    const spy = jest.spyOn(repo, 'findById');

    if(id) {
      expect((await repo.findAll()).length).toBe(2);
      expect(await service.execute(id)).toBeUndefined();
      expect(spy).toBeCalledTimes(1);
    }
    
    const response = await repo.findAll();
    expect(response.length).toBe(1);
    expect(response[0].description).toBe('toStay');

    spy.mockRestore();
  });

  it('should return undefined when do not find by id', async () => {
    const spy = jest.spyOn(repo, 'deleteById');
    const id = 'notAnIdInTheList';

    expect((await repo.findAll()).length).toBe(2);
    expect(await service.execute(id)).toBeUndefined();
    expect(spy).toBeCalledTimes(0);
    expect((await repo.findAll()).length).toBe(2);

    spy.mockRestore();
  });
});