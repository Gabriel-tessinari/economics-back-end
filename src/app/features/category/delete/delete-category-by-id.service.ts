import { ICategoryRepo } from "../../../repositories/i-category-repo";
import { ApiError } from "../../../utils/api-error";
import { FindTransactionByCategoryIdService } from "../../transaction/find/find-transaction-by-categoryid.service";

export class DeleteCategoryByIdService {
  constructor(
    private repo: ICategoryRepo,
    private transactionService: FindTransactionByCategoryIdService
  ) {}

  async execute(id: string) {
    if (await this.repo.findById(id)) {
      if ((await this.transactionService.execute(id)).length == 0) {
        await this.repo.deleteById(id);
      } else {
        throw ApiError.businessLogicError(
          "Existe transação dessa categoria. Não é possível deletá-la."
        );
      }
    }

    return;
  }
}
