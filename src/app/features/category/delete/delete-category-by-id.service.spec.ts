import { DeleteCategoryByIdService } from "./delete-category-by-id.service";
import { Category } from "../../../entities/category";
import { Transaction } from "../../../entities/transaction";
import { InMemoryCategoryRepo } from "../../../repositories/implementations/in-memory/in-memory-category-repo";
import { InMemorySubcategoryRepo } from "../../../repositories/implementations/in-memory/in-memory-subcategory-repo";
import { InMemoryTransactionRepo } from "../../../repositories/implementations/in-memory/in-memory-transaction-repo";
import { FindTransactionByCategoryIdService } from "../../transaction/find/find-transaction-by-categoryid.service";
import { ApiError } from "../../../utils/api-error";
import { FindSubcategoryByCategoryIdService } from "../../subcategory/find/find-subcategory-by-categoryid.service";
import { Subcategory } from "../../../entities/subcategory";

describe("Delete category by id", () => {
  let repo: InMemoryCategoryRepo;
  let service: DeleteCategoryByIdService;
  let transactionRepo: InMemoryTransactionRepo;
  let transactionService: FindTransactionByCategoryIdService;
  let subcategoryRepo: InMemorySubcategoryRepo;
  let subcategoryService: FindSubcategoryByCategoryIdService;
  let id: string | undefined;

  beforeAll(() => {
    repo = new InMemoryCategoryRepo();
    transactionRepo = new InMemoryTransactionRepo();
    transactionService = new FindTransactionByCategoryIdService(
      transactionRepo
    );
    subcategoryRepo = new InMemorySubcategoryRepo();
    subcategoryService = new FindSubcategoryByCategoryIdService(
      subcategoryRepo
    );
    service = new DeleteCategoryByIdService(
      repo,
      transactionService,
      subcategoryService
    );
  });

  beforeEach(async () => {
    const category1 = new Category({
      description: "toStay",
    });

    const category2 = new Category({
      description: "toDelete",
    });

    await repo.create(category1);
    await repo.create(category2);

    id = (await repo.findAll())[1].id;
  });

  afterEach(() => {
    repo.setCategoriesEmpty();
    transactionRepo.setTransactionsEmpty();
    subcategoryRepo.setSubcategoriesEmpty();
  });

  it("should be able to delete a category", async () => {
    const spy = jest.spyOn(repo, "findById");
    const spy2 = jest.spyOn(transactionService, "execute");
    const spy3 = jest.spyOn(subcategoryService, "execute");

    if (id) {
      expect((await repo.findAll()).length).toBe(2);
      expect(await service.execute(id)).toBeUndefined();
      expect(spy).toBeCalledTimes(1);
      expect(spy2).toBeCalledTimes(1);
      expect(spy3).toBeCalledTimes(1);
    }

    const response = await repo.findAll();
    expect(response.length).toBe(1);
    expect(response[0].description).toBe("toStay");

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
  });

  it("should return undefined when do not find by id", async () => {
    const spy = jest.spyOn(repo, "deleteById");
    const spy2 = jest.spyOn(transactionService, "execute");
    const spy3 = jest.spyOn(subcategoryService, "execute");
    const id = "notAnIdInTheList";

    expect((await repo.findAll()).length).toBe(2);
    expect(await service.execute(id)).toBeUndefined();
    expect(spy).not.toBeCalled();
    expect(spy2).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);
    expect((await repo.findAll()).length).toBe(2);

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
  });

  it("should throw error if exists transaction of the category", async () => {
    let transaction = Transaction.fake();
    if (id) {
      transaction.categoryId = id;
      transactionRepo.create(transaction);

      try {
        await service.execute(id);
        throw ApiError.testError();
      } catch (err: any) {
        expect(err.status).toBe(422);
        expect(err.message).toBe(
          "Existe transação dessa categoria. Não é possível deletá-la."
        );
      }
    }
  });

  it("should throw error if exists subcategory of the category", async () => {
    let subcategory = Subcategory.fake();
    if (id) {
      subcategory.categoryId = id;
      subcategoryRepo.create(subcategory);

      try {
        await service.execute(id);
        throw ApiError.testError();
      } catch (err: any) {
        expect(err.status).toBe(422);
        expect(err.message).toBe(
          "Existe subcategoria dessa categoria. Não é possível deletá-la."
        );
      }
    }
  });
});
