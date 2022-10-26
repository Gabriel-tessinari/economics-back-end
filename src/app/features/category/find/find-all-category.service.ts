import { TransactionCategory } from "../../../entities/transaction-category";
import { ITransactionCategoryRepo } from "../../../repositories/i-transaction-category-repo";

export class FindAllCategoryService {
  constructor(
    private repo: ITransactionCategoryRepo
  ) {}

  async execute(): Promise<TransactionCategory[]> {
    let response = await this.repo.findAll();
    return response;
  }
}