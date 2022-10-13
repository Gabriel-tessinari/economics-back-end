import { Transaction } from "../../../entities/transaction";
import { ITransactionRepo } from "../../../repositories/i-transaction-repo";

export class FindByAccountIdAndDateMonthYearUseCase {
  constructor(
    private repo: ITransactionRepo
  ) {}

  async execute(accountId: string, month: string, year: number): Promise<Transaction[]> {
    const monthYear = '/' + month + '/' + year;
    let response = await this.repo.findByAccountIdAndDateMonthYear(accountId, monthYear);
    return response;
  }
}