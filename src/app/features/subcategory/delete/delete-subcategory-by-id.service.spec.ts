import { DeleteSubcategoryByIdService } from "./delete-subcategory-by-id.service";
import { InMemorySubcategoryRepo } from "../../../repositories/implementations/in-memory/in-memory-subcategory-repo";
import { Category } from "../../../entities/category";
import { FindTransactionBySubcategoryIdService } from "../../transaction/find/find-transaction-by-subcategoryid.service";
import { InMemoryTransactionRepo } from "../../../repositories/implementations/in-memory/in-memory-transaction-repo";
import { Transaction } from "../../../entities/transaction";
import { ApiError } from "../../../utils/api-error";
import { Subcategory } from "../../../entities/subcategory";

describe("Delete subcategory by id", () => {
  let repo: InMemorySubcategoryRepo;
  let service: DeleteSubcategoryByIdService;
  let transactionRepo: InMemoryTransactionRepo;
  let transactionService: FindTransactionBySubcategoryIdService;
  let id: string | undefined;

  beforeAll(() => {
    repo = new InMemorySubcategoryRepo();
    transactionRepo = new InMemoryTransactionRepo();
    transactionService = new FindTransactionBySubcategoryIdService(
      transactionRepo
    );
    service = new DeleteSubcategoryByIdService(repo, transactionService);
  });

  beforeEach(async () => {
    const subcategory1 = new Subcategory({
      description: "toStay",
      categoryId: "categoryIdTest",
    });

    const subcategory2 = new Subcategory({
      description: "toDelete",
      categoryId: "categoryIdTest",
    });

    await repo.create(subcategory1);
    await repo.create(subcategory2);

    id = (await repo.findAll())[1].id;
  });

  afterEach(() => {
    repo.setSubcategoriesEmpty();
    transactionRepo.setTransactionsEmpty();
  });

  it("should be able to delete a subcategory", async () => {
    const spy = jest.spyOn(repo, "findById");
    const spy2 = jest.spyOn(transactionService, "execute");

    if (id) {
      expect((await repo.findAll()).length).toBe(2);
      expect(await service.execute(id)).toBeUndefined();
      expect(spy).toBeCalledTimes(1);
      expect(spy2).toBeCalledTimes(1);
    }

    const response = await repo.findAll();
    expect(response.length).toBe(1);
    expect(response[0].description).toBe("toStay");

    spy.mockRestore();
    spy2.mockRestore();
  });

  it("should return undefined when do not find by id", async () => {
    const spy = jest.spyOn(repo, "deleteById");
    const spy2 = jest.spyOn(transactionService, "execute");
    const id = "notAnIdInTheList";

    expect((await repo.findAll()).length).toBe(2);
    expect(await service.execute(id)).toBeUndefined();
    expect(spy).toBeCalledTimes(0);
    expect(spy2).toBeCalledTimes(0);
    expect((await repo.findAll()).length).toBe(2);

    spy.mockRestore();
    spy2.mockRestore();
  });

  it("should throw error if exists transaction of the subcategory", async () => {
    let transaction = Transaction.fake();
    if (id) {
      transaction.subcategoryId = id;
      transactionRepo.create(transaction);

      try {
        await service.execute(id);
        throw ApiError.testError();
      } catch (err: any) {
        expect(err.status).toBe(422);
        expect(err.message).toBe(
          "Existe transação dessa subcategoria. Não é possível deletá-la."
        );
      }
    }
  });
});
