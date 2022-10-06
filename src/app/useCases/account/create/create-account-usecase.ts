import { Account } from "../../../entities/account";
import { IAccountRepo } from "../../../repositories/i-account-repo";
import { ApiError } from "../../../utils/api-error";

export class CreateAccountUseCase {
  constructor(
    private repo: IAccountRepo
  ) {}

  async execute(req: Account) {
    const exists = await this.repo.findByDescription(req.description);

    if(!exists) await this.repo.create(req);
    else throw new ApiError(422, "Conta já existente.");
    return;
  }
}