import { Transaction } from "../../../entities/transaction";
import { ITransactionRepo } from "../../../repositories/i-transaction-repo";

export class FindTransactionBySubcategoryIdService {
  constructor(private repo: ITransactionRepo) {}

  async execute(subcategoryId: string): Promise<Transaction[]> {
    let response = await this.repo.findBySubcategoryId(subcategoryId);
    return response;
  }
}
