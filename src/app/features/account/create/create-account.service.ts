import { Account } from "../../../entities/account";
import { IAccountRepo } from "../../../repositories/i-account-repo";
import { ApiError } from "../../../utils/api-error";

export class CreateAccountService {
  constructor(private repo: IAccountRepo) {}

  async execute(req: Account) {
    req.toUpperCase();

    const exists = await this.repo.findByDescription(req.description);

    if (!exists) await this.repo.create(req);
    else throw ApiError.businessLogicError("Conta já existente.");
    return;
  }
}
