import { ITransactionRepo } from "../../../repositories/i-transaction-repo";

export class DeleteTransactionByIdService {
  constructor(private repo: ITransactionRepo) {}

  async execute(id: string) {
    if (await this.repo.findById(id)) {
      await this.repo.deleteById(id);
    }

    return;
  }
}
