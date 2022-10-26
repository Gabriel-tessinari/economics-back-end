import { TransactionCategory } from "../../../entities/transaction-category";
import { ITransactionCategoryRepo } from "../../../repositories/i-transaction-category-repo";

export class CreateTransactionCategoryUseCase {
  constructor(
    private repo: ITransactionCategoryRepo
  ) {}

  async execute(req: TransactionCategory) {
    await this.repo.create(req);
    return;
  }
}