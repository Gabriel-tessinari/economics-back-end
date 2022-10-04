import { Account } from "../../../entities/account";
import { IAccountRepo } from "../../../repositories/i-account-repo";
import { ApiError } from "../../../utils/api-error";

export class DeleteAccountByIdUseCase {
  constructor(
    private repo: IAccountRepo
  ) {}

  async execute(req: Account) {
    if(req.id) {
      await this.repo.create(req);
    } else {
      throw new ApiError(400, "Conta sem id para deletar.");
    }

    return;
  }
}