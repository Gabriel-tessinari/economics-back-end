import { Transaction } from "../../../entities/transaction";
import { ITransactionRepo } from "../../../repositories/i-transaction-repo";

export class CreateTransactionService {
  constructor(private repo: ITransactionRepo) {}

  async execute(req: Transaction) {
    await this.repo.create(req);
    return;
  }
}
