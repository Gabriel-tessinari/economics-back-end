import { Category } from "../../../entities/category";
import { InMemoryCategoryRepo } from "../../../repositories/implementations/in-memory/in-memory-category-repo";
import { ApiError } from "../../../utils/api-error";
import { CreateCategoryService } from "./create-category.service";

describe('Create category', () => {
  let repo: InMemoryCategoryRepo;
  let service: CreateCategoryService;
  let reference: Category = new Category({
    description: 'Test'
  });

  beforeAll(() => {
    repo = new InMemoryCategoryRepo();
    service = new CreateCategoryService(repo);
  });

  beforeEach(() => {
    repo.setCategoriesEmpty();
  });

  it('should be able to create a category', async () => {
    const category = new Category({
      description: reference.description
    });

    expect((await repo.findAll()).length).toBe(0);
    expect(await service.execute(category)).toBeUndefined();

    let response = await repo.findAll();
    
    expect(response.length).toBe(1);
    expect(response[0]).toHaveProperty('_id');
    expect(response[0].description).not.toBe(reference.description);
    expect(response[0].description).toBe(reference.description.toLowerCase());
  });

  it('should not be able to create category with same description', async () => {
    const category = new Category({
      description: reference.description.toLowerCase()
    });

    await repo.create(category);
    category.description = reference.description;

    try {
      await service.execute(category);
      throw ApiError.testError();
    } catch(err: any) {
      expect(err.status).toBe(422);
      expect(err.message).toBe('Categoria já existente.');
    }
  });
});