import { FindAllSubcategoryService } from "./find-all-subcategory.service";
import { InMemorySubcategoryRepo } from "../../../repositories/implementations/in-memory/in-memory-subcategory-repo";
import { Subcategory } from "../../../entities/subcategory";

describe("Find all subcategories", () => {
  let repo: InMemorySubcategoryRepo;
  let service: FindAllSubcategoryService;

  beforeAll(() => {
    repo = new InMemorySubcategoryRepo();
    service = new FindAllSubcategoryService(repo);
  });

  beforeEach(async () => {
    const subcategory = new Subcategory({
      description: "Test",
      categoryId: "categoryIdTest",
    });

    await repo.create(subcategory);
  });

  afterEach(() => {
    repo.setSubcategoriesEmpty();
  });

  it("should be able to find 1 and after post find 2", async () => {
    const subcategory = new Subcategory({
      description: "Test2",
      categoryId: "categoryIdTest",
    });

    expect((await service.execute()).length).toBe(1);

    await repo.create(subcategory);

    expect((await service.execute()).length).toBe(2);
  });

  it("should be able to find empty list", async () => {
    repo.setSubcategoriesEmpty();

    expect((await service.execute()).length).toBe(0);
  });
});
