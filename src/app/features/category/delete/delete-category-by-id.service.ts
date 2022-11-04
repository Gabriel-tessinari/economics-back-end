import { ICategoryRepo } from "../../../repositories/i-category-repo";
import { ApiError } from "../../../utils/api-error";
import { FindSubcategoryByCategoryIdService } from "../../subcategory/find/find-subcategory-by-categoryid.service";
import { FindTransactionByCategoryIdService } from "../../transaction/find/find-transaction-by-categoryid.service";

export class DeleteCategoryByIdService {
  constructor(
    private repo: ICategoryRepo,
    private transactionService: FindTransactionByCategoryIdService,
    private subcategoryService: FindSubcategoryByCategoryIdService
  ) {}

  async execute(id: string) {
    const categoryExists = !!(await this.repo.findById(id));
    const existSubcategoryWithCategory =
      (await this.subcategoryService.execute(id)).length > 0;
    const existTransactionsWithCategory =
      (await this.transactionService.execute(id)).length > 0;

    if (
      categoryExists &&
      !existSubcategoryWithCategory &&
      !existTransactionsWithCategory
    ) {
      await this.repo.deleteById(id);
    } else if (existSubcategoryWithCategory) {
      throw ApiError.businessLogicError(
        "Existe subcategoria dessa categoria. Não é possível deletá-la."
      );
    } else if (existTransactionsWithCategory) {
      throw ApiError.businessLogicError(
        "Existe transação dessa categoria. Não é possível deletá-la."
      );
    }

    return;
  }
}
