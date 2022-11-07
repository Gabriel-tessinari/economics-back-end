import { ICategoryRepo } from "../../../repositories/i-category-repo";
import { ApiError } from "../../../utils/api-error";
import { FindTransactionByCategoryIdService } from "../../transaction/find/find-transaction-by-categoryid.service";

export class DeleteCategoryByIdService {
  constructor(
    private repo: ICategoryRepo,
    private transactionService: FindTransactionByCategoryIdService
  ) {}

  async execute(id: string) {
    const exists = await this.repo.existsById(id);
    const hasSubcategory = await this.repo.hasSubcategory(id);
    const existTransactionsWithCategory =
      (await this.transactionService.execute(id)).length > 0;

    if (exists && !hasSubcategory && !existTransactionsWithCategory) {
      await this.repo.deleteById(id);
      return;
    }

    if (hasSubcategory) {
      throw ApiError.businessLogicError(
        "Existe subcategoria dessa categoria. Não é possível deletá-la."
      );
    }

    if (existTransactionsWithCategory) {
      throw ApiError.businessLogicError(
        "Existe transação dessa categoria. Não é possível deletá-la."
      );
    }
  }
}
