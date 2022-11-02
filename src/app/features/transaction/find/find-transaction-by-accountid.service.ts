import { Transaction } from "../../../entities/transaction";
import { ITransactionRepo } from "../../../repositories/i-transaction-repo";

export class FindTransactionByAccountIdService {
  constructor(private repo: ITransactionRepo) {}

  async execute(accountId: string): Promise<Transaction[]> {
    let response = await this.repo.findByAccountId(accountId);
    return response;
  }
}
