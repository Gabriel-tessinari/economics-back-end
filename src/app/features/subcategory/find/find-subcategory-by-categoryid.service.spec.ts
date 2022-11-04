import { Subcategory } from "../../../entities/subcategory";
import { InMemorySubcategoryRepo } from "../../../repositories/implementations/in-memory/in-memory-subcategory-repo";
import { FindSubcategoryByCategoryIdService } from "../find/find-subcategory-by-categoryid.service";

describe("Find subcategory by category id", () => {
  let repo: InMemorySubcategoryRepo;
  let service: FindSubcategoryByCategoryIdService;
  let categoryId = "categoryIdTest";

  beforeAll(() => {
    repo = new InMemorySubcategoryRepo();
    service = new FindSubcategoryByCategoryIdService(repo);
  });

  beforeEach(async () => {
    const subcategory1 = new Subcategory({
      description: "Test",
      categoryId: "otherCategoryIdTest",
    });

    const subcategory2 = new Subcategory({
      description: "Test2",
      categoryId: categoryId,
    });

    await repo.create(subcategory1);
    await repo.create(subcategory2);
  });

  afterEach(() => {
    repo.setSubcategoriesEmpty();
  });

  it("should be able to find subcategory only with same category id", async () => {
    const response = await service.execute(categoryId);

    expect(response.length).toBe(1);
    expect(response[0].categoryId).toBe(categoryId);
  });

  it("should be able to find empty list", async () => {
    repo.setSubcategoriesEmpty();
    const response = await service.execute(categoryId);

    expect(response.length).toBe(0);
  });
});
