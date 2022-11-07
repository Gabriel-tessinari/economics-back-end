import { FindAllCategoryService } from "./find-all-category.service";
import { InMemoryCategoryRepo } from "../../../repositories/implementations/in-memory/in-memory-category-repo";
import { Category } from "../../../entities/category";

describe("Find all categories", () => {
  let repo: InMemoryCategoryRepo;
  let service: FindAllCategoryService;

  beforeAll(() => {
    repo = new InMemoryCategoryRepo();
    service = new FindAllCategoryService(repo);
  });

  beforeEach(async () => {
    const category = new Category({
      description: "Test",
    });

    await repo.create(category);
  });

  afterEach(() => {
    repo.setCategoriesEmpty();
  });

  it("should be able to find 1 and after post find 2", async () => {
    const category = new Category({
      description: "Test2",
    });

    expect((await service.execute()).length).toBe(1);

    await repo.create(category);

    expect((await service.execute()).length).toBe(2);
  });

  it("should be able to find empty list", async () => {
    repo.setCategoriesEmpty();

    expect((await service.execute()).length).toBe(0);
  });
});
