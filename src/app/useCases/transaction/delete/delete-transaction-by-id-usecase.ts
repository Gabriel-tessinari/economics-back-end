import { ITransactionRepo } from "../../../repositories/i-transaction-repo";
import { ApiError } from "../../../utils/api-error";

export class DeleteTransactionByIdUseCase {
  constructor(
    private repo: ITransactionRepo
  ) {}

  async execute(id: string) {
    if(id) {
      await this.repo.deleteById(id);
    } else {
      throw new ApiError(400, "Conta sem id para deletar.");
    }

    return;
  }
}