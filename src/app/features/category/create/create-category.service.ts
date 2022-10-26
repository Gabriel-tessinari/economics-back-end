import { TransactionCategory } from "../../../entities/transaction-category";
import { ITransactionCategoryRepo } from "../../../repositories/i-category-repo";

export class CreateCategoryService {
  constructor(
    private repo: ITransactionCategoryRepo
  ) {}

  async execute(req: TransactionCategory) {
    await this.repo.create(req);
    return;
  }
}