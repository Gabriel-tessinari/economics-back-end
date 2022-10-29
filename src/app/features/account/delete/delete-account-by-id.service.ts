import { IAccountRepo } from "../../../repositories/i-account-repo";
import { ApiError } from "../../../utils/api-error";
import { FindTransactionByAccountIdService } from "../../transaction/find/find-transaction-by-accountid.service";

export class DeleteAccountByIdService {
  constructor(
    private repo: IAccountRepo,
    private transactionService: FindTransactionByAccountIdService
  ) {}

  async execute(id: string) {
    if (await this.repo.findById(id)) {
      if ((await this.transactionService.execute(id)).length == 0) {
        await this.repo.deleteById(id);
      } else {
        throw ApiError.businessLogicError(
          "Existe transação dessa conta. Não é possível deletá-la."
        );
      }
    }

    return;
  }
}
