import { Category } from "../../../entities/category";
import { InMemoryCategoryRepo } from "../../../repositories/implementations/in-memory/in-memory-category-repo";
import { ApiError } from "../../../utils/api-error";
import { CreateCategoryService } from "./create-category.service";

describe('Create category', () => {
  let repo: InMemoryCategoryRepo;
  let service: CreateCategoryService;

  beforeAll(() => {
    repo = new InMemoryCategoryRepo();
    service = new CreateCategoryService(repo);
  });

  beforeEach(() => {
    repo.setCategoriesEmpty();
  });

  it('should be able to create a category', async () => {
    const category = new Category({
      description: 'Test'
    });

    expect((await repo.findAll()).length).toBe(0);
    expect(await service.execute(category)).toBeUndefined();

    let response = await repo.findAll();
    expect(response.length).toBe(1);
    expect(response[0]).toHaveProperty('_id');
  });

  it('should not be able to create category with same description', async () => {
    const category = new Category({
      description: 'Test'
    });

    await repo.create(category);

    try {
      await service.execute(category);
      throw new ApiError(422, 'Falha no teste.');
    } catch(err: any) {
      expect(err.message).toBe('Erro de acesso ao Banco de Dados.');
      expect(err.status).toBe(500);
    }
  });
});