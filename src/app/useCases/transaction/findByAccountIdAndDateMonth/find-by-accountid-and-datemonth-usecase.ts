import { Transaction } from "../../../entities/transaction";
import { ITransactionRepo } from "../../../repositories/i-transaction-repo";

export class FindByAccountIdAndDateMonthUseCase {
  constructor(
    private repo: ITransactionRepo
  ) {}

  async execute(accountId: string, month: string): Promise<Transaction[]> {
    let response = await this.repo.findByAccountIdAndDateMonth(accountId, month);
    return response;
  }
}