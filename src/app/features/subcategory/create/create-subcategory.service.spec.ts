import { Subcategory } from "../../../entities/subcategory";
import { InMemorySubcategoryRepo } from "../../../repositories/implementations/in-memory/in-memory-subcategory-repo";
import { ApiError } from "../../../utils/api-error";
import { CreateSubcategoryService } from "./create-subcategory.service";

describe("Create subcategory", () => {
  let repo: InMemorySubcategoryRepo;
  let service: CreateSubcategoryService;
  let reference: Subcategory = new Subcategory({
    description: "Test",
    categoryId: "categoryIdTest",
  });

  beforeAll(() => {
    repo = new InMemorySubcategoryRepo();
    service = new CreateSubcategoryService(repo);
  });

  beforeEach(() => {
    repo.setSubcategoriesEmpty();
  });

  it("should be able to create a subcategory", async () => {
    const subcategory = new Subcategory({
      description: reference.description,
      categoryId: "categoryIdTest",
    });

    expect((await repo.findAll()).length).toBe(0);
    expect(await service.execute(subcategory)).toBeUndefined();

    let response = await repo.findAll();

    expect(response.length).toBe(1);
    expect(response[0]).toHaveProperty("_id");
    expect(response[0].description).not.toBe(reference.description);
    expect(response[0].description).toBe(reference.description.toLowerCase());
  });

  it("should not be able to create subcategory with same description", async () => {
    const subcategory = new Subcategory({
      description: reference.description.toLowerCase(),
      categoryId: "categoryIdTest",
    });

    await repo.create(subcategory);
    subcategory.description = reference.description;

    try {
      await service.execute(subcategory);
      throw ApiError.testError();
    } catch (err: any) {
      expect(err.status).toBe(422);
      expect(err.message).toBe("Subcategoria já existente.");
    }
  });
});
