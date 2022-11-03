import { ISubcategoryRepo } from "../../../repositories/i-subcategory-repo";
import { ApiError } from "../../../utils/api-error";
import { FindTransactionBySubcategoryIdService } from "../../transaction/find/find-transaction-by-subcategoryid.service";

export class DeleteSubcategoryByIdService {
  constructor(
    private repo: ISubcategoryRepo,
    private transactionService: FindTransactionBySubcategoryIdService
  ) {}

  async execute(id: string) {
    if (await this.repo.findById(id)) {
      if ((await this.transactionService.execute(id)).length == 0) {
        await this.repo.deleteById(id);
      } else {
        throw ApiError.businessLogicError(
          "Existe transação dessa subcategoria. Não é possível deletá-la."
        );
      }
    }

    return;
  }
}
