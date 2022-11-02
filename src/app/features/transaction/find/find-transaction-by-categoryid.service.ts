import { Transaction } from "../../../entities/transaction";
import { ITransactionRepo } from "../../../repositories/i-transaction-repo";

export class FindTransactionByCategoryIdService {
  constructor(private repo: ITransactionRepo) {}

  async execute(categoryId: string): Promise<Transaction[]> {
    let response = await this.repo.findByCategoryId(categoryId);
    return response;
  }
}
